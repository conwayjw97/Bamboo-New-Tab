/*
To-Do:
  - Loading state?
  - Wood texture
  - New models
  - Check when all models loaded
  - Fix bamboo alphaMap for a smooth fade-in

Links of interest:
https://threejs.org/examples/webgl_water_flowmap.html
*/

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";

import BambooUtils from "./utils/BambooUtils.js";
import GrassUtils from "./utils/GrassUtils.js";
import SideboardUtils from "./utils/SideboardUtils.js";

import bambooModelDir from "../resources/models/bamboo/BambooWithBones.fbx";

import grassDir from "../resources/textures/grass/grass.jpg";

import bambooDir from "../resources/textures/bamboo/diffuse.jpg";
import specularDir from "../resources/textures/bamboo/specular.jpg";
import normalDir from "../resources/textures/bamboo/normal.jpg";
import alphaDir from "../resources/textures/bamboo/alpha.jpg";

import woodDir from "../resources/textures/wood/wood.jpg";

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

    this.bambooMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(bambooDir),
      specularMap: textureLoader.load(specularDir),
      normalMap: textureLoader.load(normalDir),
      alphaMap: textureLoader.load(alphaDir),
      alphaTest: 0.8,
      side:THREE.DoubleSide,
      opacity: 0.0,
      transparent: true
    });

    // Plane material
    let texture = textureLoader.load(grassDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    this.grassMaterial = new THREE.MeshBasicMaterial({
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
    this.sideboardMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
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
    The bamboo material has to be set to 0.8 opacity initially. This is because
    if the material has an alphaTest value, it will remain transparent until
    opacity >= alphaTest, so the bamboo material needs a head start when fading
    in. I didn't set the other textures to alphaTest 0.8 so they can all just
    fade in together, and this is because doing so breaks the opacity of
    materials without alphaMaps.
    */
    GrassUtils.fadeInMaterial(this.grassMaterial);
    SideboardUtils.fadeInMaterial(this.sideboardMaterial);
    BambooUtils.fadeInMaterial(this.bambooMaterial);
  }

  render() {
    this.addFog();
    this.addLighting();

    GrassUtils.load(this.scene, this.grassMaterial);
    SideboardUtils.load(this.scene, this.sideboardMaterial);
    BambooUtils.load(this.scene, this.bambooMaterial);
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
    const self = this;
    const loader = new FBXLoader();
    loader.load(
      bambooModelDir,
      function(object) {
        object.traverse(function (child) {
          if (child instanceof THREE.SkinnedMesh) {
            child.material = self.bambooMaterial;
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

          self.scene.add(clone);
        }
      }
    );
  }
}
