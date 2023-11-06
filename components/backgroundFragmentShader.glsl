#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

// backgroundFragmentShader.glsl
void main() {
    vec2 uv = gl_FragCoord.xy;
    float gradient = uv.y; // y座標をグラデーションとして使用

    vec3 colorNoise = vec3(snoise2(uv) * 0.5 + 0.5) * 0.1 * pow(gradient, 0.4) +0.5 ;
    vec3 green = vec3(157.0/255.0, 129.0/255.0, 137.0/255.0); // 正しい緑色の定義
    colorNoise = colorNoise*green;
    gl_FragColor = vec4(colorNoise, 1.0); // カスタム背景色を設定
}
