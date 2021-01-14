
let camera, scene, renderer, stats, timeIs, controls,bool_controls=true,cam1,cam2,con1,con2,lock = false, controlsFPS, MOVESPEED = 100, LOOKSPEED = 0.075;
let food = [], lastSpawn = -1, spawnRate = 6000; //food
let fish, fishTemp, fishAI1, fishAI2, fishAI3, fishAI4, lastMove = -1, moveRate = 1000, fishMovementSpeed = 0; //fish

//fish movement
const clock = new THREE.Clock();
let fishaxisx = new THREE.Vector3(1,0,0);
let fishaxisy = new THREE.Vector3(0,1,0); 
let fishaxisz = new THREE.Vector3(0,0,1); 
let fishloc= new THREE.Vector3();
let fishlocafter= new THREE.Vector3();
let vec = new THREE.Vector3();
var keyPressed = false;

init();
animate();

function init() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    setBackground();

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 , 0.5 ); //0x444444
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
    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), new THREE.MeshToonMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    //scene.add( mesh );

    const grid = new THREE.GridHelper( 5000, 100, 0x000000, 0x000000 );
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    //scene.add( grid );

    // model ikan
    loadingmodel();


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );
    
    setupControls();
    setControlsOrbit();
    //setControlsFirstPerson();


    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener('keydown', ditekan);
    document.addEventListener('keyup', dilepas);

    PlayMusicBackground();
    PlayAquariumBackground()

    // stats
    stats = new Stats();
    container.appendChild( stats.dom );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
  
function setupControls() {

    cam1 = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    
    // cam2 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 20000 );
    // con1 = new THREE.FirstPersonControls( cam2 , renderer.domElement);
    con1 = new THREE.OrbitControls( cam1 , renderer.domElement);
    controlsFPS = new THREE.FirstPersonControls(cam1, renderer.domElement); // Handles camera control
}

function setControlsFirstPerson() {
    // camera = cam1;
    /*controls = con1;
    camera.position.set( 0, 900, -190 );
    controls.target.set( 0, 800, 0 );*/
    // controls.lookkAt(0,800,0);

	controlsFPS.lookSpeed = LOOKSPEED;
    controlsFPS.movementSpeed = 20;
    controlsFPS.noFly = false;
    controlsFPS.lookVertical = true;
    controlsFPS.constrainVertical = true;
    controlsFPS.verticalMin = 1.0;
    controlsFPS.verticalMax = 2.0;
    controlsFPS.lon = -150;
    controlsFPS.lat = 120;
    
    camera = cam1;
}

function setControlsOrbit() {
    camera = cam1;
    camera.position.set( 0, 900, -190 );
    controls = con1;
    // fish.getWorldPosition(200,800,0);
    controls.target.set( 0, 800, 0 );
}

function animate() {

    requestAnimationFrame( animate );
    animateFish();

    fishmovement();
    if(lock){
        followfish();// camera
    }
    if(keyPressed == false && fishMovementSpeed > 0.2)
        fishMovementSpeed -= 0.05;
    
    if(fishMovementSpeed <= 0) 
        fishMovementSpeed = 0.2;

    timeIs = Date.now();

    moveAI();
    worldcollider();
    foodCheck();

    
    renderer.render( scene, camera );
    stats.update();
}

function PlayMusicBackground(){
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/Music/Music.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.3 );
        sound.play();
    });
};

function PlayAquariumBackground(){
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/Music/Aquarium background.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 1.0 );
        sound.play();
    });

};

function PlayEatSound(){
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/Music/Eat Audio.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.8 );
        sound.play();
    });
};