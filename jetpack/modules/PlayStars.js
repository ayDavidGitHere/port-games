function PlayStars(){
try{
    var touched = {active: false}
    var a = document.getElementById("canvas");
    var b = a.getContext("2d");
    var sW = a.width = screen.width;
    var sH = a.height = window.innerHeight;//screen.height; 
    a.style.marginTop = 0; a.style.marginLeft =0;
    
    var CW = sW; 
    var CH = sH;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);
    
    
    let spaceColor = "#000012";
    let spaceColorGrad = b.createLinearGradient(0, 0, 0, CH);
    spaceColorGrad.addColorStop(1, spaceColor);
    spaceColorGrad.addColorStop(0, "black");
    
    let bgRect_1 = new CDraw.rect(0, CW, 0, CH, ["", spaceColorGrad]);
    scene.add(bgRect_1);
    
    
    
    let sunColor = "goldenrod";  "#febb22"
    let sunArc = new CDraw.arc(0, 0, CW/10, 0, 6.3, "_"+sunColor);
    sunArc.alpha = 0.9;
    sunArc.x = 0+sunArc.radius;    sunArc.y = 0+sunArc.radius; 
    sunArc.initY = sunArc.y
    sunArc.GCParams.shadow = [1, 1, sunColor, sunArc.radius*2];
    scene.add(sunArc)
    
    
    let tStars = []
    for(let i=0; 15>i; i++){
    let tStarColor = MHelp.randOpt("white", "crimson", "goldenrod")
    let tStar = new CDraw.arc(CW/2, CH/2, CW/5, 0, 6.3, "_"+tStarColor);

    tStar.x = Math.random()*CW*2; tStar.y = Math.random()*CH;
    tStar.radius = 0.2+Math.random()*0.9;
    tStar.GCParams.shadow = [0.1, 0.1, tStarColor, tStar.radius*2];
    tStar.alpha = 1;
    tStars.push(tStar)
    scene.add(tStar)
    }
    
    let sBRect = new CDraw.rect(CW-90, 90, CH-30, 30, "1_green");
    let sBRectText = new CDraw.text("10pt Arial", "10", sBRect.x, sBRect.y-0, "_white");
    scene.add(sBRectText)
    scene.add(sBRect)
    
    

    
    let animate = function(){
        sunArc.GCParams.shadow[3] = sunArc.radius*2;
        
        
        tStars.map((tStar)=>{
            tStar.x--;
            if(tStar.x<0){    
                tStar.x = CW+Math.random()*CW; tStar.y = Math.random()*CH;
                tStar.radius = 0.2+Math.random()*0.9; 
                tStar.color = 
                MHelp.randOpt("white", "crimson", "goldenrod")
            }
        })//EO map
        
        if(touched.active)sunArc.y-= 0.02;
        else if(sunArc.initY > sunArc.y)sunArc.y+=0.3
        
        
        
        requestAnimationFrame(animate)
    }
    animate();
    
    
    
    a.ontouchstart = function(ev){
        touched.active = true;
    }
    a.ontouchend = function(ev){
        touched.active = false;
    }
    
    
    
}catch(e){console.log(e)}
}