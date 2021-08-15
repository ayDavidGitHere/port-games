export function Main(){
    
    var a = document.createElement("canvas");
    document.body.appendChild(a);
    var b = a.getContext("2d");
    CDraw.setCanvasStyle(a, {type: "fill", alpha: 0, position: "static", pinToTop: true});   
    let logger = document.createElement("span");
    document.body.appendChild(logger)
    var logText = "";
    drawOn(b); 





function drawOn(b){ 
    let CW = a.width = 300;
    let CH = a.heiCHt =300;
    let CR = MHelp.resultantOf(CW, CH);
    let scene = new CDraw.useScene(b);
    let bgRect = new CDraw.rect(0, CW, 0, CH, "_yellow");
    scene.add(bgRect);
    /*
    let bar1 = new CDraw.line(CW/2, CW/2, CH/2-CH/3/2, CH/2+CH/3/2,"brown", 20)
    let bar2 = new CDraw.line(CW/2, CW/2, CH/2-CH/3/2, CH/2+CH/3/2,"black", 20)
    */
    let bar1 = new CDraw.sLine(CW/2, 0, CH/2-CH/3/2, CH/3,"white", 5)
    let bar2 = new CDraw.sLine(CW/2, 0, CH/2-CH/3/2, CH/3,"black", 5)
    let num1 = new CDraw.text("+15pt Arial", "10", CW/2-CH/1.5/2, CH/2-CH/2.5/2, "_white");
    let arc1 = new CDraw.arc(0, 0, 20, 0, 6.3, "_pink");
    scene.add(bar1);
    scene.add(bar2);
    scene.add(arc1);
    scene.add(num1);
    bar1.breadthY = CH/1.5; bar2.breadthY = CH/1.5;
    bar1.y = CH/2-bar1.breadthY/2;    bar2.y = CW/2-bar2.breadthY/2; 
    bar1.color = "rgba(5, 5, 5, 0.6)";
    bar2.color = "rgba(5, 5, 5, 0.6)";
    bar1.rotation.rad -= 6.3/8
    bar2.rotation.rad += 6.3/8;
    
    
    num1.x = bar1.x-bar1.breadthY/4;
    num1.y = bar1.y+bar1.breadthY/4;
    num1.color = "red";
    num1.rotation.about = bar1.center;
    
    arc1.x = num1.x; arc1.y = num1.y;
    arc1.rotation.about = num1.rotation.about;
    arc1.color = "rgba(5, 5, 5, 0.5)";
    arc1.radius = bar1.breadthY/8;
    let rotSpeed = 6.3/8/32;
    
    
    
    
    update();
    function update(){
        bar1.rotation.rad -= rotSpeed;
        bar2.rotation.rad -= rotSpeed;
        num1.rotation.rad -= rotSpeed;
        arc1.rotation.rad -= rotSpeed
        
        
        logText = new Date().getSeconds();
        //b.drawImage(img, 0, 0, CW, CH);
        logger.innerText = logText;
        requestAnimationFrame(update);
    }//EO updateFrame
    
}   //EO drawOn
    
    
    
    
    
    
    
    
}//EO class