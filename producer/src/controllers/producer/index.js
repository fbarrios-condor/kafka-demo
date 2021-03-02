const kafka = require("../../helpers/kafka");
const { TOPIC: topic } = process.env;


(async () => {
  try {
    const admin = kafka.admin()

    await admin.createPartitions({
      topicPartitions:  [
        {
          topic,
          count: 2
        }
      ]
    })
    console.log("Partitions created");
  } catch(error) {
    console.log("Partition already created");
  }
})()

const MyPartitioner = () => {
  return ({ topic, partitionMetadata, message }) => {
      // select a partition based on some logic
      // return the partition number
      const { index } = JSON.parse(message.value)
      return index % 2 === 0 ? 0 : 1
  }
}

const producer = kafka.producer({ createPartitioner: MyPartitioner});

const buildMessages = () => {
  let messages = [];
  for (let index = 1; index <= 100; index++) {
    messages.push({
      value: JSON.stringify({ owner: index, index }),
      partition: index % 2 === 0 ? 0 : 1
    });
  }
  return messages;
};
const sendData = async (req, res) => {
  try {
    await producer.connect();
    const response = await producer.send({
      topic,
      messages: buildMessages(),
    });
    console.log({ response });
    res.status(201).send({ response, message: "Published message" });
  } catch (error) {
    const message = "Error publishing message";
    console.error(message, error);
    res.status(500).send({ error, message });
  }
};

const producerModule = {
  sendData,
};

module.exports = producerModule;
