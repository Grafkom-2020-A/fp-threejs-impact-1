var mixer0, mixer1, mixer2,mixer3,mixer4;

function loadingmodel(){
    const loader = new THREE.FBXLoader();
    const tLoader = new THREE.TextureLoader();
    loader.load( '/FBX/Ikan.fbx', function ( object ) {
        mixer0 = new THREE.AnimationMixer( object );
        const action = mixer0.clipAction( object.animations[0] );
        action.play();

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

        } );
        object.position.y = 800;
        fish = object;
        scene.add( fish );

    } );

    loader.load( '/FBX/Ikan.fbx', function ( object ) {
        mixer1 = new THREE.AnimationMixer( object );
        const action = mixer1.clipAction( object.animations[0] );
        action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.position.y = 800;
        object.position.x = 500;
        fishAI1 = object;
        scene.add( fishAI1 );

    } );

    loader.load( '/FBX/Ikan.fbx', function ( object ) {
        mixer2 = new THREE.AnimationMixer( object );
        const action = mixer2.clipAction( object.animations[0] );
        action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.position.y = 400;
        object.position.x = -500;
        
        fishAI2 = object;
        scene.add( fishAI2 );

    } );

    loader.load( '/FBX/Ikan.fbx', function ( object ) {
        mixer3 = new THREE.AnimationMixer( object );
        const action = mixer3.clipAction( object.animations[0] );
        action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.position.y = 1200;
        object.position.x = -600;
        
        fishAI3 = object;
        scene.add( fishAI3 );

    } );

    loader.load( '/FBX/Ikan.fbx', function ( object ) {
        mixer4 = new THREE.AnimationMixer( object );
        const action = mixer4.clipAction( object.animations[0] );
        action.play();

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.position.y = 500;
        object.position.x = 1000;
        
        fishAI4 = object;
        scene.add( fishAI4 );
    } );

    // model aquarium
    loader.load( '/FBX/Aquarium-opt.fbx', function ( object ) {
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        const aquariumTexture = new THREE.TextureLoader().load('/FBX/Texture/Palette.png');
        const aquariumMaterial = new THREE.MeshToonMaterial({
            map: aquariumTexture,
        });

        const aquarium = object;
        scene.add( aquarium );
    } );

    loader.load( '/FBX/Glass.fbx', function ( object ) {
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                const glassMaterial = child.material;
                child.material = new THREE.MeshLambertMaterial();
                child.material.color.setRGB(255, 255, 255);
                child.material.transparent = true;
                child.material.opacity = 0.5;

            }
        } ); 

        
        object.traverse( function ( child ) {



  } );

        const glass = object;
        scene.add( glass );
    } );
}

function animateFish() {
    const delta = clock.getDelta();
    if ( mixer0 ) 
        mixer0.update( delta * (fishMovementSpeed+2)/4);
    if ( mixer1 ) 
        mixer1.update( delta * (fishMovementSpeed+2)/4);
    if ( mixer2 ) 
        mixer2.update( delta * (fishMovementSpeed+2)/4);
    if ( mixer3 ) 
        mixer3.update( delta * (fishMovementSpeed+2)/4);
    if ( mixer4 ) 
        mixer4.update( delta * (fishMovementSpeed+2)/4);
}
