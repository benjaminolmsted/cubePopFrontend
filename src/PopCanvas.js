import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from "gsap";

function PopCanvas({work}){
let ref = useRef();

useEffect(() => {
  if(work){
    let renderer, scene, camera, cube;
    let canvas = ref.current;
    renderer = new THREE.WebGLRenderer({
        canvas : canvas
      });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);  
    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(70,1000/600, .01, 10000 );
    camera.position.set(work.x_camera_start, work.y_camera_start, work.z_camera_start);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    let controls = new OrbitControls(camera, renderer.domElement);  

    let directionalLight = new THREE.DirectionalLight( parseInt(work.light_1), 1.0 );
    directionalLight.position.set( 350, 0, 0  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( parseInt(work.light_2), 1.0 );
    directionalLight.position.set( -350, 0, 0  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( parseInt(work.light_3), 1.0 );
    directionalLight.position.set( 0, 0, 350  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );
    
    directionalLight = new THREE.DirectionalLight( parseInt(work.light_4), 1.0 );
    directionalLight.position.set( 0, 0, -350  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );
    
    directionalLight = new THREE.DirectionalLight( parseInt(work.light_5), 1.0 );
    directionalLight.position.set( 0, -200, 0  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );
    
    directionalLight = new THREE.DirectionalLight( parseInt(work.light_6), 1.0 );
    directionalLight.position.set( 0, 200, 0  );
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene.add( directionalLight );


    var cubes = new THREE.Object3D();

    function createCubes(){
      var geometry = new THREE.BoxGeometry(work.x_cube, work.y_cube, work.z_cube);
      var texture = new THREE.MeshLambertMaterial({color:0xFFFFFF});
      for(var h = work.z_start; h < work.z_end; h++){
        for(var i=work.x_start;i<work.x_end;i++){
          for(var j=work.y_start;j<work.y_end;j++){
           cube = new THREE.Mesh(geometry, texture);
           cube.position.z = work.z_cube*h;
           cube.position.x = work.x_cube*i;
           cube.position.y = work.y_cube*j;

            gsap.to(cube.rotation, work.r_time,{
                x: work.r_amount,
                y: work.r_amount,
                z: work.r_amount,
                repeat: -1,
                yoyo: true,
                delay: Math.abs(work.r_delay) *(h+i+j),
              });
              gsap.to(cube.scale, work.xyz_scale_time,{
                y: work.xyz_scale,
                x: work.xyz_scale,
                z: work.xyz_scale,
                repeat: -1,
                yoyo: true,
                delay: Math.abs(work.xyz_scale_delay) *(h+i+j),
              });
              gsap.to(cube.position, work.xyz_position_time,{
                y: work.xyz_position * j,
                x: work.xyz_position * i,
                z: work.xyz_position * h,
                repeat: -1,
                yoyo: true,
                delay: Math.abs(work.xyz_position_delay) *(h+i+j),
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
  }
              }, [work]);

     return (
         <canvas
            ref={ref} 
             style={{ width: "100vw", height: '100vh' }}
         />
     );
 };

 export default PopCanvas;