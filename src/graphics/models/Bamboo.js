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
      opacity: 1.0,
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

          clone.position.x = THREE.MathUtils.randFloat(-self.xPositionRange, self.xPositionRange);
          clone.position.z = THREE.MathUtils.randFloat(-self.zPositionRange, self.zPositionRange);

          clone.rotation.y = (2 * Math.PI) * THREE.MathUtils.randFloat(0, 1);

          const scaleNum = THREE.MathUtils.randFloat(0.5, 1.25);
          clone.scale.x = scaleNum;
          clone.scale.y = scaleNum;
          clone.scale.z = scaleNum;

          scene.add(clone);
          self.trees.push(clone);
        }
        console.log(self.trees);
      }
    );
  }

  makeVisible(){
    this.material.opacity = 1.0;
    this.isFadingIn = false;
  }

  fadeIn(){
    if(this.material.opacity < 0.8){
      this.isFadingIn = true;
      this.material.opacity = 0.8;
    }
    else if(this.material.opacity < 1.0){
      this.material.opacity += 0.001;
    }
    else if(this.material.opacity > 1.0){
      this.isFadingIn = false;
      this.material.opacity = 1.0;
    }
  }

  swayAnimation(){
    if(this.trees !== []){
      const swayLimit = (Math.PI / 512) * 20;
      const swayStep = (Math.PI / 180);
      for(const tree of this.trees){
        const treeRotation = tree.rotation.y;
        const skinnedMesh = tree.children[1];
        const swayRotation = (Math.sin(this.swayAngle) * swayLimit);
        const xSwayRatio = Math.cos(treeRotation);
        const ySwayRatio = Math.sin(treeRotation);

        for(let i=0, bone=skinnedMesh.skeleton.bones[i]; i<skinnedMesh.skeleton.bones.length; i++){
          bone.rotation.y = Math.PI/2;
          // bone.rotation.z = Math.PI/2;

          // bone.rotation.x = swayRotation * xSwayRatio;
          // bone.rotation.y = swayRotation * ySwayRatio;
        }
      }
      this.swayAngle += swayStep;
    }
  }

  mouseOverAnimation(tree){
    const skinnedMesh = tree.children[1];
    // tree.parent.rotation.y+= (Math.PI / 30);
    // for(const bone of tree.skeleton.bones){
    //   bone.rotation.z += (Math.PI / 30);
    // }

    // this.animatedTrees.push(tree);
    // console.log(this.animatedTrees);

    // for ( let i = 0; i < mesh.skeleton.bones.length; i ++ ) {
    //   mesh.skeleton.bones[ i ].rotation.z = Math.sin( time ) * 2 / mesh.skeleton.bones.length;
    // }
  }
}
