// Given an array arr[] consisting of positive, negative, and zero values, 
// find the maximum product that can be obtained from any contiguous subarray of arr[].
// nput: arr[] = [-2, 6, -3, -10, 0, 2]
// Output: 180
// Explanation: The subarray with maximum product is [6, -3, -10] with product = 6 * (-3) * (-10) = 180.

// Input: arr[] = [-1, -3, -10, 0, 6]
// Output: 30
// Explanation: The subarray with maximum product is [-3, -10] with product = (-3) * (-10) = 30.

// Input: arr[] = [2, 3, 4] 
// Output: 24 
// Explanation: For an array with all positive elements, the result is product of all elements. 
function maxProduct(arr){
    let n = arr.length
    let maxProd = arr[0];
    for (let i = 0; i < n; i++) {
        let mul = 1;
        for (let j = i; j < n; j++) {
            mul *= arr[j];
            if(mul>maxProd)
                maxProd = mul;
        }
        
    }
    return maxProd;
}

console.log("max Product=======",maxProduct([-2, 6, -3, -10, 0, 2]))
