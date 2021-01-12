function ditekan(event) {  
    if (event.keyCode == 70) // F
    {
        lock = !lock;
        // camera.add(fishloc);
        // fish.lookAt(camera.position);
        // bool_controls = !bool_controls;
        // if(bool_controls){
        //     setControlsOrbit();
        // }else{
        //     setControlsFirstPerson();
        // }
    }
    if (event.keyCode == 16) // Shift
    {
        fishMovementSpeed = 15;
        ///fish.translateY(1);
    }
    if (event.keyCode == 32) // Space
    {
        fishMovementSpeed = 0.1;
        //fish.translateY(-1);
    }

    if (event.keyCode ==  87) // W = 87
    {
        keyPressed = true;
        if(fishMovementSpeed<9)
            fishMovementSpeed += 1.5;
        // fish.translateZ(10);
    } 
    if (event.keyCode == 83) // S = 83
    {
        //fish.translateZ(-10);
        if(fishMovementSpeed>0)
            fishMovementSpeed -= 0.6;
    } 
    if (event.keyCode == 65) // A = 65
    {
        
        // fish.rotation.y+=0.31;
        fish.rotateOnAxis (fishaxisy,0.11,0.2);
        // fish.rotation.y+=0.31;
    } 
    if (event.keyCode == 68) // D = 68
    {
        // fish.rotation.y-=0.31;
        fish.rotateOnAxis (fishaxisy,-0.11,0.2);
        // fish.rotation.y-=0.31;
    } 

    if (event.keyCode == 39) // right
    {
        // fish.rotation.z-=0.1;
        fish.rotateOnAxis (fishaxisz,0.1);
    } 
    if (event.keyCode == 37) // left
    {
        // fish.rotation.z+=0.1;
        fish.rotateOnAxis (fishaxisz,-0.1);
    } 
    if (event.keyCode ==  38) // up 
    {
        //fish.rotation.x-=0.1;
        fish.rotateOnAxis (fishaxisx,-0.1);
    } 
    if (event.keyCode ==  40) // down
    {
        // fish.rotation.x+=0.1;
        fish.rotateOnAxis (fishaxisx,0.1);
    } 
}

function dilepas(event){
    if (event.keyCode ==  87) // W = 87
    {
        keyPressed = false;
    } 
}

function followfish(){
    var relativeCameraOffset = new THREE.Vector3(0,100,-250);
    var cameraOffset = fish.localToWorld (relativeCameraOffset);
    // camera.position.copy (cameraOffset);
    camera.position.lerp(cameraOffset, 0.2);
    if (camera.position.x > 1500) camera.position.x = 1500;
    if (camera.position.x < -1500) camera.position.x = -1500;
    if (camera.position.y > 1450) camera.position.y = 1450;
    if (camera.position.y < 370) camera.position.y = 370;
    if (camera.position.z > 850) camera.position.z = 850;
    if (camera.position.z < -850) camera.position.z = -850;
    
    camera.lookAt(fish.position);
}

function fishmovement(){
    fish.getWorldPosition(fishloc);
    fish.translateZ(fishMovementSpeed);
    fish.getWorldPosition(fishlocafter);
    fishlocafter.sub(fishloc);
    camera.position.add(fishlocafter);
    camera.lookAt(fish.position);
}

function worldcollider(){
    fish.getWorldPosition(fishloc);

    // if(fish.position.y <= 300)
    //     fish.position.y = 300;

    //Collider Aquarium
    if(fishloc.getComponent (0)>1500){
        fishMovementSpeed = 0;
        fish.position.x-=fishMovementSpeed+10;
    }
    if(fishloc.getComponent (0)<-1500){
        fishMovementSpeed = 0;
        fish.position.x+=fishMovementSpeed+10;
    }
    if(fishloc.getComponent (1)> 1450){
        fishMovementSpeed = 0;
        fish.position.y-=fishMovementSpeed+10;
    }
    if(fishloc.getComponent (1)< 370){
        fishMovementSpeed = 0;
        fish.position.y+=fishMovementSpeed+10;
    }
    if(fishloc.getComponent (2)>830)   {
        fishMovementSpeed = 0;
        fish.position.z-=fishMovementSpeed+10;
    }
    if(fishloc.getComponent (2)<-850){
        fishMovementSpeed = 0;
        fish.position.z+=fishMovementSpeed+10;
    }
    fish.getWorldPosition(fishlocafter);
    fishlocafter.sub(fishloc);
    camera.position.add(fishlocafter);
    camera.lookAt(fish.position);
}