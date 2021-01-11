
let camera, scene, renderer, stats, lastSpawn = -1, spawnRate = 6000, food = [],fish, controls,bool_controls=true,cam1,cam2,con1,con2,SPEED = 0,lock = true;
const clock = new THREE.Clock();
let fishaxisx = new THREE.Vector3(1,0,0);
let fishaxisy = new THREE.Vector3(0,1,0); 
let fishaxisz = new THREE.Vector3(0,0,1); 
let mixer;
let fishloc= new THREE.Vector3();
let fishlocafter= new THREE.Vector3();

init();
animate();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );



    scene = new THREE.Scene();
    scene.background = new THREE.Color( 'skyblue' );
    //scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 , 1 ); //0x444444
    hemiLight.position.set( 0, 5000, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff , 1);
    dirLight.position.set( 0, 5000, 100 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    scene.add( dirLight );

    scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // ground
    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 5000, 100, 0x000000, 0x000000 );
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    scene.add( grid );

    // model ikan
    const loader = new THREE.FBXLoader();
    const tLoader = new THREE.TextureLoader()
    loader.load( 'models/FBX_M/Ikan.fbx', function ( object ) {

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

        
        fish = object
        scene.add( fish );

    } );

    // model aquarium
    loader.load( 'models/FBX_M/Aquarium-opt.fbx', function ( object ) {

        object.traverse( function ( child ) {

            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        scene.add( object );
    } );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );
    
    setupControls();
    setControlsOrbit();


    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener('keydown', ditekan);
    // stats
    stats = new Stats();
    container.appendChild( stats.dom );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
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
    if (event.keyCode == 32) // Shift
    {
        SPEED = 30;
        ///fish.translateY(1);
    }
    if (event.keyCode == 17) // Control
    {
        SPEED = -10;
        //fish.translateY(-1);
    }

    if (event.keyCode ==  87) // W = 87
    {
        if(SPEED<10)
        SPEED += 0.5;
        // fish.translateZ(10);
    } 
    if (event.keyCode == 83) // S = 83
    {
        // fish.translateZ(-10);
        if(SPEED>-3)
        SPEED -= 0.3;
        
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
        // fish.rotation.x-=0.1;
        
        fish.rotateOnAxis (fishaxisx,-0.1);
    } 
    if (event.keyCode ==  40) // down
    {
        // fish.rotation.x+=0.1;
        fish.rotateOnAxis (fishaxisx,0.1);
    } 
    // if (event.keyCode ==  69) // E 
    // {
    //     fish.rotation.y-=1;
    // } 
    // if (event.keyCode ==  81) // Q
    // {
    //     fish.rotation.y+=1;
    // } 
  }d
function setupControls() {
    cam1 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
    
    // cam2 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 20000 );
    // con1 = new THREE.FirstPersonControls( cam2 , renderer.domElement);
    con1 = new THREE.OrbitControls( cam1 , renderer.domElement);
}
function setControlsFirstPerson() {
    // camera = cam1;
    controls = con1;
    camera.position.set( 0, 900, -190 );
    controls.target.set( 0, 800, 0 );
    // controls.lookkAt(0,800,0);
}
function setControlsOrbit() {
    camera = cam1;
    camera.position.set( 0, 900, -190 );
    controls = con1;
    // fish.getWorldPosition(200,800,0);
    controls.target.set( 0, 800, 0 );
}
function followfish(){
    var relativeCameraOffset = new THREE.Vector3(0,0,-250);
    var cameraOffset = fish.localToWorld (relativeCameraOffset);
    // camera.position.copy (cameraOffset);
    camera.position.lerp(cameraOffset, 0.2);
    camera.lookAt(fish.position);

}
function fishmovement(){
    fish.getWorldPosition(fishloc);
    fish.translateZ(SPEED);
    fish.getWorldPosition(fishlocafter);
    fishlocafter.sub(fishloc);
    camera.position.add(fishlocafter);
    camera.lookAt(fish.position);
}
function worldcollider(){
    fish.getWorldPosition(fishloc);
    if(fishloc.getComponent (0)>1550){
        fish.position.x-=SPEED+10;
    }
    if(fishloc.getComponent (0)<-1550){
        fish.position.x+=SPEED+10;
    }
    if(fishloc.getComponent (1)<350){
        fish.position.y+=SPEED+10;
    }
    if(fishloc.getComponent (2)>850)   {
        fish.position.z-=SPEED+10;
    }
    if(fishloc.getComponent (2)<-850){
        fish.position.z+=SPEED+10;
    }
    fish.getWorldPosition(fishlocafter);
    fishlocafter.sub(fishloc);
    camera.position.add(fishlocafter);
    camera.lookAt(fish.position);
}
function animate() {

    requestAnimationFrame( animate );

    fishmovement();
    if(lock){
        followfish();// camera
    }
    if(SPEED>0){
        SPEED -=0.02;
    }else if(SPEED<0){
        SPEED +=0.01;
    }

    worldcollider();


    // remove food
    if (food.length > 0){
        for (var i =0; i<food.length; i++){
            if (food[i].position.y > 0){
                food[i].position.y -= 1;
            }
            else {
                removeFood(food[i], i);
            }
        }
    }
    var time = Date.now();
    // see if its time to spawn food
    if(time>(lastSpawn + spawnRate)){
        lastSpawn=time;
        addFood();
    }

    const delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
    renderer.render( scene, camera );
    stats.update();
}

function addFood(){
    const loader = new THREE.FBXLoader();
    loader.load( 'models/FBX_M/Fish-Food.fbx', function ( object ) {

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

        scene.add(object);
        food[food.length] = object;
        food.splice
    } );
}

function removeFood(foods, idx){

    scene.remove(foods);
    food.splice(idx,1);
}
