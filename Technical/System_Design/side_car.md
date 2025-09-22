# How Sidecar Pattern Works ✨

Once upon a time, a single server was enough to run an entire site. The clients connected to it over the internet.

But as the internet grew, traffic to some sites skyrocketed. And it became hard to scale those sites reliably.

So they installed more servers and added logic for logging, monitoring, and security. Yet it became difficult to update the app's code without affecting its reliability.

So they set up a sidecar.

It's a design pattern. And runs a small service alongside the app to help with tasks such as logging, monitoring, or security.

Imagine a motorcycle with a sidecar. The driver steers the vehicle, while the sidecar passenger carries the map, radio, or bag.

Similarly, the sidecar pattern decouples the operational features from the app's logic.

## Sidecar Pattern

### 1. Architecture

Here's how it works:

- The app runs the core logic and handles requests.
- Although detached, the sidecar and app share the same storage and networking environment.
- Sidecar runs alongside the app, handling tasks such as logging, monitoring, and security.
- They communicate with each other through a local network or shared resources, such as a configuration file or shared memory.
- The sidecar and app start, stop, and scale together for reliability.
- Also it's possible to update or replace the sidecar without affecting the app.

There are 2 ways to deploy a sidecar:

1. As a separate container alongside the app
2. As a separate process on the same server

The way a sidecar gets deployed depends on the use case and infrastructure setup.

### 2. Use Cases

Here are three popular use cases of the sidecar pattern:

#### Traffic Proxy

The sidecar acts as a traffic manager. It controls incoming and outgoing requests for the app.

Here's how:

- Imagine the app wants to call another service, for example, the payments API.
- It sends a request to the sidecar instead of calling the API directly.
- The sidecar then forwards the request to the correct API.
- It also automatically retries if the request fails due to a timeout or other error.
- Besides the sidecar decrypts the incoming traffic before sending it to the app.

This avoids the need for retry logic or security logic inside the app itself. It's also used to add HTTPS support to legacy services.

A popular implementation of the sidecar traffic proxy is **Envoy**. It usually gets deployed as a separate container alongside the app.

#### Logging and Monitoring

Log management and monitoring increase the app complexity. A sidecar solves this problem by collecting logs and sending them to a central system.

Here's how:

- The app writes logs to its local file, standard output, or a stream.
- Sidecar collects these logs from the app and combines them if needed.
- It then sends those logs to a central system, such as Elasticsearch or Splunk.

It lets the developer view all logs in a single place without changing the app's code.

A popular implementation of the sidecar for logging and monitoring is **Fluentd**. It's possible to deploy it as a separate process or container alongside the app.

#### Security Management

It's unsafe for an app to store sensitive data, such as passwords or API tokens. A sidecar solves this problem by managing sensitive data for the app.

Here's how:

- The sidecar gets secrets, such as passwords or certificates, from a secure system.
- It then provides them to the app at runtime through a file, environment variable, or shared memory.

This technique keeps the secrets separate from the app's code for security.

A popular implementation of the sidecar for security management is **Vault Agent**.

### 3. Tradeoffs

Here's how the sidecar pattern helps with a microservices architecture:

**Benefits:**
- Sidecar handles extra tasks, while the microservice contains only business logic. Thus keeping it simple.
- Each microservice has the same sidecar setup. Thus ensuring consistent logging, monitoring, or security features.
- A sidecar usually runs outside the app. So it doesn't matter if one microservice runs Java and another runs Python. Thus making it language independent.

**Drawbacks:**
- It consumes extra CPU, memory, and network capacity.
- It adds extra latency to each request.
- It introduces the risk of hidden failures because a functional app may look broken just from a sidecar failure.
- It increases operational complexity as it's necessary to configure, monitor, and update the sidecar.
- It brings synchronization challenges as the app and sidecar should start, stop, and scale together.

## Conclusion

The sidecar pattern became popular with microservices architecture. Yet a monolithic app can also use it to handle operational tasks for reliability.

The sidecar pattern is useful if the app runs in different languages and frameworks. But avoid using it if the app has resource limitations and needs fast communication.

---

*Source: [System Design Newsletter - Sidecar Pattern](https://newsletter.systemdesign.one/p/sidecar-pattern)*