import * as THREE from "three";

export default class Sideboard {
  constructor(textureLoader, width, height){
    const texture = textureLoader.load(process.env.PUBLIC_URL + "/textures/wood/wood.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(7, 1);
    this.material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    this.width = width;
    this.height = height;
    this.relativeXPos = width/2 + 2.5;
    this.relativeZPos = height/2 + 2.5;
  }

  load(scene){
    const topBoard = new THREE.Mesh(new THREE.BoxGeometry(this.width, 20, 5), this.material);
    topBoard.position.z = -this.relativeZPos;
    topBoard.position.y = 10;
    scene.add(topBoard);

    const botBoard = topBoard.clone();
    botBoard.position.z = this.relativeZPos;
    botBoard.position.y = 10;
    scene.add(botBoard);

    const rightBoard = new THREE.Mesh(new THREE.BoxGeometry(this.height + 10, 20, 5), this.material);
    rightBoard.rotation.y = Math.PI/2;
    rightBoard.position.x = this.relativeXPos;
    rightBoard.position.z = 0;
    rightBoard.position.y = 10;
    scene.add(rightBoard);

    const leftBoard = rightBoard.clone();
    leftBoard.position.x = -this.relativeXPos;
    scene.add(leftBoard);
  }

  makeVisible(){
    this.material.opacity = 1.0;
  }

  fadeIn(){
    if(this.material.opacity < 1.0){
      this.material.opacity += 0.01;
    }
    else if(this.material.opacity > 1.0){
      this.material.opacity = 1.0;
    }
  }
}
