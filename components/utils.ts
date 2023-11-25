import * as THREE from 'three';

interface SceneRef {
  renderer?: THREE.WebGLRenderer;
  camera?: THREE.PerspectiveCamera;
  scene?: THREE.Scene; // scene プロパティを追加
}

export const handleResize = (sceneRef: React.MutableRefObject<SceneRef>) => {
  const { camera, renderer, scene } = sceneRef.current;
  if (camera && renderer && scene) { // scene を追加
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(newWidth, newHeight);

    const backgroundMesh = scene.getObjectByName("backgroundMesh") as THREE.Mesh; // scene から直接参照
    if (backgroundMesh) {
      backgroundMesh.scale.set(newWidth, newHeight, 1);
    }
  }
};
