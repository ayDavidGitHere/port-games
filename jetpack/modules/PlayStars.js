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
    let sunArc = new CDraw.arc(0, 0, CW/15*40, 0, 6.3, "_"+sunColor);
    sunArc.alpha = 0.9;
    sunArc.x = CW/2;    
    sunArc.y = CH+sunArc.radius; 
    sunArc.initRadius = sunArc.radius
    sunArc.GCParams.shadow = [1, 1, sunColor, sunArc.radius*2];
    
    function Planet(dx, dy, radius, planetColor){
    let planetColorDim ="rgba(150, 120, 0, 0.4)"
    let planetArc = new CDraw.arc(0, 0, radius, 0, 6.3, "_"+planetColor);
    planetArc.x = sunArc.x+sunArc.radius+dx;    
    planetArc.y = sunArc.y+sunArc.radius+dy;
    planetArc.GCParams.shadow =[0.1, 0.1, planetColorDim, 0];
    return planetArc
    }
    let earthArc = Planet(10, 10, sunArc.radius/103, "#3300aa");
    let mercuryArc = Planet(0, 0, sunArc.radius/103, "red");
    earthArc.rotation.rad += 6.35/16;
    
    
    
    let tStars = []
    for(let i=0; 60>i; i++){
    let tStarColor = MHelp.randOpt("white", "crimson", "goldenrod")
    let tStar = new CDraw.arc(CW/2, CH/2, CW/5, 0, 6.3, "_"+tStarColor);

    tStar.x = Math.random()*CW*2; tStar.y = Math.random()*CH;
    tStar.radius = 0.1+Math.random()*0.5;
    tStar.GCParams.shadow = [0.1, 0.1, "transparent", 0];//tStar.radius*2];
    tStar.alpha = 1;
    tStar.rotationSpeed = 0.0005*Math.random()*MHelp.randOpt(1,-1);
    tStars.push(tStar)
    scene.add(tStar)
    }
    scene.add(sunArc)
    scene.add(earthArc)
    scene.add(mercuryArc)
    
    
    
    
    
    let sBRect = new CDraw.rect(CW-90, 90, CH-30, 30, "1_green");
    let sBRectText = 
    new CDraw.text("10pt Arial", "10", sBRect.x, sBRect.y-0, "_white");
    scene.add(sBRectText)
    scene.add(sBRect)
    
    

    console.log(earthArc.x, earthArc.y)
    let animate = function(){
        sunArc.GCParams.shadow[3] = sunArc.radius*2;
        
        
        tStars.map((tStar)=>{
            tStar.x--;
            if(tStar.x<0 ){    
                tStar.x = CW+Math.random()*CW; tStar.y = Math.random()*CH;
                tStar.radius = 0.2+Math.random()*0.9; 
                tStar.color = 
                MHelp.randOpt("white", "crimson", "goldenrod")
            }
            //tStar.rotation.rad += tStar.rotationSpeed;
            //tStar.rotation.about = sunArc.center;
        })//EO map
        
        
        earthArc.rotation.rad += 0.003;
        earthArc.rotation.about = sunArc.center;
        earthArc.radius = sunArc.radius/103;
        mercuryArc.rotation.rad += 0.003;
        mercuryArc.rotation.about = sunArc.center;
        
        earthArc.realX = earthArc.rotation.about.x+
        Math.cos(earthArc.rotation.rad)*
        (earthArc.x-earthArc.rotation.about.x);
        earthArc.realY = 
        earthArc.rotation.about.y+
        Math.sin(earthArc.rotation.rad)*
        (earthArc.y-earthArc.rotation.about.y);
        console.log(earthArc.realX, earthArc.realY)
        
        if(touched.active && false)sunArc.radius/= 1.02;
        else if(sunArc.initRadius > sunArc.radius)sunArc.radius*=1.02;
        
        
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