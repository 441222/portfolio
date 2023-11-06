const branchName = process.env.BRANCH_NAME || ""; // デフォルト値を空文字列に設定

module.exports = {
  reactStrictMode: true,
  assetPrefix: branchName,
  basePath: '/portfolio',
  webpack: (config, { isServer }) => {
    // GLSLファイルを処理するローダーの設定
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        'raw-loader',
        'glslify-loader'
      ],
    });

    return config;
  },
};
