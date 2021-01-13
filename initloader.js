function loadingmodel(){
    
    const loader = new THREE.FBXLoader();
    const tLoader = new THREE.TextureLoader();
    loader.load( '/FBX/Ikan.fbx', function ( object ) {

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[0] );
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

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[0] );
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

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[0] );
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

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[0] );
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

        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[0] );
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

        tLoader.load('/Texture/Pallete.png', function(texture){
            object.traverse( function ( child ) {
                if ( child.isMesh ){
                    child.material.map = texture;
                }
            } );
        });

        // var matAquarium = new THREE.MeshToonMaterial({
        //     map:  tLoader.load('/examples/Texture/Pallete.png')
        // });
        // var matGlass = new THREE.MeshBasicMaterial({
        //     color: '#ffffff ',
        //  });
        //  let material = [matAquarium, matGlass];
        //  object.material = matGlass;
         var aquarium = object;
        scene.add( aquarium );
    } );
}