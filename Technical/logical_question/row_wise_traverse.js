function sumMatrixElements(matrix) {
    let totalSum = 0;

    // Handle edge cases: empty matrix or matrix with empty rows
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    // Traverse row by row
    for (let i = 0; i < matrix.length; i++) { // 'i' represents the current row index
        // Within each row, traverse column by column
        for (let j = 0; j < matrix[i].length; j++) { // 'j' represents the current column index
            totalSum += matrix[i][j]; // Add the element at the current (row, column) to the sum
        }
    }

    return totalSum;
}

// Test Cases
console.log("Example 1 Output:", sumMatrixElements([[1,2,3],[4,5,6],[7,8,9]]));     // Expected: 45
console.log("Example 2 Output:", sumMatrixElements([[10,20],[30,40]]));             // Expected: 100
console.log("Single element matrix:", sumMatrixElements([[5]]));                   // Expected: 5
console.log("Single row matrix:", sumMatrixElements([[1,2,3,4,5]]));              // Expected: 15
console.log("Single column matrix:", sumMatrixElements([[10],[20],[30]]));         // Expected: 60
console.log("Empty matrix:", sumMatrixElements([]));                               // Expected: 0
console.log("Matrix with empty inner array:", sumMatrixElements([[]]));            // Expected: 0
console.log("Matrix with mixed row lengths:", sumMatrixElements([[1,2],[3,4,5]])); // Expected: 15 (Note: this solution handles ragged arrays too)