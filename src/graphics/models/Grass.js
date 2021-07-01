import * as THREE from "three";

import grassDir from "../../resources/textures/grass/grass.jpg";

export default class Grass {
  constructor(textureLoader, width, height) {
    const texture = textureLoader.load(grassDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    this.material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    this.width = width;
    this.width = height;
  }

  load(scene){
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    const plane = new THREE.Mesh(geometry, this.material);
    plane.rotation.x = Math.PI/2;
    scene.add(plane);
  }

  makeVisible(){
    this.material.opacity = 1.0;
  }

  fadeIn(){
    if(this.material.opacity < 1.0){
      this.material.opacity += 0.005;
    }
    else if(this.material.opacity > 1.0){
      this.material.opacity = 1.0;
    }
  }
}
