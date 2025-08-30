function sumMatrixElementsColumnWise(matrix) {
    let totalSum = 0;

    // Handle edge cases: empty matrix or matrix with no columns
    if (!matrix || matrix.length === 0) {
        return 0;
    }
    if (matrix[0].length === 0) { // Check if the first row has no columns
        return 0;
    }

    // Get dimensions (assuming a rectangular matrix for basic column-wise traversal)
    const numRows = matrix.length;
    const numCols = matrix[0].length; // Number of columns in the first row (assumed consistent)

    // Traverse column by column (outer loop)
    for (let j = 0; j < numCols; j++) { // 'j' represents the current column index
        // Within each column, traverse row by row (inner loop)
        for (let i = 0; i < numRows; i++) { // 'i' represents the current row index
            totalSum += matrix[i][j]; // Add the element at the current (row, column) to the sum
        }
    }

    return totalSum;
}

// Test Cases
console.log("Example 1 Output:", sumMatrixElementsColumnWise([[1,2,3],[4,5,6],[7,8,9]]));     // Expected: 45
console.log("Example 2 Output:", sumMatrixElementsColumnWise([[10,20],[30,40]]));             // Expected: 100
console.log("Single element matrix:", sumMatrixElementsColumnWise([[5]]));                   // Expected: 5
console.log("Single row matrix:", sumMatrixElementsColumnWise([[1,2,3,4,5]]));              // Expected: 15
console.log("Single column matrix:", sumMatrixElementsColumnWise([[10],[20],[30]]));         // Expected: 60
console.log("Empty matrix:", sumMatrixElementsColumnWise([]));                               // Expected: 0
console.log("Matrix with empty inner array:", sumMatrixElementsColumnWise([[]]));            // Expected: 0
console.log("Matrix with multiple empty inner arrays:", sumMatrixElementsColumnWise([[],[],[]])); // Expected: 0