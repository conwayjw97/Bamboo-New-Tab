import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";

import modelDir from "../../resources/models/bamboo/BambooWithBones.fbx";

import diffuseDir from "../../resources/textures/bamboo/diffuse.jpg";
import alphaDir from "../../resources/textures/bamboo/alpha.jpg";

export default class Bamboo {
  constructor(textureLoader, treeCount, width, height) {
    this.material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(diffuseDir),
      alphaMap: textureLoader.load(alphaDir),
      alphaTest: 0.5,
      side:THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    this.treeCount = treeCount;
    this.xPositionRange = width/2;
    this.zPositionRange = height/2;
    this.swayAngle = 0;
    this.trees = [];
    this.animatedTrees = [];
    this.isFadingIn = false;
  }

  load(scene){
    const self = this;
    new FBXLoader().load(
      modelDir,
      function(object) {
        object.traverse(function (child) {
          if (child instanceof THREE.SkinnedMesh) {
            child.material = self.material;
          }
        });

        for (let i = 0; i < self.treeCount; i++) {
          const clone = SkeletonUtils.clone(object);
          const cloneGeometry = clone.children[1].geometry.clone();

          clone.position.x = THREE.MathUtils.randFloat(-self.xPositionRange, self.xPositionRange);
          clone.position.z = THREE.MathUtils.randFloat(-self.zPositionRange, self.zPositionRange);

          const scaleNum = THREE.MathUtils.randFloat(0.5, 1.25);
          clone.scale.x = scaleNum;
          clone.scale.y = scaleNum;
          clone.scale.z = scaleNum;

          // Only the geometry is rotated to not change the bone axes
          cloneGeometry.rotateZ((2 * Math.PI) * THREE.MathUtils.randFloat(0, 1));
          clone.children[1].geometry = cloneGeometry;

          scene.add(clone);
          self.trees.push(clone);
        }
      }
    );
  }

  makeVisible(){
    this.material.opacity = 1.0;
    this.isFadingIn = false;
  }

  fadeIn(){
    if(this.material.opacity < 0.5){
      this.isFadingIn = true;
      this.material.opacity = 0.5;
    }
    else if(this.material.opacity < 1.0){
      this.material.opacity += 0.005;
    }
    else if(this.material.opacity > 1.0){
      this.isFadingIn = false;
      this.material.opacity = 1.0;
    }
  }

  swayAnimation(){
    if(this.trees !== []){
      const swayLimit = (Math.PI / 8192);
      const swayStep = (Math.PI / 360);
      const swayRotation = (Math.cos(this.swayAngle) * swayLimit);
      for(const tree of this.trees){
        const skinnedMesh = tree.children[1];
        for(let i=0; i<skinnedMesh.skeleton.bones.length; i++){
          const bone = skinnedMesh.skeleton.bones[i];
          bone.rotation.z += (swayRotation);
        }
      }
      this.swayAngle += swayStep;
    }
  }

  mouseOverAnimation(tree){
    console.log(tree);
  }
}
