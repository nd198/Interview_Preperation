**How to communicate between microservice**
there are two ways to communicate between microservices
**1) synchronous commincation** :- Via API calls
**2) Asynchronous commincation** :- 
    > using message broker (rabit MQ, Apache Kafka)
    > service mesh(istio), very common when microservices are deployed using kubernates

**Disadvantage**  
    1) Complex to develope
    2) management overhead
    3) high infra cost 

**Design Patterns:-**
**Service Discovery and registration design pattern**
    > Client side
    > server Side
    > Importatant things to know
        1) Service Registry(Eureka, consul, ZooKeeper)  
        2) Health checks
        3) Load balancing

   **The Core Components of Service Discovery**
    Any service discovery mechanism has three main components:
        **Service Registry**: This is the heart of the system—the "phone book" itself. It's a highly available, centralized database containing the network locations of all available service instances.
        Example Entry: { "service-name": "APIService", "instance-id": "xyz123", "address": "172.17.0.5", "port": 8080, "version": "1.2", "metadata": { "region": "us-east-1" } }
        **Service Registration**: When a new service instance starts up, it must register itself with the Service Registry, providing its name, network location, and any other relevant metadata (like version or health check endpoint).
        **Service "Discovery" (The Lookup)**: When a client service wants to call another service, it queries the Service Registry, asking, "Where can I find a healthy instance of APIService?" The registry returns a list of one or more available network locations.
        **Health Checking**: The registry needs to know if a registered service is still alive. If an instance crashes or becomes unhealthy, it must be removed from the registry to prevent clients from sending requests to a dead endpoint. This is crucial for reliability. Health checks can be:
            Service-led (Heartbeat): The service instance periodically sends a "I'm still alive" signal (a heartbeat) to the registry. If the registry doesn't receive a heartbeat for a certain period, it deregisters the instance.
            Registry-led (Polling): The registry periodically calls a health check endpoint on the service instance (e.g., /health). If the endpoint doesn't respond with a 200 OK, the instance is marked as unhealthy.
    **The Two Main Patterns of Service Discovery**
    Now we get to the how. There are two primary architectural patterns for implementing service discovery.
    **1. Client-Side Discovery**
        In this pattern, the client service is responsible for handling the entire discovery logic.
        **Flow:**
            1) PaymentService starts and registers itself with the Service Registry.
            2) OrderService (the client) needs to call the PaymentService.
            3) OrderService directly queries the Service Registry: "Give me the location of the PaymentService."
            4) The Service Registry returns a list of healthy instances (e.g., 10.0.1.5:8080, 10.0.1.6:8080).
            5) The OrderService then uses its own internal load-balancing logic (e.g., round-robin, random choice) to select one of the instances from the list.
            6) OrderService makes a direct network request to the chosen instance (10.0.1.5:8080).
        **Pros:**
            1) Simpler Architecture: Fewer moving parts; no need for a dedicated router or load balancer.
            2) Direct Connection: The client connects directly to the service, resulting in lower latency (one less network hop).
            3) Smarter Clients: The client has full awareness of all available instances and can make sophisticated load-balancing decisions.
        **Cons:**
            1) Couples the Client to the Registry: The discovery logic must be implemented in every client service. You need a service discovery library for every language/framework you use (Node.js, Go, Python, Java, etc.).
            2) "Thick" Clients: This logic bloats the client services and can be complex to manage and keep consistent across your entire ecosystem.
            Example Tools: Netflix Eureka, some configurations of HashiCorp Consul.
    **2. Server-Side Discovery**
            In this pattern, the client is "dumb." It doesn't know or care about the service registry. It sends all its requests to a single, well-known endpoint.
        **Flow**:
            1) PaymentService instances start and register themselves with the Service Registry.
            2) OrderService (the client) needs to call the PaymentService. It is configured to always send requests to a static URL, like http://my-router/payment-service.
            3) The request hits a Router or Load Balancer (also called a proxy).
            4) This Router queries the Service Registry to get the list of healthy PaymentService instances.
            5) The Router then performs load balancing and forwards the request to one of the active instances.
        **Pros**:
            1) Decoupled & "Thin" Clients: The client is extremely simple. It just needs to know the address of the router. All the complexity of discovery and load balancing is abstracted away.
            2) Centralized Control: You can manage load balancing, security (TLS termination), routing rules, and monitoring in a single place (the router).
            3) Language Agnostic: The client doesn't need any special libraries. A simple HTTP call is all that's required.
        **Cons**:
            1) Extra Hop: The request has to go through the router first, which can add a small amount of latency.
            2) Potential Bottleneck: The router itself must be highly available and scalable, otherwise it becomes a single point of failure for the entire system.
    **Popular Tools and Platforms**
        **HashiCorp Consul**: A very popular, powerful, and mature tool. It provides a service registry, DNS and HTTP interfaces for discovery, and robust health checking. It can be used for both Client-Side and Server-Side patterns.
        **Netflix Eureka**: A key component of the Netflix OSS stack, designed for extreme resiliency. It favors Availability over Consistency (AP in CAP theorem), meaning it will continue to serve stale data if the registry cluster becomes partitioned, preventing system-wide outages. Primarily used for Client-Side discovery.
        **Kubernetes (The De Facto Standard)**: If you are using Kubernetes, you get a sophisticated Server-Side discovery system for free.
            1) When you create a Service object in Kubernetes (e.g., kubectl expose deployment payment-service --port=80), Kubernetes automatically creates a stable, internal DNS name for it (e.g., payment-service.default.svc.cluster.local).
            2) Your OrderService can simply make a request to http://payment-service, and Kubernetes' internal networking (kube-proxy) will automatically discover a healthy pod and load balance the request to it.
        **Service Mesh (e.g., Istio, Linkerd)**: This is an advanced form of Server-Side discovery. A "sidecar" proxy is deployed alongside every service instance. All traffic in and out of your service flows through this proxy. The proxies form a "mesh" and handle discovery, advanced load balancing, security, and observability automatically, making the client application code even simpler. 
    **Summary: Which Pattern to Choose?**
        **If you are on Kubernetes**: Use the built-in Server-Side discovery. It's powerful, robust, and the idiomatic way to build applications on the platform.
        **If you are in a cloud environment (like AWS) but not using Kubernetes**: Use the platform's native tools. An AWS Application Load Balancer (ALB) integrated with AWS Cloud Map provides a seamless Server-Side discovery experience.
        **If you are building a custom, on-premise system**: You have a choice.
            1) Server-Side is often preferred for its simplicity from the client's perspective. You can set up Consul and use a proxy like NGINX or Fabio.
            2) Client-Side can be a good choice if you need maximum performance (by avoiding the proxy hop) and are comfortable managing client-side libraries.           

     
**Saga Design pattern(managing transaction in distributed system)**
    Ex:- flight booking
    1) Orchestrated saga : 
        preferable for simpler sagas or when you need a clear audit trail and centralized control
        Pros
        > simpler implementationn
        > easier debugging
        Cons
        > Single point of failure
        > Tight coupling
    2) choreographed saga :
        better for complex saga with many services or when you need high scalabilty and loose coupling
        pros
        > loose coupling
        > better scalability
        cons
        > complex implementation
        > harder debugging

**circuit breaker** : 
    Think of a circuit breaker in your home's electrical system. If there's a power surge, the breaker "trips" (opens) to prevent your appliances from getting fried. It stops the flow of electricity.
    The software Circuit Breaker pattern works similarly. It's a state machine that wraps a protected function call (like a network request to another service) and monitors for failures. It has three states:
    **CLOSED**: This is the default, healthy state. Requests from the UserService are allowed to pass through to the PreferenceService. The breaker monitors the number of failures. If the failure count exceeds a certain threshold within a specific time period, the breaker "trips" and moves to the OPEN state.
    **OPEN**: In this state, the circuit breaker immediately rejects all requests to the PreferenceService without even trying to execute them. This is the crucial part: it prevents the UserService from wasting resources on calls that are likely to fail. After a configurable timeout period, the breaker moves to the HALF-OPEN state.
    **HALF-OPEN**: The breaker allows a single request to pass through to the PreferenceService.
    If this request succeeds: The breaker assumes the PreferenceService has recovered and moves back to the CLOSED state.

    If this request fails: The breaker concludes the PreferenceService is still down and immediately returns to the OPEN state, restarting the timeout.

    This mechanism protects the PreferenceService from being bombarded with requests while it's trying to recover and, more importantly, protects the UserService and the rest of the system from a cascading failure.


Rate Limitter
gateway
Retry Pattern
bulk head
Resilience pattern
fallback pattern
timeout pattern

Cascading failure -  if one microservice goes down, and if other ms depends on that it fails the others , to fix this we need to use Resileence pattern