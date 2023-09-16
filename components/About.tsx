import NeumoCard from './NeumoCard';

const About: React.FC = () => {
  return (
    <NeumoCard>
      <h2 className="text-xl font-bold mb-4">About Me</h2>
      <p>私はフロントエンドエンジニアのJohn Doeです。React, Next.js, TypeScriptを中心にウェブアプリケーションの開発に携わっています。</p>
    </NeumoCard>
  );
}

export default About;
