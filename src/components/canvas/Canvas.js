import React, { useEffect, useState, useRef } from "react";
import "./Canvas.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import model from "../../resources/models/bamboo/Bamboo.FBX";
import diffuseDir from "../../resources/models/bamboo/diffuse.jpg";
import specularDir from "../../resources/models/bamboo/specular.jpg";
import normalDir from "../../resources/models/bamboo/normal.jpg";
import alphaDir from "../../resources/models/bamboo/alpha.jpg";

function randomNum(min, max){
  return (Math.random() * (max - min) + min).toFixed(4);
}

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
    camera.position.set(0, 100, 700);

    const renderer = new THREE.WebGLRenderer({canvas: canvas.current, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("rgb(40, 44, 52)");

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, 0);

    const scene = new THREE.Scene();

    const animate = () => {
    	renderer.render(scene, camera);
      controls.update();
    	requestAnimationFrame(animate);
    }

    // Add light
    scene.add(new THREE.AmbientLight(0x333333, 15));

    // Add plane
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshBasicMaterial({color: "rgb(55, 84, 30)", side: THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = 1.57;
    scene.add(plane);

    // Add bamboo
    const loader = new FBXLoader();
    loader.load(model, function ( object ) {
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

      for(let i=0; i<100; i++){
        const clone = object.children[0].clone();
        clone.position.x = randomNum(-200, 200);
        clone.position.z = randomNum(-200, 200);

        clone.rotation.z = Math.PI * randomNum(0, 1);

        const rand = randomNum(0.5, 1.0);
        console.log(rand);
        clone.scale.z = rand;

        scene.add(clone);
      }
    });

    animate();
  }, []);

  return (
    <div>
      <canvas ref={canvas} width={width} height={height} className="canvas">
        <p>Your browser doesn't support canvas.</p>
      </canvas>
    </div>
  );
}

export default Canvas;
