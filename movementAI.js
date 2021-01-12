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

        //movement AI1
        if(randX1 <= 0.25 && move1 == false) {
            fishAI1.rotateOnAxis (fishaxisy,0.11,0.2); //kiri
            move1 = true;
        }
        else if (randX1 > 0.25 && randX1 <= 0.5 && move1 == false) {
            fishAI1.rotateOnAxis (fishaxisy,0.-11,0.2); //kanan
            move1 = true;
        }
        if(randY1 <= 0.25 && move1 == false){
            fishAI1.rotateOnAxis (fishaxisx,-0.1); // atas
            move1 = true;
        }
        else if (randY1 > 0.25 && randY1 <= 0.5 && move1 == false) {
            fishAI1.rotateOnAxis (fishaxisx,0.1); //bawah
            move1 = true;
        }

        //movement AI2
        if(randX2 <= 0.25 && move2 == false) {
            fishAI2.rotateOnAxis (fishaxisy,0.11,0.2); //kiri
            move2 = true;
        }
        else if (randX2 > 0.25 && randX2 <= 0.5 && move2 == false) {
            fishAI2.rotateOnAxis (fishaxisy,0.-11,0.2); //kanan
            move2 = true;
        }
        if(randY2 <= 0.25 && move2 == false){
            fishAI2.rotateOnAxis (fishaxisx,-0.1); // atas
            move2 = true;
        }
        else if (randY2 > 0.25 && randY2 <= 0.5 && move2 == false) {
            fishAI2.rotateOnAxis (fishaxisx,0.1); //bawah
            move2 = true;
        }

        //movement AI3
        if(randX3 <= 0.25 && move3 == false) {
            fishAI3.rotateOnAxis (fishaxisy,0.11,0.2); //kiri
            move3 = true;
        }
        else if (randX3 > 0.25 && randX3 <= 0.5 && move3 == false) {
            fishAI3.rotateOnAxis (fishaxisy,0.-11,0.2); //kanan
            move3 = true;
        }
        if(randY3 <= 0.25 && move3 == false){
            fishAI3.rotateOnAxis (fishaxisx,-0.1); // atas
            move3 = true;
        }
        else if (randY3 > 0.25 && randY3 <= 0.5 && move3 == false) {
            fishAI3.rotateOnAxis (fishaxisx,0.1); //bawah
            move3 = true;
        }

        //movement AI4
        if(randX4 <= 0.25 && move4 == false) {
            fishAI4.rotateOnAxis (fishaxisy,0.11,0.2); //kiri
            move4 = true;
        }
        else if (randX4 > 0.25 && randX4 <= 0.5 && move4 == false) {
            fishAI4.rotateOnAxis (fishaxisy,0.-11,0.2); //kanan
            move4 = true;
        }
        if(randY4 <= 0.25 && move4 == false){
            fishAI4.rotateOnAxis (fishaxisx,-0.1); // atas
            move4 = true;
        }
        else if (randY4 > 0.25 && randY4 <= 0.5 && move4 == false) {
            fishAI4.rotateOnAxis (fishaxisx,0.1); //bawah
            move4 = true;
        }

    }
    
    if (fishAI1.position.z < 850 && fishAI1.position.z > -850 && fishAI1.position.y < 1450 && fishAI1.position.y > 370 && fishAI1.position.x < 1500 && fishAI1.position.x > -1500) {
        fishAI1.translateZ(4);
    }
    else{
        fishAI1.translateZ(-5);
        fishAI1.rotateOnAxis (fishaxisy,0.11,0.2);
    }
    if (fishAI2.position.z < 850 && fishAI2.position.z > -850 && fishAI2.position.y < 1450 && fishAI2.position.y > 370 && fishAI2.position.x < 1500 && fishAI2.position.x > -1500) {
        fishAI2.translateZ(4);
    }
    else{
        fishAI2.translateZ(-5);
        fishAI2.rotateOnAxis (fishaxisy,0.11,0.2);
    }
    if (fishAI3.position.z < 850 && fishAI3.position.z > -850 && fishAI3.position.y < 1450 && fishAI3.position.y > 370 && fishAI3.position.x < 1500 && fishAI3.position.x > -1500) {
        fishAI3.translateZ(4);
    }
    else{
        fishAI3.translateZ(-5);
        fishAI3.rotateOnAxis (fishaxisy,0.11,0.2);
    }
    if (fishAI4.position.z < 850 && fishAI4.position.z > -850 && fishAI4.position.y < 1450 && fishAI4.position.y > 370 && fishAI4.position.x < 1500 && fishAI4.position.x > -1500) {
        fishAI4.translateZ(4);
    }
    else{
        fishAI4.translateZ(-5);
        fishAI4.rotateOnAxis (fishaxisy,0.11,0.2);
    }
}