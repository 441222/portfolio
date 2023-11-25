import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import glslify from 'glslify';
import backgroundFragmentShader from './backgroundFragmentShader.glsl';
import backgroundVertexShader from './backgroundVertexShader.glsl';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export const setupScene = async (canvas) => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
  camera.position.set(0, 0, 3);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 背景用のジオメトリとシェーダーマテリアル
  const backgroundGeometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const backgroundMaterial = new THREE.ShaderMaterial({
    vertexShader: backgroundVertexShader,
    fragmentShader: glslify(backgroundFragmentShader),
    uniforms: {},
    depthWrite: false,
    depthTest: false,
  });
  const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
  backgroundMesh.name = "backgroundMesh";
  scene.add(backgroundMesh);

  // FBXモデルの読み込み
  const loader = new FBXLoader();
  let mixer;
  let fbxModel; // モデルのメッシュを格納する変数
  loader.load('/portfolio/models/test.fbx', (fbx) => {
    fbxModel = fbx; // ローダーからのFBXをfbxModelに格納
    // FBXモデルのスケールや位置の調整
    fbxModel.traverse(child => {
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);

        const material = new THREE.ShaderMaterial ({
          vertexShader: glslify(vertexShader),
          fragmentShader: glslify(fragmentShader),
          uniforms: {
            uColor: { value: new THREE.Color(0x555555) },
            uLightPos: { value: new THREE.Vector3(0, 5, 1) },
            uLightColor: { value: new THREE.Color(0xffffff) },
            uLightIntensity: { value: 0.9 },
            uNoiseCoef: { value: 3 },
            uNoiseMin: { value: 10.5 },
            uNoiseMax: { value: 200.0 },
            uNoiseScale: { value: 0.8 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            normalMatrix: { value: normalMatrix }
          }
        });
        mesh.material = material;
      }
    });

    // モデルの位置を原点に移動
    fbxModel.scale.set(0.01, 0.01, 0.01);
    fbxModel.rotateY(Math.PI*0.5);
    fbxModel.translateY(-0.7);
    scene.add(fbxModel);

    // アニメーションミキサーの作成
    mixer = new THREE.AnimationMixer(fbxModel);
    if (fbxModel.animations.length > 0) {
      const action = mixer.clipAction(fbxModel.animations[0]);
      action.play();
      action.timeScale = 0.3;
    }
  });

  // 光源位置の初期値
  let lightPos = new THREE.Vector3(0, 5, 1);

  // 時間管理用のクロック
  const clock = new THREE.Clock();

  // アニメーションループ
  const animate = () => {
    requestAnimationFrame(animate);

    // FBXアニメーションの更新
    if (mixer) {
      const delta = clock.getDelta();
      mixer.update(delta);
    }

    // 光源位置の更新
    lightPos.x = 5 * Math.sin(clock.getElapsedTime()*0.7);
    lightPos.y = 5 * Math.sin(clock.getElapsedTime()*0.5);
    lightPos.z = 1 * Math.cos(clock.getElapsedTime()*1.3);

    // fbxModelが定義されている場合のみ処理を実行
    if (fbxModel) {
      fbxModel.traverse(child => {
        if (child.isMesh && child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.uLightPos.value = lightPos;
        }
      });
    }

    renderer.render(scene, camera);
  };

  animate();

  return { renderer, scene, camera };
};
