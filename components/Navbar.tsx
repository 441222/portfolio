import NeumoCard from './NeumoCard';
import NeumoButton from './NeumoButton';
import RandomFontText from '../components/RandomFontText';
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 50; // 調整したいオフセット値（ピクセル単位で調整）
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // トップへスクロール
  };

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 p-2 ${isNavbarFixed ? 'bg-neumo bg-opacity-90' : ''}`}>
      <NeumoCard small>
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl cursor-pointer" onClick={scrollToTop}><RandomFontText>OOTANI</RandomFontText></div>
        <div className="space-x-2 ">
          <NeumoButton onClick={() => scrollToSection('about')}><RandomFontText>About</RandomFontText></NeumoButton>
          <NeumoButton onClick={() => scrollToSection('projects')}><RandomFontText>Works</RandomFontText></NeumoButton>
          <NeumoButton onClick={() => scrollToSection('contact')}><RandomFontText>Contact</RandomFontText></NeumoButton>
        </div>
      </div>
      </NeumoCard>
    </div>
  );
}

export default Navbar;
