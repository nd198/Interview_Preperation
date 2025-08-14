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