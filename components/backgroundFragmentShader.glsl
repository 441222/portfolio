#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float uTime; // 時間に基づくユニフォーム変数

// backgroundFragmentShader.glsl
void main() {
    vec2 uv = gl_FragCoord.xy;
    float gradient = uv.y; // y座標をグラデーションとして使用

    // 時間に基づいてノイズシードを変更
    vec3 colorNoise = vec3(snoise2(uv + uTime) * 0.5 + 0.5) * 0.1 * pow(gradient, 0.4) + 0.5;
    vec3 green = vec3(57.0/255.0, 57.0/255.0, 57.0/255.0); // 正しい緑色の定義
    colorNoise = colorNoise * green;
    gl_FragColor = vec4(colorNoise, 1.0); // カスタム背景色を設定
}
