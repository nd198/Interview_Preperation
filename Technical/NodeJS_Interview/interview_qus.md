**What is a DDoS Attack?**
    A DDoS attack is an attempt to make an online service unavailable to its intended users by overwhelming it with a flood of internet traffic from multiple, distributed sources.

**How to Prevent It in**
    **Layer 1: The Edge/Infrastructure (The Most Important Layer)**
    This is your first and strongest line of defense, designed to stop massive network-layer attacks.
        1) Use a CDN and DDoS Protection Service: This is the industry standard. Services like Cloudflare, AWS Shield, Google Cloud Armor, or Azure DDoS Protection are designed to absorb and filter massive attacks at the network edge, long before they get to your server.
            How it works: They have a massive global network that can absorb the traffic. They use sophisticated analysis to identify and drop malicious traffic while allowing legitimate users through.
            This is your #1 priority for DDoS protection.
        2) Web Application Firewall (WAF): A WAF operates at the application layer (Layer 7) and can be part of your CDN service. It's smarter than a simple network filter. It can inspect incoming requests for malicious patterns (like SQL injection, XSS) and block bots based on their behavior, providing more targeted protection.
    **Layer 2: The Web Server/Proxy (In Front of Node.js)**
        Even with a CDN, you should have protection at your web server level. Typically, you don't expose your Node.js app directly to the internet; you put it behind a reverse proxy like Nginx or HAProxy.
        Connection and Rate Limiting: Configure Nginx to limit the number of connections and requests allowed from a single IP address. This can mitigate smaller, application-focused attacks.
            Example (Nginx): limit_req_zone and limit_conn_zone directives.
    **Layer 3: The Node.js Application Itself (Your Direct Control)**
        This layer is for handling smaller, more sophisticated application-layer attacks that might get through your outer defenses. Here's what you can do directly in your code.
        **1) Rate Limiting Middleware**: This is the most important in-app technique. It limits how many times a user (identified by IP or API key) can hit your endpoints in a given time window.
        Recommended npm Package: express-rate-limit is a popular choice for Express apps.
        **2) Request Timeouts**
        **3) Payload Size Limiting:**
            An attacker could try to crash your server by sending huge JSON payloads or form data. You should always limit the size of the request body.
            `// For JSON payloads
            app.use(express.json({ limit: '10kb' })); // Default is '100kb'

            // For URL-encoded form data
            app.use(express.urlencoded({ limit: '10kb', extended: true }));`
        **4) Caching**: If an attacker repeatedly requests a resource-intensive, non-dynamic page, a caching layer (like Redis or an in-memory cache) can serve a stored response without hitting your business logic or database, significantly reducing the load.
        **5) Logging and Monitoring**: You can't fight what you can't see. Use tools like Prometheus, Grafana, or paid services like Datadog to monitor your application's traffic. A sudden, massive spike in requests is a clear sign of an attack and can trigger alerts for your team.  


**What is Rest API**   
    1) widely known and easy to learn
    2) can be tested using browsers, postman, or tools like curl
    3) Designed for synchronous comminication
    4) works over HTTP, HTTPS, so its easily passes through firewall
    5)      
