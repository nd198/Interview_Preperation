<!-- Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.



Example 1:

Input: nums = [3,0,1]

Output: 2

Explanation:

n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:

Input: nums = [0,1]

Output: 2

Explanation:

n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]

Output: 8 -->

<!-- Solution -->

Of course. Here is a JavaScript program to find the missing number in an array containing n distinct numbers in the range [0, n].

There are several ways to solve this problem. A highly efficient and easy-to-understand method uses the mathematical formula for the sum of a sequence of numbers.

The Summation Method (Gauss's Formula)

The core idea is to calculate the sum of all numbers that should be in the range [0, n] and subtract the sum of the numbers that are actually in the given array. The difference will be the missing number.

Find n: The value of n is simply the length of the input array nums.

Calculate the Expected Sum: The sum of a consecutive sequence of numbers from 0 to n can be found using the formula: n * (n + 1) / 2.[1][2]

Calculate the Actual Sum: Sum all the numbers present in the nums array.[2]

Find the Missing Number: The missing number is the result of expectedSum - actualSum.[1]

Here is the JavaScript implementation:

Generated javascript
/**
 * @param {number[]} nums An array containing n distinct numbers in the range [0, n].
 * @return {number} The only number in the range that is missing from the array.
 */
const missingNumber = function(nums) {
  // n is the length of the array, which is also the upper bound of the range [0, n].
  const n = nums.length;

  // Calculate the expected sum of the sequence from 0 to n.
  // The formula for the sum of an arithmetic series is n * (n + 1) / 2.
  const expectedSum = n * (n + 1) / 2; [4, 5]

  // Calculate the actual sum of the numbers in the input array.
  // The reduce method is a clean way to sum up array elements.
  const actualSum = nums.reduce((sum, num) => sum + num, 0); [5]

  // The difference between the expected sum and the actual sum is the missing number.
  return expectedSum - actualSum; [4]
};

// Example 1:
const nums1 = [3, 0, 1];
console.log(`Input: [${nums1}]`);
console.log(`Output: ${missingNumber(nums1)}`); // Output: 2
console.log("\n");

// Example 2:
const nums2 = [0, 1];
console.log(`Input: [${nums2}]`);
console.log(`Output: ${missingNumber(nums2)}`); // Output: 2
console.log("\n");

// Example 3:
const nums3 = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(`Input: [${nums3}]`);
console.log(`Output: ${missingNumber(nums3)}`); // Output: 8

Alternative Methods

For completeness, here are other common approaches:

Sorting: You can sort the array and then iterate through it to find the first index that does not match its value. This approach has a time complexity of O(n log n) due to the sorting step.[3]

Set/Hashing: You can add all numbers from the input array to a Set for fast lookups. Then, loop from 0 to n and check if the number exists in the set. The first number you don't find is the missing one. This has a time complexity of O(n) and a space complexity of O(n).[3]

Bitwise XOR: This clever approach achieves O(n) time complexity and O(1) space complexity by XORing all the numbers in the array together with all the numbers in the range [0, n]. The properties of XOR will cancel out all the common numbers, leaving only the missing one.

Sources
help
medium.com
medium.com
geeksforgeeks.org
Google Search Suggestions
Display of Search Suggestions is required when using Grounding with Google Search. Learn more
missing number in a range javascript