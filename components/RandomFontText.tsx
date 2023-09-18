import React, { useState, useEffect, useRef } from 'react';

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
  
const isMobile = () => {
    if (typeof window !== 'undefined') {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    return false;
    };
  
  interface RandomFontTextProps {
    children: string;
  }
  
  const RandomFontText: React.FC<RandomFontTextProps> = ({ children }) => {
    const [font, setFont] = useState<string>(getRandomFont());
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (isMobile()) {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
          const entry = entries[0];
          const viewportHeight = window.innerHeight;
          const isAtCenter = entry.boundingClientRect.top < viewportHeight / 2 && entry.boundingClientRect.bottom > viewportHeight / 2;
  
          if (entry.isIntersecting && isAtCenter) {
              setFont('Noto Sans, sans-serif');
          } else {
              setFont(getRandomFont());
          }
        };
  
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1, // Adjust as needed
        };
  
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        if (ref.current) {
          observer.observe(ref.current);
        }
  
        return () => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        };
      }
    }, []);
  
    const handleMouseEnter = () => {
      if (!isMobile()) setHovered(true);
    };
  
    const handleMouseLeave = () => {
      if (!isMobile()) setHovered(false);
    };
  
    const characters = children.split('').map((char, index) => {
      const currentFont = isMobile() ? font : (hovered ? 'Noto Sans, sans-serif' : getRandomFont());
      return (
        <span key={index} style={{ fontFamily: currentFont }}>
          {char}
        </span>
      );
    });
  
    return (
      <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {characters}
      </div>
    );
  };
  
  export default RandomFontText;