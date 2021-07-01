import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";

import modelDir from "../../resources/models/bamboo/BambooWithBones.fbx";

import diffuseDir from "../../resources/textures/bamboo/diffuse.jpg";
import specularDir from "../../resources/textures/bamboo/specular.jpg";
import normalDir from "../../resources/textures/bamboo/normal.jpg";
import alphaDir from "../../resources/textures/bamboo/alpha.jpg";

export default class Bamboo {
  constructor(textureLoader, treeCount, width, height) {
    this.material = new THREE.MeshPhongMaterial({
      map: textureLoader.load(diffuseDir),
      specularMap: textureLoader.load(specularDir),
      normalMap: textureLoader.load(normalDir),
      alphaMap: textureLoader.load(alphaDir),
      alphaTest: 0.8,
      side:THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    this.treeCount = treeCount;
    this.xPositionRange = width/2;
    this.zPositionRange = height/2;

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

          clone.rotation.y = Math.PI * THREE.MathUtils.randFloat(0, 1);

          const scaleNum = THREE.MathUtils.randFloat(0.5, 1.25);
          clone.scale.x = scaleNum;
          clone.scale.y = scaleNum;
          clone.scale.z = scaleNum;

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

  animateTree(tree){
    for(const bone of tree.skeleton.bones){
      bone.rotation.x += (Math.PI / 256);
    }

    // this.animatedTrees.push(tree);
    // console.log(this.animatedTrees);

    // for ( let i = 0; i < mesh.skeleton.bones.length; i ++ ) {
    //   mesh.skeleton.bones[ i ].rotation.z = Math.sin( time ) * 2 / mesh.skeleton.bones.length;
    // }
  }

  getTrees(){
    return this.trees;
  }
}
