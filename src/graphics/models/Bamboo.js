import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import modelDir from "../../resources/models/bamboo/Bamboo.FBX";
import diffuseDir from "../../resources/models/bamboo/diffuse.jpg";
import specularDir from "../../resources/models/bamboo/specular.jpg";
import normalDir from "../../resources/models/bamboo/normal.jpg";
import alphaDir from "../../resources/models/bamboo/alpha.jpg";

export default class Bamboo {
  constructor() {
		new FBXLoader().load(modelDir, this.onModelLoad);
  }

  onModelLoad(model){
    const diffuse = new THREE.TextureLoader().load(diffuseDir);
    const specular = new THREE.TextureLoader().load(specularDir);
    const normal = new THREE.TextureLoader().load(normalDir);
    const alpha = new THREE.TextureLoader().load(alphaDir);

    model.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
              child.material.map = diffuse;
              child.material.specularMap = specular;
              child.material.normalMap = normal;
              child.material.alphaMap = alpha;
              child.material.alphaTest = 0.8;
              child.material.side = THREE.DoubleSide;
          }
      });

    this.setModel(model);
  }

  setModel(model){
    this.model = model;;
  }

  getModel(){
    return this.model;
  }
}
