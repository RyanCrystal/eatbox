var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;
var pause;
var keys = [];
var Xarray = [20,40,60,80,100,120];
var Yarray = [20,20,20,20,20,20];
var now, then, elapsed, startTime;
var fpsInterval;
var direction = 'right';
var newBoxColor = 'blue';
var hitBoundary = false;
var boxPos={};
boxPos.x = Math.floor(Math.random()*39)*20
boxPos.y = Math.floor(Math.random()*25)*20

function start(){
    fpsInterval = 500;
    then = Date.now();
    startTime = then;
    move();
}

function move(){
    requestAnimationFrame(move);
    if(!hitBoundary){
        moveDirection(Xarray,Yarray,direction);
        while(hasConflict()){
            boxPos.x = Math.floor(Math.random()*39)*20
            boxPos.y = Math.floor(Math.random()*25)*20;
        }
        createNewBox(boxPos)
        if(keys[37] ){
            if(direction!='right')
            direction = 'left';
        }
        if(keys[38] ){
            if(direction!='down')
            direction = 'up';
        }
        if(keys[39] ){
            if(direction!='left')
            direction = 'right';
        }
        if(keys[40] ){
            if(direction!='up')
            direction = 'down';
        }
        console.log(direction);
        
        now = Date.now();
        elapsed = now - then;
        if(elapsed > fpsInterval)
        {
            then = now ;
            checkReachBoundary();
            // checkSelfConfict();

            switch (direction) {
    
                case 'left':
                    if(Xarray[Xarray.length-1]-20<0 ||checkSelfConfict(direction) ){
                        console.log(checkSelfConfict(direction) );
                        
                        hitBoundary = true;
                    }else{
                        Xarray.push(Xarray[Xarray.length-1]-20);
                        Yarray.push(Yarray[Yarray.length-1]);
                    }
                    break;
                case 'up':
                    if(Yarray[Yarray.length-1]-20<0 || checkSelfConfict(direction)){
                        hitBoundary = true;
                    }else{
                        Xarray.push(Xarray[Xarray.length-1]);
                        Yarray.push(Yarray[Yarray.length-1]-20);
                    }
                    break; 
                case 'right':
                    if(Xarray[Xarray.length-1]+20==800 || checkSelfConfict(direction)){
                        hitBoundary = true;
                    }else{
                        Xarray.push(Xarray[Xarray.length-1]+20);
                        Yarray.push(Yarray[Yarray.length-1]);
                    }
                    // console.log(Xarray,Yarray)
                    break;
                case 'down':
                    if(Yarray[Yarray.length-1]+20==500 || checkSelfConfict(direction)){
                        hitBoundary = true;
                    }else{
                        Xarray.push(Xarray[Xarray.length-1]);
                        Yarray.push(Yarray[Yarray.length-1]+20); 
                    }     
                    break;         
                default:
                    break;
            }


            // console.log(Xarray,Yarray);
            // console.log(boxPos);
            if(Xarray[Xarray.length-1] == boxPos.x  && Yarray[Yarray.length-1] == boxPos.y ){
                newBoxColor = 'blue';
                boxPos.x = Math.floor(Math.random()*39)*20
                boxPos.y = Math.floor(Math.random()*25)*20;
    
                while(hasConflict()){
                    boxPos.x = Math.floor(Math.random()*39)*20
                    boxPos.y = Math.floor(Math.random()*25)*20;
                }
                console.log('cross')
    
            }else if(!hitBoundary){
                console.log('hit')
                Xarray.shift();
                Yarray.shift();
            }
        }
    
    }else{
        alert('game over')
        
    }

}

function moveDirection(Xarray,Yarray,direction){
    ctx.clearRect(0,0,800,500);
    ctx.fillStyle = 'green';
    for(var i=0;i<Xarray.length;i++){
        ctx.fillRect(Xarray[i],Yarray[i],20,20);
        // ctx.fillRect(start[i].x+20,start[i].y+20,20,20);
    }
    ctx.fillStyle = '#000000';

    for(var i=0;i<Xarray.length-1;i++){
        // console.log(Xarray,Yarray)
        if(Xarray[i]==Xarray[i+1]-20 && Yarray[i]== Yarray[i+1]){
            // console.log(Xarray,Yarray);
            ctx.fillRect(Xarray[i]+20,Yarray[i],1,20);
            }

        else if(Xarray[i]==Xarray[i+1]+20 && Yarray[i]== Yarray[i+1]){
            ctx.fillRect(Xarray[i],Yarray[i],1,20);
        }
        else if(Xarray[i]==Xarray[i+1] && Yarray[i]== Yarray[i+1]-20){
            ctx.fillRect(Xarray[i],Yarray[i]+20,20,1);
        }
        else if(Xarray[i]==Xarray[i+1] && Yarray[i]== Yarray[i+1]+20){
            ctx.fillRect(Xarray[i],Yarray[i],20,1);
        }
    }
}

function createNewBox(boxPos){
    ctx.fillStyle = newBoxColor;
    ctx.fillRect(boxPos.x,boxPos.y,20,20)
}

function hasConflict(){
    for(var j=0;j<Xarray.length;j++){
        if(Xarray[j] == boxPos.x && Yarray[j] == boxPos.y){
            return true;
        }
     }
    return false;
}

function checkReachBoundary(){
    for(var i=0;i<Xarray.length;i++){
        if(Xarray[i] == 800 || Yarray[i] == 500){
            hitBoundary = true;
            break;
        }
    }
}

function checkSelfConfict(direction){
    switch (direction) {
        case 'up':
            for(var i=0 ;i<Xarray.length;i++){
               if(Yarray.slice().splice(0,1)[i] == Yarray[Yarray.length-1]-20 && Xarray.slice().splice(1,Xarray.length-1)[i] == Xarray[Xarray.length-1]){
                   return true;
               } 
            }
            return false;
        case 'down':
            for(var i=0 ;i<Xarray.length;i++){
                if(Yarray.slice().splice(1,Xarray.length-1)[i] == Yarray[Yarray.length-1]+20 && Xarray.slice().splice(1,Xarray.length-1)[i] == Xarray[Xarray.length-1]){
                    return true;
                } 
             }
             return false;
        case 'left':
            for(var i=0 ;i<Xarray.length;i++){
                if(Yarray.slice().splice(1,Xarray.length-1)[i] ==  Yarray[Yarray.length-1] && Xarray.slice().splice(1,Xarray.length-1)[i] == Xarray[Xarray.length-1]-20){
                    return true;
                } 
             }
             return false;
        case 'right':
            for(var i=0 ;i<Xarray.length;i++){
                if(Yarray.slice().splice(1,Xarray.length-1)[i] == Yarray[Yarray.length-1] && Xarray.slice().splice(1,Xarray.length-1)[i] == Xarray[Xarray.length-1]+20){
                    return true;
                } 
             }
             return false;
        default:
            break;
    }
    for(var i=0; i<Xarray.length; i++){
     
    }
}

start();


document.body.addEventListener("keydown", function (e) {
    if(e.keyCode == 32)
    {
        pause =!pause;
    }
        keys[e.keyCode] = true;
    });

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

// var stop = false;
// var frameCount = 0;
// var $results = $("#results");
// var fps, fpsInterval, startTime, now, then, elapsed;

// startAnimating(5);

// function startAnimating(fps) {
//     fpsInterval = 1000 / fps;
//     then = Date.now();
//     startTime = then;
//     console.log(startTime);
//     animate();
// }


// function animate() {

//     // stop
//     if (stop) {
//         return;
//     }

//     // request another frame

//     requestAnimationFrame(animate);

//     // calc elapsed time since last loop

//     now = Date.now();
//     elapsed = now - then;

//     // if enough time has elapsed, draw the next frame

//     if (elapsed > fpsInterval) {

//         // Get ready for next frame by setting then=now, but...
//         // Also, adjust for fpsInterval not being multiple of 16.67
//         then = now - (elapsed % fpsInterval);

//         // draw stuff here


//         // TESTING...Report #seconds since start and achieved fps.
//         var sinceStart = now - startTime;
//         var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
//         $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

//     }
// }