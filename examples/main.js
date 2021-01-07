
let camera, scene, renderer, stats, lastSpawn = -1, spawnRate = 6000, food = [];

const clock = new THREE.Clock();

let mixer;

init();
animate();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 100, 800, 300 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 'grey' );
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
        scene.add( object );

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

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 800, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );

    // stats
    stats = new Stats();
    container.appendChild( stats.dom );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );
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