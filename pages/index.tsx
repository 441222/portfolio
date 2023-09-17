import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NeumoCard from '../components/NeumoCard';
import NeumoButton from '../components/NeumoButton';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import contentfulClient from '../lib/contentful';
import FluidBackground from '../components/FluidBackground';
import { Project } from '../components/Projects';
import RandomFontText from '../components/RandomFontText';

export const getStaticProps = async () => {
  try {
    const entries = await contentfulClient.getEntries({ content_type: 'project' });
    console.log(entries);
    const projects = entries.items;
    return {
      props: { projects },
    };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return {
      props: { projects: [] },
    }
  }
};

const Home: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="min-h-screen bg-neumo p-4 flex flex-col">
      <Head>
        <title>John Doe - フロントエンドエンジニア</title>
        <meta name="description" content="John Doeのポートフォリオサイト" />
      </Head>

      <FluidBackground />
      <Navbar />

      <main className="flex-grow">
      <div className="mt-24"></div>
        <NeumoCard className="mb-10">
          <h1 className="text-2xl font-bold mb-6">
            <RandomFontText>
              John Doe
            </RandomFontText>
          </h1>

          <div className="mb-6 text-shadow font-dot">
            <RandomFontText>
              フロントエンドエンジニア。React, Next.js, TypeScriptなどの技術を活用してウェブアプリケーションを作成しています。
            </RandomFontText>
          </div>

          <div className="flex space-x-4">
            
            <NeumoButton>
              <RandomFontText>
                プロジェクト
              </RandomFontText>
            </NeumoButton>
            <NeumoButton>
              <RandomFontText>
                連絡する
              </RandomFontText>
            </NeumoButton>
          </div>
        </NeumoCard>
        <div className="mt-10"></div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10">
          <div id="about"><About  /></div>
          <div id="projects"><Projects projects={projects} /></div>
          <div id="contact"><Contact /></div>
          <div>
            <h2 >ランダムフォントテキスト</h2>
            <h1 className="text-2xl font-bold mb-6"><RandomFontText>このテキストにはランダムなフォントが適用されます。</RandomFontText></h1>
            <RandomFontText>さらに別のテキストもランダムなフォントが適用されます。</RandomFontText>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
