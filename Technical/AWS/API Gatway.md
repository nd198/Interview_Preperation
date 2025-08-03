**API gatway**
https://www.youtube.com/watch?v=dkgxvnk8cWw&ab_channel=Concept%26%26Coding-byShrayansh

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