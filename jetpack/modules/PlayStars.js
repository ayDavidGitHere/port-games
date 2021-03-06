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
    let planetArc = new CDraw.arc(0, 0, radius, 0, 6.3, "_"+planetColor);
    planetArc.GCParams.shadow = [0.1, 0.1, "transparent", 0];//planetArc.radius*2];
    planetArc.x = sunArc.x+sunArc.radius+dx;    
    planetArc.y = sunArc.y+sunArc.radius+dy;
    return planetArc
    }
    let earthArc = Planet(10, 10, sunArc.radius/103, "#3300aa");
    let mercuryArc = Planet(0, 0, sunArc.radius/103, "red");
    earthArc.rotation.rad += 6.28/16;
    
    
    
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
    
    let satBound = {};
    let satColor = "red";
    let satWing1 = new CDraw.rect(0, 20, 0, 20, "_"+satColor);
    let satWing2 = new CDraw.rect(0, 20, 0, 20, "_"+satColor);
    let satSpine = new CDraw.rect(0, 20, 0, 20, "_"+satColor);
    let satArc = new CDraw.arc(CW/5, CH/3, 8, 0, 6.3, "_"+satColor);
    scene.add(satSpine);
    scene.add(satWing1); scene.add(satWing2);
    scene.add(satArc)
    
    
    
    let gStars = [];
    for(let i=0; 6>i; i++){
    let gStarColor = MHelp.randOpt("gray", "#88888822")
    let gStar = new CDraw.rect(0, 20, 0, 20, "_"+gStarColor);
    gStar.x = Math.random()*CW; gStar.y = Math.random()*CH/2;
    gStar.lengthX = 10+Math.random()*10; gStar.breadthY = 5;
    gStar.speedX = 2+Math.random()*2.5
    gStars.push(gStar)
    scene.add(gStar)
    }
    
    
    
    let sBRect =new CDraw.rect(CW-90, 90, CH-30, 30,"_hsla(30,100%,50%,0.5)");
    let sBRectText = 
    new CDraw.text("10pt Arial", "10", sBRect.x, sBRect.y-0, "_white");
    scene.add(sBRectText);
    scene.add(sBRect);
    
    
    
    let dots = []; let dotColor = "red"
    let limit = CH;
    for(hyp=0; hyp<limit; hyp=hyp+10){
    let dot = new CDraw.rect(0,0,0,0, "_"+dotColor);
    dot.hyp=hyp;
    dots.push(dot)
    scene.add(dot);
    }
    function direct(sX, sY, rad, use){
        dots.map((dot)=>{
        dot.x = sX+Math.sin(rad)*dot.hyp;
        dot.y = sY+Math.cos(rad)*dot.hyp;
        dot.rotation.rad = rad*-2; dot.rotation.about=dot.center
        if(!use)dot.lengthX=dot.breadthY=0;
        else{dot.lengthX=2; dot.breadthY=2}
        });
    }
    
    
    
    
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
            
        })//EO map
        
        
        
        
        earthArc.rotation.rad += 0.003;
        earthArc.rotation.about = sunArc.center;
        earthArc.radius = sunArc.radius/103;
        mercuryArc.rotation.rad += 0.003;
        mercuryArc.rotation.about = sunArc.center;
        
        if(touched.active && false)sunArc.radius/= 1.02;
        else if(sunArc.initRadius > sunArc.radius)sunArc.radius*=1.02;
        
        
        
        satSpine.lengthX = satArc.radius*5;
        satSpine.x = satArc.x-satSpine.lengthX/2;
        satSpine.y = satArc.y- satSpine.breadthY/2;
        satSpine.breadthY = satArc.radius/3;
        
        satWing1.lengthX = satWing1.breadthY =
        satWing2.lengthX = satWing2.breadthY = satArc.radius*2;
        satWing1.x = satSpine.x- satWing1.lengthX/2;
        satWing2.x = satSpine.x+satSpine.lengthX- satWing2.lengthX/2;
        satWing1.y = satWing2.y = satArc.y- satWing1.breadthY/2;
        satBound = 
        {xMin:satWing1.x,yMin:satWing1.y,
        xMax:satWing2.x+satWing2.lengthX, yMax: satWing2.y+satWing2.breadthY}
        satWing2.rotation.rad +=0.01; satWing2.rotation.about = satArc.center
        satWing1.rotation.rad +=0.01; satWing1.rotation.about = satArc.center;
        satSpine.rotation.rad +=0.01; satSpine.rotation.about = satArc.center
        
        
        if(touched.active)
        {satArc.y--;
         satWing2.alpha=satWing1.alpha=satSpine.alpha=1;
         satWing1.rotation.rad += 0.03; satWing2.rotation.rad += 0.03
         satSpine.rotation.rad += 0.03;
        }
        else if(satArc.y<CH){ 
        satArc.y*=1.005;
        satWing2.alpha=satWing1.alpha=satSpine.alpha=0.5;
        }
        
        
        
        if(touched.active&&touched.forDir&&false){
            let rad = 1.6-Math.atan((touched.y-satArc.y)/satArc.x);
            console.log(rad)
            direct(satArc.x, satArc.y, rad, true);
        }
        else direct(satArc.x, satArc.y, 1.57, false);
        
        
        
        
        gStars.map((gStar)=>{
            gStar.x-=gStar.speedX;
            if(gStar.x+gStar.lengthX<0 ){    
                gStar.x = CW+Math.random()*CW; gStar.y = Math.random()*CH/2;
                gStar.lengthX = 10+Math.random()*10; gStar.breadthY = 5;
                gStar.speedX = 1+Math.random()*1.5;
            }
            if(gStar.x>=satBound.xMin&&gStar.x<=satBound.xMax&&gStar.y>=satBound.yMin&&gStar.y<=gStar.yMax){
                console.log(hit);
                gStar.x=-CW;
            }
        })//EO map
        
        
        
        
        
        
        
        
        requestAnimationFrame(animate)
    }
    animate();
    console.log(satBound);
    console.log(gStars[0])
    
    
    a.ontouchstart = function(e){
        let tX = e.touches[0].pageX; let tY=e.touches[0].pageY;
        let forDir = (tX<=CW/2?true:false);
        touched={active:true,x:tX,y:tY, forDir:forDir};
    }
    a.ontouchmove = function(e){touched.active = true;
        let tX = e.touches[0].pageX; let tY=e.touches[0].pageY;
        let forDir = (tX<=CW/2?true:false);
        touched={active:true,x:tX,y:tY, forDir:forDir};
    }
    a.ontouchend = function(ev){touched.active = false;}
    
    
    
}catch(e){console.log(e)}
}