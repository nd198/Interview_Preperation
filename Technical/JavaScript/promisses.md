**Promisse**
    > The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    > promise object are Immutable in nature.
    > it resolved the callback hell problem
    > we can do promise chaning
    **A Promise is in one of these states:**
        > pending: initial state, neither fulfilled nor rejected.
        > fulfilled: meaning that the operation was completed successfully.
        > rejected: meaning that the operation failed.
    `let cart = ["neha", "sonu", "kirti", "pooja"]; 
    createOrder(cart, function(orderId){
        proceedToPayment(orderId)
    })
    const promise = createOrder(cart);
    promise.then(function(orderId){
        proceedToPayment(orderId)
    })`
**Promise.all**
        Promise.all is a static method in JavaScript used to run multiple asynchronous operations(Promises) in parallel and wait for all of them to complete. It returns a single Promise that:
        **Resolves** when all input promises resolve, with an array of their results in the same order.
        **Rejects** immediately if any input promise rejects, with the reason from the first rejection.
        if any promise got failed it will not wait for any other promisses
        `const promise1 = fetch('https://api.example.com/user'); // Returns a promise
        const promise2 = fetch('https://api.example.com/orders');
        const promise3 = fetch('https://api.example.com/notifications');

        Promise.all([promise1, promise2, promise3])
        .then(responses => {
            // responses is an array: [userResponse, ordersResponse, notificationsResponse]
            return Promise.all(responses.map(response => response.json()));
        })
        .then(dataArray => {
            // dataArray is the array of parsed JSON data from all three fetches
            console.log('User:', dataArray[0]);
            console.log('Orders:', dataArray[1]);
            console.log('Notifications:', dataArray[2]);
        })
        .catch(error => {
            // If any fetch fails, or any .json() fails, this block runs!
            console.error('Failed:', error);
        });`
**Promise.allsetled**
        Promise.allSettled() is a method that lets you handle multiple promises concurrently. It returns a single promise that resolves after all the given promises have "settled"—meaning each has either fulfilled (resolved) or rejected—regardless of outcome. You get an array of result objects: one for each input promise, specifying whether it was fulfilled or rejected, and its value or reason.  
        **Use Case:**
            > When you want to run several async operations at once, and you need to know the result of each, even if some fail.

            > Unlike Promise.all(), which fails fast on the first rejection, allSettled waits for every promise to complete. 
**Promise.race**:
        > it will return the value of first settled promise(no matters wheather its fullfilled or rejected)
        > Promise.race() in JavaScript is a static method of the Promise object that takes an iterable (like an array) of promises as input and returns a new promise. This returned promise settles as soon as one of the promises in the input iterable settles, meaning it either fulfills (resolves) or rejects. The value or reason of the Promise.race() result will be the value or reason from that first settled promise.
        **How it works:**
            1) If the fastest promise fulfills, the Promise.race() promise fulfills with that promise's value.
            2) If the fastest promise rejects, the Promise.race() promise rejects with that promise's reason.
            3) If the iterable is empty, the returned promise will forever remain in a pending state.
                `const promise1 = new Promise((resolve, reject) => {
                setTimeout(() => resolve('Promise 1 resolved'), 500); // Resolves after 500ms
                });

                const promise2 = new Promise((resolve, reject) => {
                setTimeout(() => resolve('Promise 2 resolved'), 100); // Resolves after 100ms
                });

                const promise3 = new Promise((resolve, reject) => {
                setTimeout(() => reject('Promise 3 rejected'), 200); // Rejects after 200ms
                });

                Promise.race([promise1, promise2, promise3])
                .then((value) => {
                    console.log(value); // Output: "Promise 2 resolved" because it's the fastest to resolve.
                })
                .catch((error) => {
                    console.error(error);
                });

                // Example with a rejection winning the race:
                const promiseA = new Promise((resolve) => {
                setTimeout(() => resolve('Promise A resolved'), 300);
                });

                const promiseB = new Promise((_, reject) => {
                setTimeout(() => reject('Promise B rejected'), 50); // Rejects faster
                });

                Promise.race([promiseA, promiseB])
                .then((value) => {
                    console.log(value);
                })
                .catch((error) => {
                    console.error(error); // Output: "Promise B rejected"
                });`

**Promise.any**:
        > wait for first success, and return the value
        > if all the promises got failed then it will return the array of all failed promises.
        > If the first promise to fulfill resolves, the Promise.any() promise fulfills with that promise's value.
        > If all promises in the iterable reject, the Promise.any() promise rejects with an AggregateError object. This error object groups all the individual rejection reasons from the input promises.
        > If the iterable is empty, the returned promise will immediately reject with an AggregateError (specifically, an empty AggregateError).
            `const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => reject('Promise 1 failed'), 500); // Rejects after 500ms
            });

            const promise2 = new Promise((resolve, reject) => {
            setTimeout(() => resolve('Promise 2 succeeded!'), 100); // Resolves after 100ms
            });

            const promise3 = new Promise((resolve, reject) => {
            setTimeout(() => reject('Promise 3 failed'), 200); // Rejects after 200ms
            });

            Promise.any([promise1, promise2, promise3])
            .then((value) => {
                console.log(value); // Output: "Promise 2 succeeded!"
            })
            .catch((error) => {
                console.error(error); // This catch block will NOT be hit in this case
            });

            // Example where all promises reject:
            const promiseA = new Promise((resolve, reject) => {
            setTimeout(() => reject('Promise A rejected'), 300);
            });

            const promiseB = new Promise((resolve, reject) => {
            setTimeout(() => reject('Promise B rejected'), 50);
            });

            Promise.any([promiseA, promiseB])
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                console.error("Error======",error);
                // Output: AggregateError: All promises were rejected
                // error.errors will be ['Promise B rejected', 'Promise A rejected']
            });`
