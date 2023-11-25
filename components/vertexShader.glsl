uniform vec3 uLightPos;

varying vec3 vNormal;
varying vec3 vSurfaceToLight;

#include <common>
#include <skinning_pars_vertex>

void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>

    // スキニング処理
    #include <skinning_vertex>

    #include <project_vertex>

    // スキニング処理後の頂点位置と法線を使用
    vec4 skinnedPosition = vec4(transformed, 1.0);
    vec3 skinnedNormal = normalize(objectNormal);

    vec4 worldPosition = modelMatrix * skinnedPosition;
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 viewLightPosition = viewMatrix * vec4(uLightPos, 1.0);

    vNormal = normalize((viewMatrix * modelMatrix * vec4(skinnedNormal, 0.0)).xyz);
    vSurfaceToLight = normalize(viewLightPosition.xyz - viewPosition.xyz);

    gl_Position = projectionMatrix * viewPosition;
}
