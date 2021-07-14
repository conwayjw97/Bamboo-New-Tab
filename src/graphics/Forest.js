import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Bamboo from "./models/Bamboo.js";
import Grass from "./models/Grass.js";
import Sideboard from "./models/Sideboard.js";

export default class Forest {
  constructor(canvas, settings) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
    this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("rgb(40, 44, 52)");

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.textureLoader = new THREE.TextureLoader();

    this.setCamera(settings);
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
    this.setCamera(settings);
    this.initModels(settings);
    this.clearScene();
    this.loadScene();
  }

  setCamera(settings){
    switch(settings.camera){
      case "default":
        this.camera.position.set(0, 260, 450);
        this.camera.lookAt(0, 110, 0);
        break;
      case "top-down":
        this.camera.position.set(0, 600, 0);
        this.camera.lookAt(0, 0, 0);
        break;
      case "zoomed":
        this.camera.position.set(0, 230, 360);
        this.camera.lookAt(0, 110, 0);
        break;
    }
  }

  initModels(settings){
    this.bamboo = new Bamboo(this.textureLoader, settings.trees, settings.width, settings.height);
    this.grass = new Grass(this.textureLoader, settings.width, settings.height);
    this.sideboard = new Sideboard(this.textureLoader, settings.width, settings.height);
  }

  loadScene() {
    const near = 1;
    const far = 1;
    const color = 'white';
    this.scene.fog = new THREE.Fog(color, near, far);
    this.scene.background = new THREE.Color(color);

    this.scene.add(new THREE.AmbientLight(0x333333, 15));

    this.bamboo.load(this.scene);
    this.bamboo.makeVisible();
    this.grass.load(this.scene);
    this.grass.makeVisible();
    this.sideboard.load(this.scene);
    this.sideboard.makeVisible();
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
    if(this.scene.fog.far < 800){
      this.scene.fog.far = this.scene.fog.far + 30;
    }
    this.bamboo.fadeIn();
    this.grass.fadeIn();
    this.sideboard.fadeIn();
  }

  onMouseMove(x, y){
    this.mouse.x = parseFloat(x);
    this.mouse.y = parseFloat(y);
    this.raycaster.setFromCamera(this.mouse, this.camera);

  	const intersects = this.raycaster.intersectObjects(this.bamboo.trees, true);
  	for (const intersection of intersects) {
      this.bamboo.mouseOverAnimation(intersection.object.parent);
  	}
  }
}
