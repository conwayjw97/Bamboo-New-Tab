import * as THREE from "three";

export default class SideboardUtils {
  static load(scene, sideboardMaterial){
    const geometry = new THREE.PlaneGeometry(300, 300);
    const plane = new THREE.Mesh(geometry, sideboardMaterial);
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
