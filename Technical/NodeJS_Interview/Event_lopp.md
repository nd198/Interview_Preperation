**Event Loop**
https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
> event loop every time will check call stack and call back queue if CS is emty the EL will check the call back queue for the next task
> before starting for each phase, event loop will check is there any call back waiting for next tick then or call back waiting for promis.callback , first event loop execute this and then it will go inside a phase 
> sinchronous code will be executed in CS directly but all teh callback related task will be executed in LIBUV

1) Event loop will wait at the poll phase if it not find anything inside any other phase.
2) if it hass nothing to do event loop will wait at the poll phase
3) when the event loop is ideal it will wait at the poll phase.
4) Timer -> Poll -> check -> close

one cycle of event loop is known as tick of the event loop

**Note** and before each phase every time it will check process.next tick first and then promises

**Timer**
    this phase executes callbacks scheduled by setTimeout() and setInterval()

**Pending Callback**
some pending callbacks will execute in this phase

**Idle prepare**
only used internally

**Poll**
    API, fs operration, I/O callbacks

**check**
    setImmediate() callbacks are invoked here

**Close**
    socket IO will execute

**setImmediate() vs setTimeout()**
setImmediate() and setTimeout() are similar, but behave in different ways depending on when they are called.

setImmediate() is designed to execute a script once the current poll phase completes.
setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.


**How node handles the multiple API calls**
    > The Single Thread & The Call Stack: Node.js runs your JavaScript code on a single main thread. The Call Stack is where it keeps track of what function is currently being executed.
    > Non-Blocking I/O: Network requests (like your API calls) and database queries are Input/Output (I/O) operations. Node.js is built to handle these in a non-blocking way. It uses a C++ library called Libuv to delegate these slow tasks to the underlying operating system, which can handle many of them at once.
    > The Event Loop: This is the heart of Node.js. It's a constantly running process that orchestrates everything. Its job is simple:
        > It checks the Call Stack. If it's empty, it means your main code has finished running for now.
        > It then checks the Callback Queue (also called the Task Queue). Are there any completed tasks (like a finished API response) waiting?
        > If yes, it takes the first task from the queue and pushes it onto the Call Stack to be executed.
    **How Node.js Handles Your Request**
        When a single call comes into your Node.js application that needs to trigger 8-10 other API calls, here is what happens:
        > The Request Arrives: Your Node.js server receives the incoming HTTP request. This happens on its one and only main thread, called the Event Loop.
        > Initiating the API Calls: Your code starts executing. It reaches the part where it needs to make the first external API call.
            > Instead of waiting for that API to respond, Node.js says: "Hey, operating system, please make this network request for me. Let me know when it's done."
            > Node.js then immediately moves to the next line of your code.
            > It does the same for the 2nd, 3rd, and all 10 API calls. It fires them all off very quickly, one after the other, without waiting for any of them to finish.
        > Doing Other Work (or a Tiny Wait): In the milliseconds that the 10 API calls are traveling over the network, your Node.js server is free. If another user's request comes in, it can start processing that one. It is not blocked.
        > Responses Come Back: The other APIs start responding. As each response arrives:
            > The operating system notifies Node.js: "Hey, that API call to service #7 just finished. Here's the data."
            > Node.js places this completed task (the data and the code to run with it, known as a callback) into a queue.
            > The Event Loop sees the completed task in the queue, picks it up, and executes your callback code (e.g., processes the data from API #7).
        This happens for all 10 API responses as they come back, in whatever order they finish.    




