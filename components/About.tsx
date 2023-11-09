import NeumoCard from './NeumoCard';
import RandomFontText from '../components/RandomFontText';

const About: React.FC = () => {
  return (
      <NeumoCard>
        <h2 className="text-xl font-bold mb-4">
          <RandomFontText>About</RandomFontText>
        </h2>

        <div>
          <RandomFontText>

            1995年生まれ  神奈川県横浜市出身<br/><br/>
            横浜国立大学 理工学部 建築都市・環境系学科 卒業<br/>
            情報科学芸術大学院大学 メディア表現研究科 修了<br/>
            株式会社GOCCO. (2021-2023)<br/>
            日本総合ビジネス専門学校 非常勤講師 (2022)<br/>
            多摩美術大学 メディア芸術コース研究室 非常勤嘱託 (2023-) <br/><br/><br/>

            <h3 className="text-l font-bold mb-3">Skills</h3>
            Unity, UnrealEngine, TouchDesigner, Houdini, Rhinoceros/Grasshopper, Python, Next.js, MicroPython, Arduino<br/>
            </RandomFontText>


        </div>


      </NeumoCard>
  );
}

export default About;
