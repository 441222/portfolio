
// 特定の背景の頂点シェーダー
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
