function setBackground(){
    var date = new Date();
    var time = date.getHours();
    if (time >= 5 && time < 11){
        scene.background = new THREE.Color( '#91afcb' );
    }
    if (time >= 11 && time < 15){
        scene.background = new THREE.Color( '#f9d476' );
    }
    if (time >=15 && time < 19){
        scene.background = new THREE.Color( '#feba9a' );
    }
    if (time >= 19 || time < 5){
        scene.background = new THREE.Color( '#280f36' );
    }
}