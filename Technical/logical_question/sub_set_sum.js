// Function to check whether any pair exists
// whose sum is equal to the given target value
function twoSum(arr, target)
{
    // Sort the array
    let left = 0, right = arr.length - 1;
    // Iterate while left pointer is less than right
    while (left < right) {
        let sum = arr[left] + arr[right];

        // Check if the sum matches the target
        if (sum === target)
            return true;
        else if (sum < target)
            left++; // Move left pointer to the right
        else
            right--; // Move right pointer to the left
    }
    // If no pair is found
    return false;
}

let arr = [ -3, -1, 0, 1, 2 ];
let target = -2;

// Call the twoSum function and print the result
if (twoSum(arr, target)) {
    console.log("true");
} else {
    console.log("false");
}