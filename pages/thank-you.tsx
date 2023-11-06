import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NeumoCard from '../components/NeumoCard';
import NeumoButton from '../components/NeumoButton';
import RandomFontText from '../components/RandomFontText';
import ThreeScene from '../components/ThreeScene';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-neumo p-4 flex flex-col">
      <Head>
        <title>お問い合わせ完了 | Yoshiyuki Ootani</title>
        <meta name="description" content="お問い合わせいただきありがとうございます。" />
      </Head>

      <ThreeScene />

      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <NeumoCard className="max-w-lg w-full text-center p-10">
          <h1 className="text-4xl font-bold mb-6">
            <RandomFontText>お問い合わせ完了</RandomFontText>
          </h1>

          <p className="mb-8">
            お問い合わせありがとうございます。<br/>
            内容を確認した後、追ってご連絡いたします。
          </p>

          {/* Directly use NeumoButton as a link */}
          <NeumoButton as="a" href="/portfolio/">
            ホームに戻る
          </NeumoButton>
        </NeumoCard>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
