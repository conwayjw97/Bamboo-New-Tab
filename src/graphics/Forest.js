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

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target = new THREE.Vector3(0, 110, 0);
    // this.controls.update();

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
        break;
      case "top-down":
        this.camera.position.set(0, 600, 0);
        break;
      case "front":
        this.camera.position.set(0, 180, 500);
        break;
    }
    this.camera.lookAt(0, 110, 0);

    console.log(this.camera.position);
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
    /*
    The bamboo material has to be set to 0.8 opacity initially. This is because
    if the material has an alphaTest value, it will remain transparent until
    opacity >= alphaTest, so the bamboo material needs a head start when fading
    in. I didn't set the other textures to alphaTest 0.8 so they can all just
    fade in together, and this is because doing so breaks the opacity of
    materials without alphaMaps.
    */
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
