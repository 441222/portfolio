import React, { useState } from 'react';

const fontList = [

    'Dela Gothic One, cursive',
    'DotGothic16, sans-serif',
    'Hachi Maru Pop, cursive',
    'Kiwi Maru, serif',
    'Kosugi Maru, sans-serif',
    'Noto Serif JP, serif',
    'Reggae One, cursive',
    'Shippori Mincho B1, serif',
    'Yuji Boku, serif',
    'Zen Antique, serif',
];



const getRandomFont = () => {
  return fontList[Math.floor(Math.random() * fontList.length)];
};

interface RandomFontTextProps {
  children: string;
}

const RandomFontText: React.FC<RandomFontTextProps> = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const characters = children.split(''); // テキストを文字単位に分割
  const randomizedCharacters = characters.map((char, index) => {
    const font = hovered ? 'Noto Sans, sans-serif' : getRandomFont(); // ホバー時はNoto Sansに、それ以外はランダムなフォントに設定
    return (
      <span key={index} style={{ fontFamily: font }}>
        {char}
      </span>
    );
  });

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {randomizedCharacters}
    </div>
  );
};

export default RandomFontText;
