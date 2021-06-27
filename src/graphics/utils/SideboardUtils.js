import * as THREE from "three";

import woodDir from "../../resources/textures/wood/wood.jpg";

export default class SideboardUtils {
  static createMaterial(textureLoader){
    const texture = textureLoader.load(woodDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(7, 1);
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });
  }

  static loadMesh(scene, material){
    const topBoard = new THREE.Mesh(new THREE.BoxGeometry(300, 20, 5), material);
    topBoard.position.z = -152.5;
    topBoard.position.y = 10;
    scene.add(topBoard);

    const botBoard = topBoard.clone();
    botBoard.position.z = 152.5;
    botBoard.position.y = 10;
    scene.add(botBoard);

    const rightBoard = new THREE.Mesh(new THREE.BoxGeometry(310, 20, 5), material);
    rightBoard.rotation.y = Math.PI/2;
    rightBoard.position.x = 152.5;
    rightBoard.position.z = 0;
    rightBoard.position.y = 10;
    scene.add(rightBoard);

    const leftBoard = rightBoard.clone();
    leftBoard.position.x = -152.5;
    scene.add(leftBoard);
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
