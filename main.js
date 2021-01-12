
let camera, scene, renderer, stats, lastSpawn = -1, spawnRate = 6000, food = [],fish, controls,bool_controls=true,cam1,cam2,con1,con2,fishMovementSpeed = 0,lock = false;
const clock = new THREE.Clock();
let fishaxisx = new THREE.Vector3(1,0,0);
let fishaxisy = new THREE.Vector3(0,1,0); 
let fishaxisz = new THREE.Vector3(0,0,1); 
let mixer;
let fishloc= new THREE.Vector3();
let fishlocafter= new THREE.Vector3();
var keyPressed = false;

init();
animate();

function init() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 'white' );
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
    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), new THREE.MeshToonMaterial( { color: 0x999999, depthWrite: false } ) );
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
        //     map:  loader.load('/Texture/Pallete.png')
        // });
        // var matGlass = new THREE.MeshBasicMaterial({
        //     color: '#ffffff ',
        //  });
        //  let material = [matAquarium, matGlass];
        //  object.material = matGlass;
         var aquarium = object;
        scene.add( aquarium );
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
    document.addEventListener('keyup', dilepas);

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

function animate() {

    requestAnimationFrame( animate );

    fishmovement();
    if(lock){
        followfish();// camera
    }
    if(keyPressed == false && fishMovementSpeed > 0){
        console.log(keyPressed);
        fishMovementSpeed -= 0.1;
    }
    if(fishMovementSpeed < 0) fishMovementSpeed = 0;

    worldcollider();


    // remove food
    if (food.length > 0){
        for (var i =0; i<food.length; i++){
            if (Math.abs(food[i].position.x - fish.position.x) <= 30 && Math.abs(food[i].position.y - fish.position.y) <= 30 && Math.abs(food[i].position.z - fish.position.z) <= 30){
                removeFood(food[i], i);
            }
            else if (food[i].position.y > 370){
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