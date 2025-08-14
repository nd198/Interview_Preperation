**SQS**
    > Fully managed message quieng service 
    > it enables decoupling, scaling of microservices, distributed sysytem and serverless applications
    > It doesn't push the messages
    > it supports polling of the messages
    
**Two types of queue**  
    **1) Standard Queue**:- Offers best ordering, at least once delivery and nearly unlimited throuput.
    it provides high throuput and are suitable for most application
    **2) FIFO** :- Guarantees the order in which messages are sent and recived and ensures exactly once processing. FIFO queues are ideal for the applications that require strict ordering and de-duplciation of messages.

**Message Retaintion Period:-** 
    > SQS retains the messages in queue for a configurable period(from 1 min to 14 days). If message is not processed within this period, it becomes available for processing by another consumer.
    > Delete the message using deleteMessage API.

**Visibility Timeout** 
    when consumer recieves the message from the queue, SQS hides it from  other consumer for a specific period called the visibility timeout.
    If message is not deleted or processed within this time, it become visible again for other consumers to process

**Note** :- Difference: Retention period is max time in queue; visibility timeout is time hidden after read.

**Integrating SQS with CloudWatch**
    > CloudWatch tracks metrics for SQS: messages sent, received, deleted, and current queue length.

    > Supports autoscaling using CloudWatch alarms: scale consumer instances (e.g., EC2, Docker) up/down based on message backlog threshold.

**SQS Security** 
    > SQS integrates with AWS identity and access management (IAM) for fine grained access control, allowing administrators to manage the permission for queue access
    > Control queue access using policies (e.g., restrict send/receive/delete actions).
    > Encryption support for queue messages.

**Types Of Polling in SQS**  
    1) Long Polling :
        >**Optimized Behavior:** Long polling queries all SQS servers and waits for a message to become available (or until the specified wait timeout expires, up to 20 seconds). 
        > **How It Works:**
            1) The consumer sends a ReceiveMessage request with a non-zero WaitTimeSeconds (up to 20 seconds).
            2) If no message is available, SQS holds the connection open and waits. As soon as a message arrives (within the wait time), SQS responds immediately.
        > **Characteristics:**
            1) Reduces the number of empty responses and API calls, which can lower overall SQS usage costs.
            2) Returns messages as soon as they arrive, improving efficiency and real-time processing.
        > **Use Case:** 
            1) Ideal when message arrivals are irregular, when cost efficiency is important, or when you don’t want to miss messages. 
            2) Long polling cuts down on unnecessary requests and gives a more complete view of the queue at each poll.        
    2) Short Polling: 
        > **Default Behavior:** When a consumer requests messages from an SQS queue, short polling immediately returns whatever messages are found by sampling a subset of Amazon’s SQS servers.
        > **How It Works**: SQS does not query all servers; instead, it checks a random, weighted subset and responds right away, even if no messages are found.
        > **Characteristics:**
        Can return fewer messages than actually exist in the queue, especially if they are distributed across multiple servers.
        May return empty responses frequently if the queue is empty or if the polled servers don't contain messages.
        > **Use Case:** Useful when you need a fast, immediate response and can tolerate missing out on some messages in a single poll or making frequent API requests. This can, however, increase costs since there may be many empty responses.

**Dead Letter Queue** 
    it will be used to store the messages that cannot be processed successfully after a certain number of retries. they help in troubleshooting and handling erroneous messages without losing them.
**Message Deduplication** 
    FIFO queues provide exactly once message processing by automatically eliminating duplicate msg based on a message deduplication ID.
**SQS with Lambda**
    1) SQS can trigger Lambda functions when new messages arrive (serverless event-driven processing).
    2) Steps: Create Lambda, execution role, add SQS trigger, test end-to-end flow.            
