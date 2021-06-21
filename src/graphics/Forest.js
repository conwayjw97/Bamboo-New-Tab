/*
To-Do:
  - Loading state?
  - Wood texture
  - New models

Links of interest:
https://threejs.org/examples/webgl_water_flowmap.html
*/

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import model from "../resources/models/bamboo/Bamboo.FBX";
import diffuseDir from "../resources/models/bamboo/diffuse.jpg";
import specularDir from "../resources/models/bamboo/specular.jpg";
import normalDir from "../resources/models/bamboo/normal.jpg";
import alphaDir from "../resources/models/bamboo/alpha.jpg";

import pebblesDir from "../resources/textures/pebbles.jpg";
import pebblesNormalDir from "../resources/textures/pebbles_normal.jpg";

import grassDir from "../resources/textures/grass.jpg";

import woodDir from "../resources/textures/wood.jpg";

export default class Forest {
  constructor(canvas) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
    this.camera.position.set(0, 250, 500);

    this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("rgb(40, 44, 52)");

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 110, 0);

    this.scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();

    // Plane material
    let texture = textureLoader.load(grassDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    this.planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    // Sideboard material
    texture = textureLoader.load(woodDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(7, 1);
    this.sideBoardMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    // Bamboo material
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

    const animate = () => {
      this.fadeInMaterials();
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(animate);
    }

    animate();
  }

  fadeInMaterials(){
    /*
    You may be wondering why the bamboo material has to be set to 0.8 opacity
    initially. This is because if the material has an alphaTest value, it will
    remain transparent until opacity >= alphaTest, so the bamboo material needs
    a head start when fading in.
    You may also be wondering why I didn't set the other textures to alphaTest 0.8
    so they can all just fade in together, and this is because doing so breaks
    the opacity of materials without alphaMaps.
    */
    if(this.bambooMaterial.opacity < 0.8){
      this.bambooMaterial.opacity = 0.8;
    }
    if(this.planeMaterial.opacity < 1.0){
      this.planeMaterial.opacity += 0.005;
      this.sideBoardMaterial.opacity += 0.005;
      this.bambooMaterial.opacity += 0.001;
    }
    else if(this.planeMaterial.opacity > 1.0){
      this.planeMaterial.opacity = 1.0;
      this.sideBoardMaterial.opacity = 1.0;
      this.bambooMaterial.opacity = 1.0;
    }
  }

  render() {
    this.addFog();
    this.addLighting();
    this.addPlane();
    this.addSides();
    this.addBamboo();
  }

  addFog(){
    const near = 1;
    const far = 900;
    const color = 'white';
    this.scene.fog = new THREE.Fog(color, near, far);
    this.scene.background = new THREE.Color(color);
  }

  addLighting(){
    this.scene.add(new THREE.AmbientLight(0x333333, 15));
  }

  addPlane(){
    const geometry = new THREE.PlaneGeometry(300, 300);
    const plane = new THREE.Mesh(geometry, this.planeMaterial);
    plane.rotation.x = Math.PI/2;
    this.scene.add(plane);
  }

  addSides(){
    const topBoard = new THREE.Mesh(new THREE.BoxGeometry(300, 20, 5), this.sideBoardMaterial);
    topBoard.position.z = -152.5;
    topBoard.position.y = 10;
    this.scene.add(topBoard);

    const botBoard = topBoard.clone();
    botBoard.position.z = 152.5;
    botBoard.position.y = 10;
    this.scene.add(botBoard);

    const rightBoard = new THREE.Mesh(new THREE.BoxGeometry(310, 20, 5), this.sideBoardMaterial);
    rightBoard.rotation.y = Math.PI/2;
    rightBoard.position.x = 152.5;
    rightBoard.position.z = 0;
    rightBoard.position.y = 10;
    this.scene.add(rightBoard);

    const leftBoard = rightBoard.clone();
    leftBoard.position.x = -152.5;
    this.scene.add(leftBoard);
  }

  addBamboo(){
    const randomNum = (min, max) => {
      return (Math.random() * (max - min) + min).toFixed(4);
    }

    const onLoad = object => {
      for(let i=0; i<250; i++){
        const clone = object.children[0].clone();
        clone.position.x = randomNum(-150, 150);
        clone.position.z = randomNum(-150, 150);

        clone.rotation.z = Math.PI * randomNum(0, 1);

        const scaleNum = randomNum(0.5, 1.25);
        clone.scale.x = scaleNum;
        clone.scale.y = scaleNum;
        clone.scale.z = scaleNum;

        this.scene.add(clone);
      }
    }

    const loader = new FBXLoader();
    const self = this;
    loader.load(model, function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = self.bambooMaterial;
        }
      });

      onLoad(object);
    });
  }
}
