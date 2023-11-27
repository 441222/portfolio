import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import glslify from 'glslify';
import backgroundFragmentShader from './backgroundFragmentShader.glsl';
import backgroundVertexShader from './backgroundVertexShader.glsl';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

// HTMLCanvasElement型を明示的に指定
export const setupScene = async (canvas: HTMLCanvasElement): Promise<{ renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, mixer?: THREE.AnimationMixer }> => {
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
    uniforms: {
      uTime: { value: 0.0 },
    },
    depthWrite: false,
    depthTest: false,
  });
  const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
  backgroundMesh.name = "backgroundMesh";
  scene.add(backgroundMesh);

  // FBXモデルの読み込み
  const loader = new FBXLoader();
  let mixer: THREE.AnimationMixer | undefined;
  let fbxModel: THREE.Object3D | null = null;

  loader.load('/portfolio/models/folio.fbx', (fbx) => {
    fbxModel = fbx; // ローダーからのFBXをfbxModelに格納
    // FBXモデルのスケールや位置の調整
    fbxModel.traverse(child => {
      if (child instanceof THREE.Mesh){
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
            normalMatrix: { value: normalMatrix },
            uTime: { value: 0.0 },
          }
        });
        mesh.material = material;
      }
    });

    // モデルの位置を原点に移動
    fbxModel.scale.set(0.01, 0.01, 0.01);
    fbxModel.rotateY(Math.PI*0.5);
    fbxModel.translateY(-0.9);
    scene.add(fbxModel);

    // アニメーションミキサーの作成
    mixer = new THREE.AnimationMixer(fbxModel); // mixer を設定

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

  // アニメーションスピードとスクロール検出のための変数
  let animationSpeed = 0.8;
  let lastScrollTop = 0;
  let scrollTimeout: number | null = null;

  // スクロールイベントのハンドラ
  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール方向に基づいて速度を変更
    if (scrollTop > lastScrollTop) {
      animationSpeed = 10.0; // 下にスクロール
    } else {
      animationSpeed = 10.0; // 上にスクロール
    }
    lastScrollTop = scrollTop;

    // スクロール停止の検出
    clearTimeout(scrollTimeout as number);
    scrollTimeout = setTimeout(() => {
      animationSpeed = 0.4; // 元の速度に戻す
    }, 150)as unknown as number; // 150ミリ秒後にスクロールが止まったと判断
  };

  // スクロールイベントのリスナーを追加
  window.addEventListener('scroll', onScroll);

  // アニメーションループ
  const animate = () => {
    requestAnimationFrame(animate);

    // FBXアニメーションの更新
    if (mixer) {
      const delta = clock.getDelta();
      mixer.update(delta * animationSpeed);
    }

    // 光源位置の更新
    lightPos.x = 5 * Math.sin(clock.getElapsedTime()*0.7);
    lightPos.y = 5 * Math.sin(clock.getElapsedTime()*0.5);
    lightPos.z = 1 * Math.cos(clock.getElapsedTime()*1.3);

    // fbxModelが定義されている場合のみ処理を実行
    if (fbxModel) {
      fbxModel.traverse((child: THREE.Object3D) => {
        // 'instanceof'を使用してMeshかどうかをチェック
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.uLightPos.value = lightPos;
          child.material.uniforms.uTime.value = clock.getElapsedTime();
        }
      });
    }

    // 時間に基づいてuTimeユニフォームを更新
    backgroundMaterial.uniforms.uTime.value = clock.getElapsedTime();


    renderer.render(scene, camera);
  };

  animate();

  return { renderer, scene, camera, mixer };
};
