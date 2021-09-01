function PlayStars(){try{var touched={active:false},a=document.getElementById("canvas"),b=a.getContext("2d"),sW=a.width=screen.width,sH=a.height=window.innerHeight; a.style.marginTop=0; a.style.marginLeft=0;var CW = sW,CH = sH;let CR = MHelp.resultantOf(CW, CH);let scene = new CDraw.useScene(b);
    
    
    let spaceColor = "#000012";
    let spaceColorGrad = b.createLinearGradient(0, 0, 0, CH);
    spaceColorGrad.addColorStop(1, spaceColor);
    spaceColorGrad.addColorStop(0, "black");
    
    let bgRect_1 = new CDraw.rect(0, CW, 0, CH, ["", spaceColorGrad]);
    scene.add(bgRect_1);
    
    
    
    
    let tStars = []
    for(let i=0; 60>i; i++){
    let tStarColor = MHelp.randOpt("white", "crimson", "goldenrod")
    let tStar = new CDraw.arc(CW/2, CH/2, CW/5, 0, 6.3, "_"+tStarColor);
    tStar.x = Math.random()*CW*2; tStar.y = Math.random()*CH;
    tStar.radius = 0.05+Math.random()*0.2;
    tStar.GCParams.shadow = [0.1, 0.1, "transparent", 0];//tStar.radius*2];
    tStar.alpha = 1;
    tStar.rotationSpeed = 0.0005*Math.random()*MHelp.randOpt(1,-1);
    tStar.speedX = (0.1+Math.random()*0.1)*MHelp.randOpt(-1, 1)
    tStars.push(tStar)
    scene.add(tStar)
    }
    
    
    let earthColor = "purple";//"#000023"; "#3311aa"; 
    let earthArc = new CDraw.arc(0, 0, CW/5, 0, 6.3, "_"+earthColor);
    let earthUmColor = earthColor;
    let earthUm = new CDraw.arc(0,0,0,0,6.3,"_"+earthUmColor);
    earthArc.alpha = 1;
    earthArc.x = earthUm.x = CW/2;    
    earthArc.y = earthUm.y = CH/2;
    earthUm.radius = earthArc.radius/1.1;
    earthUm.GCParams.shadow = [0.1, 0.1, earthUmColor, earthUm.radius/2];
    //earthArc.GCParams.shadow = [1, 1, "transparent", 0];
    scene.add(earthUm);
    scene.add(earthArc);
    
    console.log(CW,CH,earthArc.radius)
    let eSpots = []; let eSpotsLen = 6;
    let eSpotProps = [[0.56,0.39,0.07],[0.42,0.41,0.22],[0.56,0.44,0.13],[0.60,0.49,0.22],[0.42,0.56,0.15],[0.53,0.61,0.13]]
    for(let i=0; eSpotsLen>i; i++){
    let eSpotColor = "#0022dd44";// "#0000bc55";
    let eSP = eSpotProps[i];
    let eSpot = 
    new CDraw.arc(CW*eSP[0], CH*eSP[1], earthArc.radius*eSP[2], 0, 6.3, "_"+eSpotColor);
    //eSpot.GCParams.shadow = [1, 1, "#ffffff88", 1];//eSpot.radius*2];
    eSpots.push(eSpot);
    scene.add(eSpot)
    }
    
    
    
    
    let shieldColor = "blue";
    let offX=0, offY=0;
    let shield = new CDraw.arc(earthArc.x+offX,earthArc.y+offY,earthArc.radius*1.5, 0, 6-6.3/16, "1_"+shieldColor);
    shield.GCParams.shadow = [-offX, 0, shieldColor, 6];
    shield.angleSpeed = 0; //shield.alpha = 0;
    shield.activeSpan = 0; 
    //scene.add(shield);
    
    let turretColor = "red";
    let turretRect = new CDraw.rect(earthArc.x, 20, earthArc.y, 5, "_"+turretColor);
    turretRect.y= earthArc.y- turretRect.breadthY/2
    turretRect.rotation.about = earthArc.center;
    turretRect.rotation.rad += 6.3/4;
    //scene.add(turretRect)
    
    
    
    function ckAng(x,a,b){return (a<b?(x>a&&x<b):(x<a&&x<b));}
    function refreshMet(met){
        met.x = earthArc.x-earthArc.radius*met.dis*Math.cos(met.segangle);
        met.y = earthArc.y-earthArc.radius*met.dis*Math.sin(met.segangle);
//for(var segkey in met.segs){let seg = met.segs[segkey];seg.color = met.color;}
    }
    function makeMet(color, size, angle){
    let met = {color: color,x: CW/4,y:CH/4, r:CW/(70+size/5*70), seglen:15, segs: {},segx: 0,segy: 0, segangle: angle, dis: 2,};
    met.speed = 1;//2+Math.random()*5;
    refreshMet(met);
    met.hitShield = function(){
    log(met.color+",\n "+(met.segangle-3.1)+",\n "+shield.startAngle+",\n "+shield.endAngle);
    if(Math.sqrt(Math.pow(met.x-shield.x,2)+Math.pow(met.y-shield.y,2))<shield.radius&&ckAng(met.segangle-3.1,shield.startAngle,shield.endAngle)
    ){return true;}
        return false;
    }//EO met
    for (let i=0; met.seglen>i; i++){
    let seg=met.segs["seg"+i] = 
    new CDraw.arc(met.x, met.y, met.r/(1+i/met.seglen), 0, 6.3, "_"+met.color)
    seg.alpha = 1-i/met.seglen;
    seg.GCParams.shadow = [met.segx, met.segy, met.color, seg.radius*2];
    met.segx-= seg.radius*Math.cos(met.segangle);
    met.segy-= seg.radius*Math.sin(met.segangle);
    scene.add(seg);
    }//EO for;
    return met;
    }
    let mets = [
        makeMet("goldenrod", 5, 7*6.3/8),
        makeMet("red", 0, 5*6.3/8),
        makeMet("yellow", 3, 4*6.3/8),
    ];
    
    
    
    let animate = function(){
        earthArc.GCParams.shadow[3] = earthArc.radius*2;
        
        mets.map((met,metInd)=>{
        met.segx=met.segy=0;
        //resetting all props may reduce performance
        if(!met.hitShield()){
        met.x += met.speed*Math.cos(met.segangle);
        met.y += met.speed*Math.sin(met.segangle);
        for(var segkey in met.segs){
            let seg = met.segs[segkey]; seg.x = met.x; seg.y = met.y; 
            let shd=seg.GCParams.shadow;
            shd[2]=seg.color=met.color; shd[0]=met.segx; shd[1]=met.segy;
            met.segx-= seg.radius*Math.cos(met.segangle);
            met.segy-= seg.radius*Math.sin(met.segangle);
        }
        }//eO if
        else{
            met.dis = 2+Math.random()*2
            met.segangle+=Math.random()*8*6.3/8;
            //met.speed = 2+Math.random()*5;
            met.color = MHelp.randOpt("yellow", "red");
            refreshMet(met);
        }
        })//EO mets
        
        
        
        
        let shieldAngleSpeed = shield.angleSpeed;
        if(touched.active){
        shield.angleSpeed = 0.05;
        if(touched.x<CW/3){shieldAngleSpeed =-shield.angleSpeed;}
        if(touched.x>2*CW/3){shieldAngleSpeed =+shield.angleSpeed;}
        if(touched.x>CW/3&&touched.x<2*CW/3)shield.angleSpeed+=0.005;
        }
        else{shield.angleSpeed = 0; shieldAngleSpeed = shield.angleSpeed;}
        
        shield.startAngle+= shieldAngleSpeed;
        shield.endAngle+= shieldAngleSpeed;
        shield.startAngle%=6.3; shield.endAngle%=6.3;
        
        /*
        if(touched.active && shield.activeSpan<1){
            shield.angleGap = 6.3/16
            shield.startAngle = -1.6+(6.3*touched.x/CW)-shield.angleGap/2;
            shield.endAngle = shield.startAngle+shield.angleGap;
            turretRect.rotation.rad = shield.startAngle+6.3/16/2;
        }
        shield.alpha=shield.activeSpan/100;
        if(shield.activeSpan>0)shield.activeSpan--;
        */
        
        
        
        
        tStars.map((tStar)=>{
            tStar.x -= tStar.speedX;
            if(tStar.x<0 || tStar.x>CW){    
                tStar.speedX *=-1;
                tStar.y = Math.random()*CH;
                tStar.radius = 0.2+Math.random()*0.9; 
                tStar.color = 
                MHelp.randOpt("white", "crimson", "goldenrod");
            }
        })//EO map
        
        
        
        
        
        
        requestAnimationFrame(animate)
    }
    animate();
    
    
    
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
    a.ontouchend = function(ev){
        touched.active = false; shield.activeSpan=100;}
        
    var lastTime = 0;
    function log(){
    let thisTime = new Date().getMilliseconds();
    DOMHelp._("logger").innerText = [...arguments]+"\n"+(thisTime-lastTime);
    lastTime = thisTime;
    }
    
    
}catch(e){console.log(e)}
}