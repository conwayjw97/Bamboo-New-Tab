/*
To-Do:
  - Loading state?
  - New models
  - Check when all models loaded
  - Fix bamboo alphaMap for a smooth fade-in

Links of interest:
https://stackoverflow.com/questions/54731571/animation-rotation-movement-of-an-object-on-mouse-click
https://threejs.org/examples/webgl_water_flowmap.html
*/

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Bamboo from "./models/Bamboo.js";
import Grass from "./models/Grass.js";
import Sideboard from "./models/Sideboard.js";

export default class Forest {
  constructor(canvas, settings) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
    this.camera.position.set(0, 250, 500);

    this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("rgb(40, 44, 52)");

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 110, 0);
    this.controls.update();

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.textureLoader = new THREE.TextureLoader();

    this.initModels(settings);
    this.loadScene();
    this.render();
  }

  render(){
    const self = this;

    function loop(){
      self.animationFrameId = requestAnimationFrame(loop);
      self.fadeIn();
      self.bamboo.swayAnimation();
      self.renderer.render(self.scene, self.camera);
    }

    loop();
  }

  update(settings){
    this.clearScene();
    this.initModels(settings);
    this.loadScene();
  }

  initModels(settings){
    this.bamboo = new Bamboo(this.textureLoader, settings.trees, settings.width, settings.height);
    this.grass = new Grass(this.textureLoader, settings.width, settings.height);
    this.sideboard = new Sideboard(this.textureLoader, settings.width, settings.height);
  }

  loadScene() {
    const near = 1;
    const far = 900;
    const color = 'white';
    this.scene.fog = new THREE.Fog(color, near, far);
    this.scene.background = new THREE.Color(color);

    this.scene.add(new THREE.AmbientLight(0x333333, 15));

    this.bamboo.load(this.scene);
    this.bamboo.makeVisible();

    // this.grass.load(this.scene);
    // this.grass.makeVisible();
    //
    // this.sideboard.load(this.scene);
    // this.sideboard.makeVisible();
  }

  clearScene(){
    let sceneMeshes = [];
    this.scene.traverse(function(child){
        sceneMeshes.push(child);
    });

    for(const sceneMesh of sceneMeshes){
        this.scene.remove(sceneMesh);
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
    this.bamboo.fadeIn();
    this.grass.fadeIn();
    this.sideboard.fadeIn();
  }

  onMouseMove(x, y){
    this.mouse.x = parseFloat(x);
    this.mouse.y = parseFloat(y);
    this.raycaster.setFromCamera(this.mouse, this.camera);

  	const intersects = this.raycaster.intersectObjects(this.bamboo.getTrees(), true);
  	for (const intersection of intersects) {
      // console.log(intersection.object.skeleton.bones[0]);
      // intersection.object.skeleton.bones[0].z += Math.PI/2;
      // console.log(intersection.object);

      // this.bamboo.animateTree(intersection.object);
  	}
  }
}
