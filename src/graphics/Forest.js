/*
To-Do:
  - Loading state?
  - New models
  - Check when all models loaded
  - Fix bamboo alphaMap for a smooth fade-in

Links of interest:
https://threejs.org/examples/webgl_water_flowmap.html
*/

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import BambooUtils from "./utils/BambooUtils.js";
import GrassUtils from "./utils/GrassUtils.js";
import SideboardUtils from "./utils/SideboardUtils.js";

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
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.createMaterials();

    const animate = () => {
      this.fadeInMaterials();
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(animate);
    }

    animate();
  }

  createMaterials(){
    const textureLoader = new THREE.TextureLoader();
    this.grassMaterial = GrassUtils.createMaterial(textureLoader);
    this.sideboardMaterial = SideboardUtils.createMaterial(textureLoader);
    this.bambooMaterial = BambooUtils.createMaterial(textureLoader);
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
    // Add fog and lighting
    const near = 1;
    const far = 900;
    const color = 'white';
    this.scene.fog = new THREE.Fog(color, near, far);
    this.scene.background = new THREE.Color(color);
    this.scene.add(new THREE.AmbientLight(0x333333, 15));

    GrassUtils.loadMesh(this.scene, this.grassMaterial);
    SideboardUtils.loadMesh(this.scene, this.sideboardMaterial);
    BambooUtils.loadMesh(this.scene, this.bambooMaterial);
  }

  onMouseMove(x, y){
    this.mouse.x = x;
    this.mouse.y = y;

    this.raycaster.setFromCamera(this.mouse, this.camera);
  	const intersects = this.raycaster.intersectObjects(this.scene.children);

  	for ( let i = 0; i < intersects.length; i ++ ) {
      console.log(intersects);
  	}
  }
}
