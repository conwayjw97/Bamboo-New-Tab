import * as THREE from "three";

import grassDir from "../../resources/textures/grass/grass.jpg";

export default class GrassUtils {
  static createMaterial(textureLoader){
    const texture = textureLoader.load(grassDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });
  }

  static loadMesh(scene, material){
    const geometry = new THREE.PlaneGeometry(300, 300);
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI/2;
    scene.add(plane);
  }

  static fadeInMaterial(material){
    if(material.opacity < 1.0){
      material.opacity += 0.005;
    }
    else if(material.opacity > 1.0){
      material.opacity = 1.0;
    }
  }
}
