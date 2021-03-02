require("dotenv").config()
const { PartitionAssigners } = require("kafkajs");
const kafka = require("../helpers/kafka");
const { TOPIC: topic, GROUP_ID_KAFKA: groupId } = process.env

// console.log({topic, groupId});
// partitionAssigners: [PartitionAssigners.roundRobin],
const consumer = kafka.consumer({ groupId });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log("Consumer is starting!");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        console.log({
          topic,
          partition,
          message: message.value.toString(),
        });        
      } catch (error) {
        console.error(error);
      }
    },
  });

};


run().catch(console.error)
