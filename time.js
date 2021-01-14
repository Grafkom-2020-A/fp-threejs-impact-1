function setBackground(){
    var date = new Date();
    var time = date.getHours();

    //Pagi
    if (time >= 5 && time < 11){
        scene.background = new THREE.Color( '#adfaff' );
    }

    //Siang
    if (time >= 11 && time < 15){
        scene.background = new THREE.Color( '#fffdad' );
    }

    //Sore
    if (time >=15 && time < 19){
        scene.background = new THREE.Color( '#ffd8ad' );
    }

    //Malam
    if (time >= 19 || time < 5){
        scene.background = new THREE.Color( '#add7ff' );
    }
}