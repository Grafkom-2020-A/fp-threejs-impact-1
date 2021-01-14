function addFood(){
    const loader = new THREE.FBXLoader();
    loader.load( '/FBX/Fish-Food.fbx', function ( object ) {

        object.traverse( function (child) {
            if(child.isMesh){
                child.material.map = null;
                child.castShadow = true;
                child.receiveShadow = false;
                child.material = new THREE.MeshToonMaterial({color : '#ffa842'});
                
            }
        } );

        object.position.x = (Math.random() * 1400) + (Math.random() * -1400);  ;  
        object.position.y = 1500;
        object.position.z = (Math.random() * 800) + (Math.random() * -800);
        object.scale.set(1.2, 1.2, 1.2);
        
        scene.add(object);
        food[food.length] = object;
    } );
}

function removeFood(foods, idx){
    scene.remove(foods);
    food.splice(idx,1);
}

function foodCheck(){
    // remove food
    if (food.length > 0){
        for (var i =0; i<food.length; i++){
            if (Math.abs(food[i].position.x - fish.position.x) <= 30 && Math.abs(food[i].position.y - fish.position.y) <= 30 && Math.abs(food[i].position.z - fish.position.z) <= 30){
                //Fish Eat Food
                removeFood(food[i], i);
                PlayEatSound();
            }
            else if (food[i].position.y > 370){
                food[i].position.y -= 1;
            }
            else {
                removeFood(food[i], i);
            }
        }
    }
    // see if its time to spawn food
    if(timeIs > (lastSpawn + spawnRate)){
        lastSpawn = timeIs;
        addFood();
    }
}