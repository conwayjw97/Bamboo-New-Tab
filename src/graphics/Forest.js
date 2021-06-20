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

    const animate = () => {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(animate);
    }

    animate();
  }

  render() {
    this.addFog();
    this.addLighting();
    this.addPlane();
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
    const texture = new THREE.TextureLoader().load(pebblesDir);
    const normal = new THREE.TextureLoader().load(pebblesNormalDir);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    // const material = new THREE.MeshPhongMaterial({map: texture, normalMap: normal, side: THREE.DoubleSide});
    const material = new THREE.MeshBasicMaterial({color: "rgb(55, 84, 30)", side: THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI/2;
    this.scene.add(plane);
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
    loader.load(model, function (object) {
      const diffuse = new THREE.TextureLoader().load(diffuseDir);
      const specular = new THREE.TextureLoader().load(specularDir);
      const normal = new THREE.TextureLoader().load(normalDir);
      const alpha = new THREE.TextureLoader().load(alphaDir);
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = diffuse;
            child.material.specularMap = specular;
            child.material.normalMap = normal;
            child.material.alphaMap = alpha;
            child.material.alphaTest = 0.8;
            child.material.side = THREE.DoubleSide;
        }
      });

      onLoad(object);
    });
  }
}
