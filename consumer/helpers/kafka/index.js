const { Kafka } = require("kafkajs")

const { KAFKA_SERVER } = process.env

const kafka = new Kafka({
  clientId: 'middleware',
  brokers: [KAFKA_SERVER],
  ssl: false,
  sasl: null
})

module.exports = kafka
