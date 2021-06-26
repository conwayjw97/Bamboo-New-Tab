import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";

import modelDir from "../../resources/models/bamboo/BambooWithBones.fbx";

export default class BambooUtils {
  static load(scene, bambooMaterial){
    new FBXLoader().load(
      modelDir,
      function(object) {
        object.traverse(function (child) {
          if (child instanceof THREE.SkinnedMesh) {
            child.material = bambooMaterial;
          }
        });

        for (let i = 0; i < 250; i++) {
          const clone = SkeletonUtils.clone(object);

          clone.position.x = THREE.MathUtils.randFloat(-150, 150);
          clone.position.z = THREE.MathUtils.randFloat(-150, 150);

          clone.rotation.y = Math.PI * THREE.MathUtils.randFloat(0, 1);

          const scaleNum = THREE.MathUtils.randFloat(0.5, 1.25);
          clone.scale.x = scaleNum;
          clone.scale.y = scaleNum;
          clone.scale.z = scaleNum;

          scene.add(clone);
        }
      }
    );
  }

  static fadeInMaterial(material){
    if(material.opacity < 0.8){
      material.opacity = 0.8;
    }
    if(material.opacity < 1.0){
      material.opacity += 0.001;
    }
    else if(material.opacity > 1.0){
      material.opacity = 1.0;
    }
  }
}
