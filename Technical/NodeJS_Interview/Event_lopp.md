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




