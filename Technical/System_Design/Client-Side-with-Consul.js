// For Kubernetes, it's much simpler. If you have a service named user-service in your cluster, 
// a Node.js microservice can simply make an HTTP request to http://user-service/users and Kubernetes' 
// internal DNS and proxy will handle the discovery and routing to an available instance of user-service.
// A conceptual example using 'consul' npm package for client-side discovery
const Consul = require('consul');
const consul = new Consul(); // Assumes Consul agent is running on localhost:8500

// --- Service Registration (Your Node.js Service registering itself) ---
function registerService() {
  const serviceId = `my-nodejs-service-${process.pid}`;
  const port = process.env.PORT || 3000;

  consul.agent.service.register({
    name: 'my-nodejs-service',
    id: serviceId,
    address: 'localhost', // Or actual host IP
    port: parseInt(port),
    check: {
      http: `http://localhost:${port}/health`, // Health check endpoint
      interval: '10s',
      timeout: '5s'
    }
  }, (err) => {
    if (err) console.error('Service registration failed:', err);
    else console.log(`Service '${serviceId}' registered with Consul.`);
  });

  // Deregister service on exit
  process.on('SIGINT', () => {
    consul.agent.service.deregister(serviceId, (err) => {
      if (err) console.error('Service deregistration failed:', err);
      else console.log(`Service '${serviceId}' deregistered.`);
      process.exit();
    });
  });
}

// --- Service Discovery (Your Node.js Service finding another service) ---
async function findAndCallAnotherService() {
  try {
    const services = await consul.catalog.service.nodes('another-service');
    if (services.length > 0) {
      // Simple round-robin for demonstration
      const serviceInstance = services[0].ServiceAddress[0]; // Assuming first instance, or implement load balancing
      const servicePort = services[0].ServicePort[0];
      const serviceUrl = `http://${serviceInstance}:${servicePort}/api/data`;

      console.log(`Found another-service at: ${serviceUrl}`);
      // Now make an HTTP call to this serviceUrl using axios or fetch
      // const response = await axios.get(serviceUrl);
      // console.log('Response from another-service:', response.data);
    } else {
      console.log('No instances of another-service found.');
    }
  } catch (err) {
    console.error('Error discovering service:', err);
  }
}

// In your main app:
// registerService();
// setInterval(findAndCallAnotherService, 5000);