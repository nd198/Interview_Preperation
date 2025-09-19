function pushZerosToEnd(arr) {
    
    // Count of non-zero elements
    let count = 0;  

    // If the element is non-zero, replace the element at
    // index 'count' with this element and increment count
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0)
            arr[count++] = arr[i];
    }

    // Now all non-zero elements have been shifted to
    // the front. Make all elements 0 from count to end.
    while (count < arr.length)
        arr[count++] = 0;
}

// Driver Code
const arr = [1, 2, 0, 4, 3, 0, 5, 0];
pushZerosToEnd(arr);
console.log(arr.join(" "));