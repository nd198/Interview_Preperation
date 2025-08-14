**API gatway**
AWS :- https://www.youtube.com/watch?v=rKNSc8RrwxA&list=PL6XT0grm_TfgtwtwUit305qS-HhDvb4du&ab_channel=GauravSharma
https://www.youtube.com/watch?v=dkgxvnk8cWw&ab_channel=Concept%26%26Coding-byShrayansh
    > It's an AWS service for creating , publishing maintaining, monitoring and securing rest HTTP, and websocket API at any scale.
    > Key use case: Enabling modern serverless and microservices architectures.
    **Core Architecture and Flow**
        API Gateway serves as an intermediary between various clients (web, mobile, IoT) and backend services (Lambda, EC2, HTTP endpoints, on-premises systems).
        **Typical flow:**
        1) Client makes request to API Gateway.
        2) API Gateway authenticates & authorizes the request.
        3) Gateway invokes backend service, retrieves response, and sends it back to the client.
    **API Types in API Gateway**
        1) **HTTP API:** Low latency, cost-effective, suitable for simple REST use cases. Supports Lambda and HTTP backends. Minimal features, lower price.
        2) **WebSocket API:** Persistent connections for use cases like chat or real-time dashboards.
        3) **REST API:** Feature-rich, complete control of request/response, extensive management features. Supports Lambda, HTTP, AWS service backends.
        4) **REST API (Private):** Accessible only from within a configured AWS VPC; used in regulated industries for secure, private APIs.  
    **Comparison:**
        1) Use HTTP API for low cost and minimal features.
        2) Use REST API when advanced features (keys, throttling, validation, private endpoints) are needed.
        3) WebSocket API for real-time, bi-directional communication.
        4) Private REST API for VPC-only access.  
    **4. Endpoint Types**
        1) Edge-Optimized: Use CloudFront for low-latency, global access.
        2) Regional: Used for applications accessed within a specific AWS region.
        3) Private: Restricts access to API via VPC endpoints using AWS PrivateLink. 
    **Resources and Methods**
        1) Resources: Represent parts of API (students, orders, etc.), following REST principles.
        2) Methods: GET, POST, PUT, DELETE mapped to resources.
    **Integration Types**
        1) Lambda: Most common for serverless, directly runs function in response to API calls.
        2) HTTP Endpoints: For integrating with external APIs/services.
        3) Mock: Used for testing, no backend executed.
        4) AWS Service Integration: Directly invoke AWS services (DynamoDB, SQS, etc.).
        5) VPC Link: Connects to resources inside your VPC, e.g., RDS via Network Load Balancer.               



Features of API gatway
**API Composition**

**Authentication**

**Rate Limiting**
    **manage Burst limit** : use to limit the burst traffice, means no. of concurrent request that API gatway can handlebefore it return 429(too many request).
    **API Trottling** : limiting the number of request from individual or an application by temp blocking the request, once they crossed the allowed request rate
    **IP based blocking**
    **API Queues** : hold request to an API , which ca not be processed immedietly. it helps to handle the thundering herd issue.

**Service Dicovery** 
    an microservice can scale up scale down, its necessary t know the location(IP address).SD keeps track of those
        > Approach 1 : Each microservice register and de register themselves.
        > Approach 2 : SD keeps health check of all the registered microservice and keep only active microservice location.

Request response transformation
response caching
Logging   

**OAuth 2.0**
https://www.youtube.com/watch?v=3Gx3e3eLKrg