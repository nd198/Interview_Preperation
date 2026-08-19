function calculateCount(str){
  let temp = str[0];
  let prev = str[0];
  let count = 0;
  for (var i = 1; i < str.length; i++) {
    console.log("=====", str[i], prev, str[i])
    if(prev==str[i]){
      count++;
      console.log("temp======", temp)
    }
    else{
      temp = count!==0 ? temp+""+count : temp;
      temp = temp+str[i];
      prev = str[i];
      count = 0;
    }
    
  }
  return temp;
}

let str = 'aabbbcddddbba';

console.log("Final Output====", calculateCount(str));

// i/p: aa bbb c dddd bb a
// o/p: a1 b2 c d3 b1 a