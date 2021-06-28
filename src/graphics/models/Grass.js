import * as THREE from "three";

import grassDir from "../../resources/textures/grass/grass.jpg";

export default class Grass {
  constructor(textureLoader) {
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
  }

  load(scene){
    const geometry = new THREE.PlaneGeometry(300, 300);
    const plane = new THREE.Mesh(geometry, this.material);
    plane.rotation.x = Math.PI/2;
    scene.add(plane);
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