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



r = 110
R = (255-r)+(255/2)/(255/2-r);
console.log(R)


//57.3 = console.log(180/Math.PI);
ang= 6.283/4; //180/180*Math.PI;//180*6.3/Math.PI
console.log("ang: ", ang,  "", Math.cos(ang), Math.sin(ang));


function ckAng(x,a,b){return (a<b?(x>a&&x<b):(x<a&&x<b));}
//function ckAng(a,b,x){return(x>Math.min(a,b)&&x<Math.max(a,b))}
console.log(ckAng(0.04,0,6.3));
console.log(ckAng(0.04, 1.5, 5-(6.3-1.5)));



obj = {obj:"obj"}
console.log({obj: "", x:"x", ...obj})



/**
 * 
 *egSpo.x = earthArc.x-earthArc.radius+earthArc.radius*Math.random()*2;
    egSpo.y = earthArc.y-earthArc.radius+earthArc.radius*Math.random()*2;
    var hyp = Math.sqrt(
    Math.pow(egSpo.x-earthArc.x, 2)
    +Math.pow(egSpo.y-earthArc.y, 2))
    if(hyp>earthArc.radius){i--; continue;}
    egSpo.radius= (earthArc.radius/egSposLen*(0.5+Math.random()));;
    */
    
    
    
    
    
    
    
    let gSt = function (x,y,r){
    let gsArc=new CDraw.arc(x,y,r,0,6.3,"_"+MHelp.randOpt('crimson','gold'));
    scene.add(gsArc);
    let rot = -0.005+Math.random()*0.01;
    let gSpos = [];
    for(let i=0;20>i;i++){
    let gSpo=new CDraw.arc(0,0,Math.random()*gsArc.radius/6,0,6.3,"_black");
    gSpo.x=gSpo.rx=gsArc.x- gsArc.radius+Math.random()*gsArc.radius*2;
    gSpo.y=gSpo.ry=gsArc.y- gsArc.radius+Math.random()*gsArc.radius*2;
    var hyp=Math.sqrt(Math.pow(gSpo.x-gsArc.x, 2)+Math.pow(gSpo.y-gsArc.y, 2))
    if(hyp>gsArc.radius){i--; continue;}
    scene.add(gSpo);
    gSpos.push(gSpo);
    }
    let move= ()=>{gsArc.y++; gSpos.map((gSpo)=>{ 
    gSpo.y++;gSpo.rotation.about=gsArc.center; gSpo.rotation.rad+=rot;})}
    return {arc: gsArc, gSpos: gSpos, move: move,rot: rot}
    }
    let gss=[];
    for (let i=0; 13>i; i++){
        let sprad = CW/20+(Math.random()*20)*(CW/20)/20;
        let lastsp = gss[i-1]; 
        let spy=(lastsp!=undefined?lastsp.arc.y-lastsp.arc.radius*(2+Math.random()*4)-sprad:-sprad);
        let gs = new gSt(Math.random()*CW,spy,sprad);
        gss.push(ss);
    }