/*
var sum = 0;
var n = 3;
var sum1=0, sum2=1, sum3=0;
alert("Please Enter "+n+" Integers:\n");
    for (let i = 0; i < n; i++)
        {   
            var input = Number(prompt("val at "+i));
                    console.log(input)
                    sum1 = sum1 + input;//data[i];
                    sum2 = sum2*input;
                    sum3 = sum3 + ( 1 / input);
        }        
            a_mean = sum1/n;
            g_mean = Math.pow(sum2, 1/n);
            h_mean = n / sum3;
            console.log(a_mean, g_mean, h_mean);
            
*/
/*
import sys
aritSum = 0
geoMult = 1
number = int(input("Enter how many values to calculate: "))
i=0
while(number>i):
    inputValue = int(input("Enter your values:"))
    if(inputValue<0):
        print("You inputed a negative value")
        sys.exit()
    else:
        aritSum += inputValue
        geoMult *= inputValue
        i+=1
aritMean = aritSum/number
geoMean = geoMult**(1/number)
print(aritMean)
print(geoMean)
*/


realArr = [3,4,5,6];
arr = realArr;
//for(let i=arr.length-1; i>-1; i--){
//let val = arr[i]; console.log("loop: "+val);
realArr = []
arr.map((val)=>{
    send(val);
})
console.log(arr, realArr);
function send(val){
    console.log("func: "+val)
    console.log(arr)
    if(val==4){}
    else{realArr.push(val)}
}