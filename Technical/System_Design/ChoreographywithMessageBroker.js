// order-service/index.js
const amqp = require('amqplib');

async function processOrder(order) {
  // 1. Local transaction: Create pending order in Order Service's DB
  console.log(`Order Service: Creating pending order ${order.id}...`);
  // Simulate DB operation
  await new Promise(resolve => setTimeout(resolve, 500));

  // 2. Publish event: 'OrderCreatedEvent' to signal Inventory Service
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange('order_events', 'fanout', { durable: false });
  channel.publish('order_events', '', Buffer.from(JSON.stringify({
    type: 'OrderCreatedEvent',
    orderId: order.id,
    items: order.items,
    customerId: order.customerId,
    totalAmount: order.totalAmount
  })));
  console.log(`Order Service: Published OrderCreatedEvent for order ${order.id}`);

  await channel.close();
  await connection.close();
  return { status: 'pending' };
}

// Assume an API endpoint calls processOrder
// app.post('/orders', async (req, res) => {
//   const order = req.body; // { id: 'o123', items: [...], ... }
//   const result = await processOrder(order);
//   res.status(202).json(result);
// });