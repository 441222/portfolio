import * as THREE from 'three';

export const handleResize = (sceneRef: React.MutableRefObject<{
  renderer?: THREE.WebGLRenderer;
  camera?: THREE.PerspectiveCamera;
}>) => {
  const { camera, renderer } = sceneRef.current;
  if (camera && renderer) {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(newWidth, newHeight);

    const backgroundMesh = sceneRef.current.scene?.getObjectByName("backgroundMesh") as THREE.Mesh;
    if (backgroundMesh) {
      backgroundMesh.scale.set(newWidth, newHeight, 1);
    }
  }
};
