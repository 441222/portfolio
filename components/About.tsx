import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';

const About: React.FC = () => {
  return (
    <NeumoCard>
      <h2 className="text-xl font-bold mb-4">
        <RandomFontText>About Me</RandomFontText>
      </h2>

      <p>
        <RandomFontText>
          私はフロントエンドエンジニアのJohn Doeです。React, Next.js, TypeScriptを中心にウェブアプリケーションの開発に携わっています。
        </RandomFontText>
      </p>
    </NeumoCard>
  );
}

export default About;
