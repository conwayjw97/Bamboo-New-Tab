import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";

export default class Bamboo {
  constructor(textureLoader, treeCount, width, height) {
    const diffuse = process.env.PUBLIC_URL + "/textures/bamboo/diffuse.jpg";
    const alpha = process.env.PUBLIC_URL + "/textures/bamboo/alpha.jpg";

    this.material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(diffuse),
      alphaMap: textureLoader.load(alpha),
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
      process.env.PUBLIC_URL + "/models/bamboo/BambooWithBones.fbx",
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
    /*
    The bamboo material has to be set to 0.5 opacity initially. This is because
    if the material has an alphaTest value, it will remain transparent until
    opacity >= alphaTest, so the bamboo material needs a head start when fading
    in. I didn't set the other textures to alphaTest 0.5 so they can all just
    fade in together, and this is because doing so breaks the opacity of
    materials without alphaMaps.
    */
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
      const swayStep = (Math.PI / 180);
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
