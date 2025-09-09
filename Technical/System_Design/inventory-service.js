// 3. Payment Service (Node.js):
// (Would similarly listen for StockDeductedEvent, process payment, and publish PaymentProcessedEvent or 
//     PaymentFailedEvent. If PaymentFailedEvent is published, Inventory Service would listen for it and 
//     trigger a compensating transaction to rollback stock.)
// This choreography example shows how services react to events to drive the multi-step transaction. 
// If Inventory Service fails to deduct stock, it publishes a StockDeductionFailedEvent, which other 
// services (like the Order Service) would listen for to update the order status to "cancelled" and 
// potentially trigger further compensation (e.g., notify the customer).

// inventory-service/index.js
const amqp = require('amqplib');

async function startInventoryConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange('order_events', 'fanout', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(q.queue, 'order_events', '');

  console.log("Inventory Service: Waiting for messages in %s. To exit press CTRL+C", q.queue);

  channel.consume(q.queue, async (msg) => {
    if (msg.content) {
      const event = JSON.parse(msg.content.toString());
      if (event.type === 'OrderCreatedEvent') {
        console.log(`Inventory Service: Received OrderCreatedEvent for order ${event.orderId}`);
        try {
          // 1. Local transaction: Deduct stock
          console.log(`Inventory Service: Deducting stock for order ${event.orderId}...`);
          // Simulate DB operation (e.g., check stock, update stock)
          // throw new Error('Simulated stock deduction failure'); // Uncomment to test failure
          await new Promise(resolve => setTimeout(resolve, 800));

          // 2. Publish event: 'StockDeductedEvent'
          channel.publish('order_events', '', Buffer.from(JSON.stringify({
            type: 'StockDeductedEvent',
            orderId: event.orderId,
            status: 'success'
          })));
          console.log(`Inventory Service: Stock deducted and published StockDeductedEvent for order ${event.orderId}`);

        } catch (error) {
          console.error(`Inventory Service: Failed to deduct stock for order ${event.orderId}: ${error.message}`);
          // 2. Publish compensating event: 'StockDeductionFailedEvent'
          channel.publish('order_events', '', Buffer.from(JSON.stringify({
            type: 'StockDeductionFailedEvent',
            orderId: event.orderId,
            reason: error.message
          })));
          console.log(`Inventory Service: Published StockDeductionFailedEvent for order ${event.orderId}`);
        }
      }
      // Add logic to handle compensating transactions for payment service if needed later
      // i.e. if event.type === 'PaymentFailedEvent', then trigger stock rollback here
    }
  }, { noAck: true }); // noAck: true for simplicity, in real app use acknowledgements
}

// startInventoryConsumer();