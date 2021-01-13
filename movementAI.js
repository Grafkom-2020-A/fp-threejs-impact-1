function moveAI(){
    if(time>(lastMove + moveRate)){
        lastMove=time;
        let move1 = false, move2 = false, move3 = false, move4 = false;
        let randX1 = Math.random();
        let randY1 = Math.random();
        let randX2 = Math.random();
        let randY2 = Math.random();
        let randX3 = Math.random();
        let randY3 = Math.random();
        let randX4 = Math.random();
        let randY4 = Math.random();
        moveAIsub(randX1,randY1,move1,fishAI1);
        moveAIsub(randX2,randY2,move2,fishAI2);
        moveAIsub(randX3,randY3,move3,fishAI3);
        moveAIsub(randX4,randY4,move4,fishAI4);
    }
    moveAIworldcolider(fishAI1);
    moveAIworldcolider(fishAI2);
    moveAIworldcolider(fishAI3);
    moveAIworldcolider(fishAI4);
}
function moveAIsub(randX,randY,move,fishAI){
    if(randX <= 0.25 && move == false) {
        fishAI.rotateOnAxis (fishaxisy,0.11,0.2); //kiri
        move = true;
    }
    else if (randX > 0.25 && randX <= 0.5 && move == false) {
        fishAI.rotateOnAxis (fishaxisy,0.-11,0.2); //kanan
        move = true;
    }
    if(randY <= 0.25 && move == false){
        fishAI.rotateOnAxis (fishaxisx,-0.1); // atas
        move = true;
    }
    else if (randY > 0.25 && randY <= 0.5 && move == false) {
        fishAI.rotateOnAxis (fishaxisx,0.1); //bawah
        move = true;
    }
    
}
function moveAIworldcolider(fishAI){
    if (fishAI.position.z < 850 && fishAI.position.z > -850 && fishAI.position.y < 1450 && fishAI.position.y > 370 && fishAI.position.x < 1500 && fishAI.position.x > -1500) {
        fishAI.translateZ(4);
    }
    else{
        fishAI.translateZ(-5);
        fishAI.rotateOnAxis (fishaxisy,0.11,0.2);
    }
}
