function ditekan(event) {  
    //perpindahan AI
    if (event.keyCode == 49) // 1
    {
        fishTemp = fish;
        fish = fishAI1;
        fishAI1 = fishTemp;
    }

    if (event.keyCode == 50) // 2
    {
        fishTemp = fish;
        fish = fishAI2;
        fishAI2 = fishTemp;
    }

    if (event.keyCode == 51) // 3
    {
        fishTemp = fish;
        fish = fishAI3;
        fishAI3 = fishTemp;
    }

    if (event.keyCode == 52) // 4
    {
        fishTemp = fish;
        fish = fishAI4;
        fishAI4 = fishTemp;
    }

    if (event.keyCode == 70) // F
    {
        lock = !lock;
    }

    if (event.keyCode == 86) // v
    {
        bool_controls = !bool_controls;
        if(bool_controls){
            controlsFPS.enabled = false;
            controlsOrbit.enabled = true;
            controls = controlsOrbit;
            vec.x = 0;
            vec.y = 200;
            vec.z = -200;
            camera.position.add(vec);
            
            document.getElementById('Canvas').style.cursor = 'auto';
        }
        else{
            controlsOrbit.enabled = false;
            controlsFPS.enabled = true;
            controls = controlsFPS;
            document.getElementById('Canvas').style.cursor = 'none';
        }
    }
    if (event.keyCode == 16) // Shift
    {
        fishMovementSpeed = 4;
    }
    if (event.keyCode == 32) // Space
    {
        fishMovementSpeed = 0.1;
    }

    if (event.keyCode ==  87) // W = 87
    {
        keyPressed = true;
        if(fishMovementSpeed<4)
            fishMovementSpeed += 0.5;
    } 
    if (event.keyCode == 83) // S = 83
    {
        if(fishMovementSpeed>0)
            fishMovementSpeed -= 0.8;
    } 
    if (event.keyCode == 65) // A = 65
    {
        fish.rotateOnAxis (fishaxisy,0.11,0.2);
        if(fishMovementSpeed <= 1)
            fishMovementSpeed += 0.1;
    } 
    if (event.keyCode == 68) // D = 68
    {
        fish.rotateOnAxis (fishaxisy,-0.11,0.2);
        if(fishMovementSpeed <= 1)
            fishMovementSpeed += 0.1;
    } 

    if (event.keyCode == 39) // right
    {
        fish.rotateOnAxis (fishaxisz,0.1);
    } 
    if (event.keyCode == 37) // left
    {
        fish.rotateOnAxis (fishaxisz,-0.1);
    } 
    if (event.keyCode ==  38) // up 
    {
        fish.rotateOnAxis (fishaxisx,-0.1);
    } 
    if (event.keyCode ==  40) // down
    {
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
    camera.position.lerp(cameraOffset, 0.2);
    camera.lookAt(fish.position);
}

function fishmovement(){
    fish.getWorldPosition(fishloc);
    fish.translateZ(fishMovementSpeed); 
    fish.getWorldPosition(fishlocafter);
    fishlocafter.sub(fishloc);
    fish.getWorldPosition(vec); 
    camera.position.add(fishlocafter);
    camera.lookAt(fish.position);
    controls.target = vec;
}

function worldcollider(){
    //Collider Aquarium
    fish.getWorldPosition(fishloc);
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

    if(bool_controls){
        fish.getWorldPosition(fishlocafter);
        fishlocafter.sub(fishloc);
        fish.getWorldPosition(vec);

        camera.position.add(fishlocafter);
        camera.lookAt(fish.position);
        controls.target = vec;

    }else{
        camera.getWorldPosition(fishloc);
        fish.position.set(fishloc.getComponent (0),fishloc.getComponent (1),fishloc.getComponent (2));
        camera.getWorldDirection(vec);
        console.log(vec);
        vec.add(fishloc);
        fish.lookAt(vec);
        fish.translateZ(-30);
        controls.update( clock.getDelta() );
    }
    
    
    if(lock || !bool_controls ){
        if (camera.position.x > 1500) camera.position.x = 1500;
        if (camera.position.x < -1500) camera.position.x = -1500;
        if (camera.position.y > 1450) camera.position.y = 1450;
        if (camera.position.y < 370) camera.position.y = 370;
        if (camera.position.z > 850) camera.position.z = 850;
        if (camera.position.z < -850) camera.position.z = -850;
    }
}
