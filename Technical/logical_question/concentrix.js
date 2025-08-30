function resizeField(data, length) {

  let value = data;

  if (Number.isInteger(data)) {

    value = data.toString()

  }

  if (!value.length) {

    value = " ";

   }

return value.substr(0,length);

}

console.log(resizeField("abcdef",3)) //expect: abc

console.log(resizeField(123456,4)) //expect:1234

console.log(resizeField(null,4)) //expect:' '
 
 


 
 


var b= [1,2,3,4,5,6]

Array.prototype.sum = (function(){
  console.log("=====", this);
  let arr = this
  let sum = 0;
  for(let i=0;i< arr.length;i++){
    sum +=arr[i]
  }
  return sum
})

console.log("sum====", b.sum());



function sayHello(){ 
  console.log("Hello " + this.name);
}
var obj = {name: "Sandy"};

let temp = 15;

function prime (num){
  for(let j = 2; j<=num/2; j++){
    if(num % j == 0 ){
      console.log("temp[i]=====", num)
    }else{
      console.log("11111", num)
    }
  }
 
}


for (var i = 1; i < temp; i++) {
  prime(i)
}

console.log(i); // undefined
var i=20;
function caller(){
  i=30;
  {
    var i=0;
    console.log(i); // 0
  }
  console.log(i); // 0
}
caller();
console.log(i); // 0