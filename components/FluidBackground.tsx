import React, { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

class FluidShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2(0.5, 0.5) },
        screenWidth: { value: window.innerWidth } // 画面の幅
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,

      fragmentShader: `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float hueShift; // 色相のシフト値
  varying vec2 vUv;

  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  // 疑似ノイズ関数
  float snoise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
  }

  vec3 rgb2hsv(vec3 c)
  {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c)
  {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 hueShiftYIQ(vec3 color, float hueShift){
    const mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);
    const mat3 yiq2rgb = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.1070, 1.7046);

    vec3 yColor = rgb2yiq * color; 

    float originalHue = atan(yColor.b, yColor.g);
    float finalHue = originalHue + hueShift;

    float chroma = sqrt(yColor.b*yColor.b+yColor.g*yColor.g);
    vec3 yFinalColor = vec3(yColor.r, chroma * cos(finalHue), chroma * sin(finalHue));

    return yiq2rgb*yFinalColor;
  }

  vec3 reduceColor(vec3 color) {
    // 各チャネルの色を4階調（2ビット）に制限
    vec3 binnedColor;
    binnedColor.r = floor(color.r * 8.0) / 8.0;
    binnedColor.g = floor(color.g * 8.0) / 8.0;
    binnedColor.b = floor(color.b * 8.0) / 8.0;
    return binnedColor;
}


  void main() {
    // ピクセルのサイズ
    float pixelSize = 0.00005;
    vec2 cell = floor(vUv / pixelSize); 

    // セルの中央のUVを取得
    vec2 uv_centered = (cell + 0.5) * pixelSize;

    // ノイズを使用してカラーグラデーションを作成
    float noiseValue = snoise((uv_centered * 2.0 - 1.0) * 1000.0 + uTime * 0.1);
    // マゼンタとグリーンのネオンカラーでグラデーションを作成
    vec3 neonMagenta = vec3(0.0, 1.0, 1.0); // マゼンタ
    vec3 neonGreen = vec3(0.0, 1.0, 0.0);   // グリーン
    vec3 color = mix(neonGreen, neonMagenta, noiseValue);


    // 色相をシフト
    color = hueShiftYIQ(color, - uTime * 0.1 * 3.1415926535897932384626433832795);

    // 色数を8bitに制限
    color = reduceColor(color);

    gl_FragColor = vec4(color, 1.0);
  }
`,

    
    });
  }
}

extend({ FluidShaderMaterial });

const AnimatedMesh: React.FC<{ mousePos: number[] }> = ({ mousePos }) => {
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mousePos[0], mousePos[1]);
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[window.innerWidth, window.innerHeight]} />
      <fluidShaderMaterial ref={materialRef} />
    </mesh>
  );
}

const FluidBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 初期値を0に設定
  const [mousePos, setMousePos] = useState([0.5, 0.5]);

  useEffect(() => {
    // クライアントサイドでのみwindowへのアクセスを行う
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // マウスの位置を正規化された座標に変換
      const mouseX = event.clientX / window.innerWidth;
      const mouseY = 1.0 - event.clientY / window.innerHeight;
      setMousePos([mouseX, mouseY]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas className="z-0 fixed top-0 left-0" style={{ width: dimensions.width, height: dimensions.height, position: "fixed", zIndex: -1 }} camera={{ position: [0, 0, 1], fov: 75 }}>
      <AnimatedMesh mousePos={mousePos} />
    </Canvas>
  );
}

export default FluidBackground;
