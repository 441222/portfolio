import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { setupScene } from './setupScene';
import { handleResize } from './utils';

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    mixer?: THREE.AnimationMixer;
    raf?: number;
  }>({});


  useEffect(() => {
    const initializeScene = async () => {
      if (canvasRef.current) {
        const { renderer, scene, camera, mixer } = await setupScene(canvasRef.current);
        sceneRef.current = { renderer, scene, camera, mixer };
        handleResize(sceneRef);
        window.addEventListener('resize', () => handleResize(sceneRef), { passive: true });

        const clock = new THREE.Clock();
        let frame = 0;

        const animate = () => {
          requestAnimationFrame(animate);
          frame++; // フレームカウンターを増やす
          if (frame % 2 !== 0) {
            return; // 奇数フレームでは描画をスキップ
          }

          const delta = clock.getDelta();


          // アニメーションミキサーの更新
          if (sceneRef.current.mixer) {
            sceneRef.current.mixer.update(delta);
          }

          if (sceneRef.current.scene && sceneRef.current.camera) {
            renderer.render(sceneRef.current.scene, sceneRef.current.camera);
          }
        };

        animate();
      }
    };

    initializeScene();
    
    return () => {
      window.removeEventListener('resize', () => handleResize(sceneRef));
      if (sceneRef.current.raf) {
        cancelAnimationFrame(sceneRef.current.raf);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
};

export default ThreeScene;
