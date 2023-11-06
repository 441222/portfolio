import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import glslify from "glslify";
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

// カスタム背景シェーダーファイルをインポート
import backgroundFragmentShader from './backgroundFragmentShader.glsl';
import backgroundVertexShader from './backgroundVertexShader.glsl';

const NUM_OBJECTS = 20;
const BOUNDARY = 5;

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    objects?: THREE.Mesh[];
    raf?: number;
  }>({});

  const handleResize = () => {
    const { camera, renderer } = sceneRef.current;
    if (camera && renderer) {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(newWidth, newHeight);

      // ウィンドウのサイズが変わったら背景も調整
      const backgroundMesh = sceneRef.current.scene?.getObjectByName("backgroundMesh") as THREE.Mesh;
      if (backgroundMesh) {
        backgroundMesh.scale.set(newWidth, newHeight, 1);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Set Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff); // 白い背景色

      const COLOR_PALETTE = [
        '#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', 
      ];
      const getRandomColorFromPalette = () => {
        const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
        return new THREE.Color(COLOR_PALETTE[randomIndex]);
      };

      // Set Render
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

      // Set Camera
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
      camera.position.set(0, 0, 3);
      camera.lookAt(0, 0, 0);

      // 初期のサイズをウィンドウサイズに合わせる
      const initialBackgroundGeometry = new THREE.PlaneGeometry(width, height, 1, 1);

      // Set Background
      const backgroundMaterial = new THREE.ShaderMaterial({
        vertexShader: backgroundVertexShader,
        fragmentShader: glslify(backgroundFragmentShader),
        uniforms: {},
        depthWrite: false,
        depthTest: false,
      });
      const backgroundMesh = new THREE.Mesh(initialBackgroundGeometry, backgroundMaterial);
      backgroundMesh.name = "backgroundMesh";
      scene.add(backgroundMesh);

      // Set Sphere
      const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: backgroundFragmentShader,
        uniforms: {
          uColor: {
            value: getRandomColorFromPalette()
          },
          uLightPos: {
            value: new THREE.Vector3(0, 5, 1)
          },
          uLightColor: {
            value: new THREE.Color(0xffffff)
          },
          uLightIntensity: {
            value: 0.7
          },
          uNoiseCoef: {
            value: 5
          },
          uNoiseMin: {
            value: 0.5
          },
          uNoiseMax: {
            value: 200.0
          },
          uNoiseScale: {
            value: 0.8
          }
        }
      });

      const objects: THREE.Mesh[] = [];

      for (let i = 0; i < NUM_OBJECTS; i++) {
        const isCube = Math.random() > 0.5;
        const geometry = isCube ? new THREE.BoxGeometry(0.5, 0.5, 0.5) : new THREE.SphereGeometry(0.5, 32, 32);

        const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());

        const objectMaterial = new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: glslify(fragmentShader),
          uniforms: {
            uColor: {
              value: getRandomColorFromPalette()
            },
            uLightPos: {
              value: new THREE.Vector3(0, 5, 1)
            },
            uLightColor: {
              value: new THREE.Color(0xffffff)
            },
            uLightIntensity: {
              value: 0.7
            },
            uNoiseCoef: {
              value: 5
            },
            uNoiseMin: {
              value: 0.5
            },
            uNoiseMax: {
              value: 200.0
            },
            uNoiseScale: {
              value: 0.8
            }
          }
        });

        const mesh = new THREE.Mesh(geometry, objectMaterial);
        mesh.userData.moveDirection = new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        );

        mesh.position.set(
          (Math.random() - 0.5) * BOUNDARY,
          (Math.random() - 0.5) * BOUNDARY,
          (Math.random() - 0.5) * BOUNDARY*0.3
        );

        if (isCube) {
          mesh.userData.rotation = new THREE.Vector3(
            Math.random() * 0.01 - 0.007,
            Math.random() * 0.01 - 0.007,
            Math.random() * 0.01 - 0.007
          );
        }

        scene.add(mesh);
        objects.push(mesh);
      }

      window.addEventListener('resize', handleResize, { passive: true });
      handleResize();

      const draw = (now: number) => {
        objects.forEach((object) => {
          if (object.geometry instanceof THREE.BoxGeometry) {
            object.rotateX(object.userData.rotation.x);
            object.rotateY(object.userData.rotation.y);
            object.rotateZ(object.userData.rotation.z);
          }

          object.position.add(object.userData.moveDirection);

          ['x', 'y', 'z'].forEach((axis) => {
            if (Math.abs(object.position[axis]) > BOUNDARY) {
              object.userData.moveDirection[axis] = -object.userData.moveDirection[axis];
            }
          });
        });

        renderer.render(scene, camera);
        sceneRef.current.raf = requestAnimationFrame(draw);
      };

      sceneRef.current = { renderer, scene, camera, objects };

      sceneRef.current.raf = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(sceneRef.current.raf);
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
};

export default ThreeScene;



