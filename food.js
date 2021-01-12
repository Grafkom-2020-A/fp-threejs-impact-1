function addFood(){
    const loader = new THREE.FBXLoader();
    loader.load( '/FBX/Fish-Food.fbx', function ( object ) {

        object.traverse( function (child) {
            if(child.isMesh){
                child.material.map = null;
                child.castShadow = true;
                child.receiveShadow = false;
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
