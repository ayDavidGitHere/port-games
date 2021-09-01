function PlayStars(){try{var a=document.getElementById("canvas"),b=a.getContext("2d"),sW=a.width=screen.width,sH=a.height=window.innerHeight; a.style.marginTop=0; a.style.marginLeft=0;var CW = sW,CH = sH;let CR = MHelp.resultantOf(CW, CH);let scene = new CDraw.useScene(b);
    
    
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
    
    let sPlanet = function (x,y,r){
    let spArc = new CDraw.arc(x,y,r,0,6.3,"_#"+MHelp.randOpt(232345,121223));
    scene.add(spArc);
    let rot = -0.005+Math.random()*0.01;
    let spots = [];
    for(let i=0;20>i;i++){
    let spot=new CDraw.arc(0,0,Math.random()*spArc.radius/6,0,6.3,"_black");
    spot.x=spot.rx=spArc.x- spArc.radius+Math.random()*spArc.radius*2;
    spot.y=spot.ry=spArc.y- spArc.radius+Math.random()*spArc.radius*2;
    var hyp=Math.sqrt(Math.pow(spot.x-spArc.x, 2)+Math.pow(spot.y-spArc.y, 2))
    if(hyp>spArc.radius){i--; continue;}
    scene.add(spot);
    spots.push(spot);
    }
    let move= ()=>{spArc.y++; spots.map((spot)=>{ 
    spot.y++;spot.rotation.about=spArc.center; spot.rotation.rad+=rot;})}
    return {arc: spArc, spots: spots, move: move,rot: rot}
    }
    let sps=[];
    for (let i=0; 13>i; i++){
        let sprad = CW/10+(Math.random()*10)*(CW/10)/10;
        let prevgs = sps[i-1]; 
        let spy=(prevgs!=undefined?prevgs.arc.y-prevgs.arc.radius*(2+Math.random()*4)-sprad:-sprad);
        let sp = new sPlanet(Math.random()*CW,spy,sprad);
        sps.push(sp);
    }
    
    
    
    
    
    
    
    
    
    let Rocket = function (){
        let x=CW/2,brd=CW/7,y=CH/2,len=100,col1="_#ee2233",col2="_#ee3344";
        let headRad = brd*0.35; let bodyLen = len;
        let head=new CDraw.arc(x,y, headRad, 3.15, 6.35, col1);
        let body=new CDraw.rect(head.x-headRad,headRad*2,head.y,bodyLen,col1);
        let w1headRad = brd*0.33; let w1bodyLen = bodyLen/2
        let w1head = new CDraw.arc(body.x,body.y+w1bodyLen*0.6,w1headRad,3.15,6.35,col2);
        let w1body = new CDraw.rect(w1head.x-w1headRad, w1headRad*2,w1head.y,w1bodyLen, col2);
        let w2head = new CDraw.arc(body.x+headRad*2,body.y+w1bodyLen*0.6,w1headRad,3.15,6.35,col2);
        let w2body = new CDraw.rect(w2head.x-w1headRad, w1headRad*2,w1head.y,w1bodyLen, col2);
        scene.add(w1head); scene.add(w1body);
        scene.add(w2head); scene.add(w2body);
        scene.add(body); scene.add(head);
        this.move = function(){
            this.x+=this.speedx; this.y+=this.speedy; 
            this.childs.map((child)=>{
                child.x+=this.speedx; child.y+=this.speedy;
                child.rotation.about= head.center; 
                child.rotation.rad=this.rotrad 
            });
        }
        this.childs=[w1head,w1body,w2head,w2body,head,body];
        this.x=x; this.y=y; this.speedx=0; this.speedy=0; this.rotrad=0;
    }
    let rkt = new Rocket();
    
    
    
    
    
    
    
    
    
    
    
    let gss=[];
    for (let i=0; 13>i; i++){
        let sprad = (2+Math.random()*3)*(CW/20)/5;
        let prevgs = gss[i-1]; 
        let spy=
        (prevgs!=undefined?prevgs.y-CH/2-Math.random()*CH/2-sprad:-sprad);
        let gs = new CDraw.arc(Math.random()*CW+CW,spy,sprad,0,6.3,"_"+MHelp.randOpt('red','blue'));
        gs.GCParams.shadow=[-CW,0.1,gs.color,gs.radius*1.2];
        let speedy=2+Math.random()*2;
        gs.move= ()=>{
            gs.y+=speedy;
            let lastgs=gss[12]; 
            if(gs.y-gs.radius>CH){ 
                gs.y=lastgs.y-CH/2-Math.random()*CH/2-sprad;
            };
        }
        scene.add(gs)
        gss.push(gs);
    };
    
    
    
    
    
    
    
    
    let animate = function(){
        
        
        
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
        
        sps.map((sp)=>{sp.move();})
        gss.map((gs)=>{gs.move();})
        
        
        rkt.move();
        {
        let th = touched.hist;
        log(th.length+": x;", rkt.speedx)
        if(th.length>1)rkt.speedx = (th[th.length-1].x-th[th.length-2].x);
        else rkt.speedx = 0;
        }
        rkt.rotrad=(3.2-6.3*rkt.x/CW)/10;
        
        
        
        requestAnimationFrame(animate)
    }

    
    var touched ={hist:[]};
    a.ontouchstart = function(e){
        let x = e.touches[0].pageX; let y=e.touches[0].pageY;
        touched.active=true; touched.hist.push({x:x,y:y});
    }
    a.ontouchmove = function(e){
        let x = e.touches[0].pageX; let y=e.touches[0].pageY;
        touched.active=true; touched.hist.push({x:x,y:y});
    }
    a.ontouchend = function(ev){touched.active = false; touched.hist=[];}
    animate();
    
    
    
    
    
    var lastTime = 0;
    function log(){
    let thisTime = new Date().getMilliseconds();
    DOMHelp._("logger").innerText = [...arguments]+"\n"+(thisTime-lastTime);
    lastTime = thisTime;
    }
    
    
}catch(e){console.log(e)}
}