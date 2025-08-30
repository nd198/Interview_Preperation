console.log("Hello, World!");
const _ = require('lodash');

function sayHello() {
  console.log('Hello, World');
}

_.times(5, sayHello);

// /**
//  * Implement the hasWord function to check the matrix of characters
//  * for foods that can appear in diagonal, horizontal or vertical directions.
//  * The words can also appear in reverse.
//  */

const matrix = [
  ["F", "O", "C", "G"],
  ["E", "O", "Q", "R"],
  ["A", "T", "O", "A"],
  ["T", "A", "S", "D"],
  ["R", "A", "E", "P"],
];

const words = [
  ['Food',true],
  ['Corn', false],
  ['Pear', true],
  ['Eat', true],
  ['Grain', false]
];

// Implement this function
function hasWord(word) {
  console.log("word====", word)
  const numRows = matrix.length;
  if (numRows === 0) {
    return false;
  }
  const numCols = matrix[0].length;
  const upperCaseWord = word.toUpperCase();
  const wordLen = upperCaseWord.length;
console.log("upperCaseWord======", upperCaseWord)
  // Define the 8 directions for searching (row and column changes)
  const directions = [
    [0, 1],   // Right
    [0, -1],  // Left
    [1, 0],   // Down
    [-1, 0],  // Up
    [1, 1],   // Diagonal Down-Right
    [-1, -1], // Diagonal Up-Left
    [1, -1],  // Diagonal Down-Left
    [-1, 1]   // Diagonal Up-Right
  ];

  // Iterate over each cell in the matrix
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      // If the character matches the first letter of the word
      if (matrix[r][c] === upperCaseWord[0]) {
        // Check in all 8 directions
        for (const [dr, dc] of directions) {
          let found = true;
          // Check if the rest of the word matches in the current direction
          for (let i = 1; i < wordLen; i++) {
            const newRow = r + i * dr;
            const newCol = c + i * dc;
            console.log("newRow====", newRow, newCol, "wordLen===", wordLen, "dr===", dr, "dc===", dc)
            // Check for out of bounds or character mismatch
            if (
              newRow < 0 || newRow >= numRows ||
              newCol < 0 || newCol >= numCols ||
              matrix[newRow][newCol] !== upperCaseWord[i]
            ) {
              found = false;
              break;
            }
          }
          if (found) {
            return true; // Word found
          }
        }
      }
    }
  }

  return false; // Word not found
}


function main() {
  let correct = 0;

  for (const [word, exists] of words) {
    if (hasWord(word) === exists) {
      correct++;
    }    
  }

  console.log(`You got ${(correct / words.length) * 100}% correct.`);
}

main();