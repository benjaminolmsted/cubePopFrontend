import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from "gsap";

function PopCanvas(){
let ref = useRef();

const cameraParams = {colors: [0xFF00FF, 0x0000FF, 0xFF0000, 0x00FFFF, 0xFFFF00, 0x00FF00]}

useEffect(() => {
  let renderer, scene, camera, cube;
  let canvas = ref.current;
  renderer = new THREE.WebGLRenderer({
      canvas : canvas
    });
  renderer.setSize(1920,1080);
  renderer.setClearColor(0x000000);  
  scene = new THREE.Scene();


  camera = new THREE.PerspectiveCamera(70,1000/600, .01, 10000 );
  camera.position.set(300, 300, 300);
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add(camera);

  let controls = new OrbitControls(camera, renderer.domElement);  

  let directionalLight = new THREE.DirectionalLight( 0xFF00FF, 1.0 );
  directionalLight.position.set( 350, 0, 0  );
  directionalLight.lookAt(new THREE.Vector3(0,0,0));
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0x0000FF, 1.0 );
  directionalLight.position.set( -350, 0, 0  );
  directionalLight.lookAt(new THREE.Vector3(0,0,0));
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0xFF0000, 1.0 );
	directionalLight.position.set( 0, 0, 350  );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );
  
  directionalLight = new THREE.DirectionalLight( 0x00FFFF, 1.0 );
	directionalLight.position.set( 0, 0, -350  );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );
  
  directionalLight = new THREE.DirectionalLight( 0xFFFF00, 1.0 );
	directionalLight.position.set( 0, -200, 0  );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );
  
	directionalLight = new THREE.DirectionalLight( 0x00FF00, 1.0 );
	directionalLight.position.set( 0, 200, 0  );
	directionalLight.lookAt(new THREE.Vector3(0,0,0));
	scene.add( directionalLight );


  var cubes = new THREE.Object3D();

  const cubeParams = {
    zStart: -5,
    zEnd: 5,
    xStart: -5,
    xEnd: 5,
    yStart: -5,
    yEnd: 5,
    cubeZ: 48,
    cubeX: 48,
    cubeY: 48,
    rAmount: 0,
    rDelay: .5,
    rTime: 24.5,
    xyzScaleTime: 10,
    xyzScale: 0.001,
    xyzScaleDelay: .5,
    xyzPosition: 50,
    xyzPositionDelay: .5,
    xyzPositionTime: 10
  }

  function createCubes(){
    var geometry = new THREE.BoxGeometry(cubeParams.cubeX,cubeParams.cubeY,cubeParams.cubeZ);
    var texture = new THREE.MeshLambertMaterial({color:0xFFFFFF});
    for(var h = cubeParams.zStart; h < cubeParams.zEnd; h++){
      for(var i=cubeParams.xStart;i<cubeParams.xEnd;i++){
        for(var j=cubeParams.yStart;j<cubeParams.yEnd;j++){
          cube = new THREE.Mesh(geometry, texture);
          cube.position.z = cubeParams.cubeZ*h;
          cube.position.x = cubeParams.cubeX*i;
          cube.position.y = cubeParams.cubeY*j;

          gsap.to(cube.rotation, cubeParams.rTime,{
              x: cubeParams.rAmount,
              y: cubeParams.rAmount,
              z: cubeParams.rAmount,
              repeat: -1,
              yoyo: true,
              delay: cubeParams.rDelay *(h+i+j),
            });
            gsap.to(cube.scale, cubeParams.xyzScaleTime,{
              y: cubeParams.xyzScale,
              x: cubeParams.xyzScale,
              z: cubeParams.xyzScale,
              repeat: -1,
              yoyo: true,
              delay: cubeParams.xyzScaleDelay *(h+i+j),
            });
            gsap.to(cube.position, cubeParams.xyzPositionTime,{
              y: cubeParams.xyzPosition * j,
              x: cubeParams.xyzPosition * i,
              z: cubeParams.xyzPosition * h,
              repeat: -1,
              yoyo: true,
              delay: cubeParams.xyzPositionDelay *(h+i+j),
            });
          cubes.add(cube);
        }
      } 
    }
    
    scene.add(cubes);
  };  

const render = function () {
    requestAnimationFrame(render);
  
    renderer.render(scene, camera);
};
createCubes();
render();

              }, []);

     return (
         <canvas
            ref={ref} 
             style={{ width: '1000px', height: '600px' }}
         />
     );
 };

 export default PopCanvas;