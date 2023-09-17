import React from 'react';
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




export const getStaticProps = async () => {
  try {
    const entries = await contentfulClient.getEntries({ content_type: 'project' });
    console.log(entries);
    const projects = entries.items; // ここで .items を使用
    return {
      props: { projects },
    };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return {
      props: { projects: [] }, // エラーが発生した場合、空の配列を返す
    }
  }
};

const Home: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="min-h-screen bg-neumo p-4 flex flex-col">

      <FluidBackground />

      {/* <NeumoCard className="flex flex-col flex-grow"> */}
        
        <Navbar />

        <main className="flex-grow">
          
          <NeumoCard className="mb-10">
            <h1 className="text-2xl font-bold mb-6">John Doe</h1>
            <p className="mb-6 text-shadow font-dot ">フロントエンドエンジニア。React, Next.js, TypeScriptなどの技術を活用してウェブアプリケーションを作成しています。</p>

            <div className="flex space-x-4">
              <NeumoButton>プロジェクト</NeumoButton>
              <NeumoButton>連絡する</NeumoButton>
            </div>
          </NeumoCard>
          <div className="mt-10"></div>
          
          <div className="grid grid-cols-1 gap-x-10 gap-y-10">
            <About />
            <Projects projects={projects} />
            <Contact />
          </div>

        </main>

        <Footer />

       {/* </NeumoCard> */} 
      
    </div>
  );
}

export default Home;
