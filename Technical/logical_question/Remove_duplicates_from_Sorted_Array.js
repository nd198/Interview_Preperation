function removeDuplicates(arr) {
    const n = arr.length;
    if (n <= 1)
        return n;
	
    // Start from the second element
    let idx = 1; 
    for (let i = 1; i < n; i++) {
        if (arr[i] !== arr[i - 1]) {
            arr[idx++] = arr[i];
        }
    }

    return idx;
}

// Driver code
const arr = [1, 2, 2, 3, 4, 4, 4, 5, 5];
const newSize = removeDuplicates(arr);

console.log(arr.slice(0, newSize).join(' '));