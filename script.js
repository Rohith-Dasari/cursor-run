const player = document.querySelector(".player");
const enemy = document.querySelector(".enemy");
const scoreElement = document.querySelector(".score");
const obstacles = document.querySelectorAll(".obstacle");

let playerX=window.innerWidth/2;
let playerY=window.innerHeight/2;
let speed=4;

let enemyX=50;
let enemyY=50;
let enemySpeed=3;

let keys={};
let score=0;
let gameOver=false;

window.addEventListener("keydown",e=>keys[e.key]=true);
window.addEventListener("keyup",e=>keys[e.key]=false);

function isColliding(x,y,w,h,ox,oy,ow,oh){
    if (x+w<ox||x>ox+ow||y+h<oy||y>oy+oh){
        return false
    }else{
        return true
    }
}

function movePlayer(){
    let newX=playerX;
    let newY=playerY;

    if(keys["w"]||keys["ArrowUp"]){
        newY-=speed;
    }
    if(keys["s"]||keys["ArrowDown"]){
        newY+=speed;
    }
    if(keys["a"]||keys["ArrowLeft"]){
        newX-=speed;
    }
    if(keys["d"]||keys["ArrowRight"]){
        newX+=speed;
    }

    let canMove = true;
    for (const ob of obstacles){
        const rect=ob.getBoundingClientRect();
        if(isColliding(newX,newY,30,30,rect.left,rect.top,rect.width,rect.height)){
            canMove=false;
            break;
        }
    }
    if (canMove) {
        playerX = newX;
        playerY = newY;
    }    

    if(playerX>window.innerWidth-30){
        playerX=window.innerWidth-30;
    }else if (playerX<0){
        playerX=0;
    }

    if(playerY>window.innerHeight-30){
        playerY=window.innerHeight-30;
    }else if (playerY<0){
        playerY=0;
    }

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}
function moveEnemy(){
    const dx=playerX-enemyX;
    const dy=playerY-enemyY;

    const dist=Math.sqrt(dx*dx+dy*dy);

    if(dist>0){
        enemyX+=(dx/dist)*enemySpeed;
        enemyY+=(dy/dist)*enemySpeed;
    }
    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

    if (Math.abs(playerX-enemyX)<20 &&Math.abs(playerY-enemyY)<25){
        gameOver=true;
        alert("Game Over! Score:"+score);
        window.location.reload();
    }
}

function updateScore(){
    score++;
    scoreElement.textContent="Score: "+score;
}

function gameLoop(){
    if(gameOver)return;
    movePlayer()
    moveEnemy();
    updateScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();