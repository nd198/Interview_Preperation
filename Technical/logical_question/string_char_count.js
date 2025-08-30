console.log("Hello, World!");
let Input = "aabbccdddaeefggg";
let Output = "a2b2c2d3a1e2f1g3";
let strLength = Input.length;
let finalOutput= '', count = 0, prev = '';
for (var i = 0; i < Input.length; i++) {
  if(i==0){
    finalOutput = Input[i];
    count += 1
    prev = Input[i];
  }else{
    if(Input[i]==prev){
      count += 1;
      prev = Input[i];
      if(i==strLength-1){
        finalOutput += count;
      }
    }else{
      console.log("iiii", i)
      finalOutput += count;
      finalOutput += Input[i];
      count = 1;
      prev = Input[i]
    }
  }
  
}
if(Output==finalOutput){
  console.log("String matched")
}
console.log("finalOutput====", finalOutput, "Output", Output)