// Jump Game - Minimum Jumps to Reach End
// nput: arr[] = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]
// Output: 3 
// Explanation: First jump from 1st element to 2nd element with value 3. From here we jump to 5th element with value 9, and from here we will jump to the last. 

// Input: arr = [1, 4, 3, 2, 6, 7]
// Output: 2 
// Explanation: First we jump from the 1st to 2nd element and then jump to the last element.

// Input: arr = [0, 10, 20]
// Output: -1
// Explanation: We cannot go anywhere from the 1st element.

// Given an array arr[] of non-negative numbers. Each number tells you the maximum number of steps you can jump forward from that position.
// For example:

// If arr[i] = 3, you can jump to index i + 1, i + 2, or i + 3 from position i.
// If arr[i] = 0, you cannot jump forward from that position.
// Your task is to find the minimum number of jumps needed to move from the first position in the array to the last position.

// Note: Print -1 if you can't reach the end of the array.
// JavaScript program to find the minimum number
// of jumps to reach the end of the array

function minJumpsRecur(i, arr) {
    // console.log(arr, "arrrrrrrrrrrrrrrrrrrrrrr", i >= arr.length - 1)
    // Return 0 when last element is reached.
    if (i >= arr.length - 1)
        return 0;

    // Traverse through all the points
    // reachable from arr[i].
    // Recursively, get the minimum number
    // of jumps needed to reach array end from
    // these points.
    let ans = Infinity;
    for (let j = i + 1; j <= i + arr[i]; j++) {
      console.log("j===", j,"i------",  i)
        let val = minJumpsRecur(j, arr);
        console.log("val======",val, "ans=====", ans)
        if (val != Infinity)
            ans = Math.min(ans, 1 + val);
    }
    console.log("ans=============",ans)
    return ans;
}

function minJumps(arr) {
    let ans = minJumpsRecur(0, arr);
    console.log("ans=========", ans)
    // If end cannot be reached.
    if (ans == Infinity) 
        return -1;
        
    return ans;
}

let arr = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9];
console.log(minJumps(arr));