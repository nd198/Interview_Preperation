**Service Discovery**
In a microservices architecture, services are typically deployed as independent processes, often in dynamic environments like containers (Docker, Kubernetes) or cloud functions. Their network locations (IP addresses, ports) can change frequently. Service Discovery is the mechanism by which clients (other services, frontends, or even external users) can find the network locations of service instances.
Without service discovery, you'd have to hardcode service locations, which is brittle and doesn't scale.

**Two Main Types:**
    **Client-Side Service Discovery:**
        > How it works: The client service queries a Service Registry (e.g., Consul, Eureka, etcd) to get a list of available instances for a particular service. The client then uses a load-balancing algorithm (like round-robin) to select one of the instances and make the request.
        > Pros: Simpler deployment for the service instances themselves.
        > Cons: The client needs to embed service discovery logic, and each client (if using different technologies) might need a different client-side library.
    **Server-Side Service Discovery:**
        > How it works: The client service makes a request to a Router/Load Balancer (e.g., Nginx, AWS ALB, Kubernetes Service) at a well-known location. The router then queries the Service Registry (or has built-in discovery) and forwards the request to an available service instance.
        > Pros: Clients don't need discovery logic; they just talk to the router. Different client technologies can use the same router.
        > Cons: Requires an additional hop and a router component.

**Why it's useful in Node.js:**
Node.js microservices need to communicate with each other. In a dynamic environment, relying on hardcoded URLs is impractical. Service discovery allows Node.js services to locate and call other services reliably, facilitating scaling and resilience. 

**Node.js Implementation:**
    Node.js applications typically interact with service discovery systems through:
    > **Client-side**: Using libraries that integrate with specific service registries (e.g., a consul-client or eureka-js-client). These clients register the Node.js service itself when it starts up and then query the registry to find other services.
    > **Server-side**: Most commonly used with cloud platforms (AWS, Azure, GCP) or orchestrators like Kubernetes.
        > Kubernetes: It has built-in DNS-based service discovery. A Node.js service simply makes a request to http://service-name.namespace.svc.cluster.local (or just http://service-name within the same namespace), and Kubernetes handles the routing.
        > Load Balancers: Node.js services are typically deployed behind a load balancer (e.g., Nginx, HAProxy, AWS ALB) which itself discovers instances and routes traffic.