
function calculate(grid){
  let m = grid.length; //row
  let n = grid[0].length; //col
  
  
  const temp = Array(m).fill(0).map(()=>Array(n).fill(0));
  
  temp[0][0] = grid[0][0]; // intialize value
  
  for (var i = 1; i <n ; i++) { // row
    temp[0][i] = temp[0][i-1] + grid[0][i]
  }
  
   for (var i = 1; i <m ; i++) { // col
    temp[i][0] = temp[i-1][0] + grid[i][0]
  }
  console.log("temp=====", temp)
  
  for(let i = 1; i<m; i++){
    for(let j = 1; j<n; j++){
      console.log("temp[i-1][j],temp[i][j-1]===", temp[i-1][j],temp[i][j-1])
      temp[i][j] = grid[i][j] + Math.min(temp[i-1][j],temp[i][j-1]);
    }
  }
  return temp[m-1][n-1]
}

let grid = [[1,2,3],[4,5,6]]//[[1,3,1],[1,5,1],[4,2,1]];
console.log("", calculate(grid));