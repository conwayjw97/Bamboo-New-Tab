import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import modelDir from "../../resources/models/bamboo/Bamboo.FBX";

import diffuseDir from "../../resources/textures/bamboo/diffuse.jpg";
import specularDir from "../../resources/textures/bamboo/specular.jpg";
import normalDir from "../../resources/textures/bamboo/normal.jpg";
import alphaDir from "../../resources/textures/bamboo/alpha.jpg";

export default class Bamboo {
  constructor() {
    const textureLoader = new THREE.TextureLoader();
    this.bambooMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(diffuseDir),
      specularMap: textureLoader.load(specularDir),
      normalMap: textureLoader.load(normalDir),
      alphaMap: textureLoader.load(alphaDir),
      alphaTest: 0.8,
      side:THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    this.group = new THREE.Group();
  }

  load(){
    const loader = new FBXLoader();
    const self = this;
    loader.load(modelDir, function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = self.bambooMaterial;
        }
      });

      self.onLoad(object);
    });
  }

  onLoad(object){
    for(let i=0; i<250; i++){
      const clone = object.children[0].clone();
      clone.position.x = this.randomNum(-150, 150);
      clone.position.z = this.randomNum(-150, 150);

      clone.rotation.z = Math.PI * this.randomNum(0, 1);

      const scaleNum = this.randomNum(0.5, 1.25);
      clone.scale.x = scaleNum;
      clone.scale.y = scaleNum;
      clone.scale.z = scaleNum;

      this.group.add(clone);
    }
  }

  fadeIn(){
    /*
    The bamboo material has to be set to 0.8 opacity initially. This is because
    if the material has an alphaTest value, it will remain transparent until
    opacity >= alphaTest, so the bamboo material needs a head start when fading
    in. I didn't set the other textures to alphaTest 0.8 so they can all just
    fade in together, and this is because doing so breaks the opacity of
    materials without alphaMaps.
    */
    if(this.bambooMaterial.opacity < 0.8){
      this.bambooMaterial.opacity = 0.8;
    }
    if(this.bambooMaterial.opacity < 1.0){
      this.bambooMaterial.opacity += 0.001;
    }
    else if(this.bambooMaterial.opacity > 1.0){
      this.bambooMaterial.opacity = 1.0;
    }
  }

  randomNum(min, max){
    return (Math.random() * (max - min) + min).toFixed(4);
  }

  getGroup(){
    return this.group;
  }
}
