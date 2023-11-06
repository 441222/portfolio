import React, { useState, useEffect, useRef, ReactElement  } from 'react';

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

interface ChildElementProps {
  children?: React.ReactNode;
  // 他にもpropsがある場合はここに追加します。
}

interface RandomFontTextProps {
  children: React.ReactNode;
}

const RandomFontText: React.FC<RandomFontTextProps> = ({ children }) => {
  const [centeredOnMobile, setCenteredOnMobile] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerElement = ref.current; // ref.currentの値を効果のクリーンアップ関数で使用するために変数に代入

    if (isMobile() && observerElement) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.4, 0.6],
      };

      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        const viewportHeight = window.innerHeight;
        const isAtCenter =
          entry.boundingClientRect.top < viewportHeight / 2 &&
          entry.boundingClientRect.bottom > viewportHeight / 2;

        setCenteredOnMobile(isAtCenter);
      }, observerOptions);

      observer.observe(observerElement);

      return () => {
        observer.unobserve(observerElement);
      };
    }
  }, []);

  const handleMouseEnter = () => setCenteredOnMobile(true);
  const handleMouseLeave = () => setCenteredOnMobile(false);

  const renderText = (text: string) => {
    return text.split('').map((char, index) => {
      const currentFont = centeredOnMobile ? 'Noto Sans, sans-serif' : getRandomFont();
      return (
        <span key={index} style={{ fontFamily: currentFont }}>
          {char}
        </span>
      );
    });
  };

  const renderChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      // ... その他の条件分岐
  
      if (React.isValidElement<ChildElementProps>(child) && child.props.children) {
        // 正しい型アサーションを使用する
        return React.cloneElement(child as ReactElement<ChildElementProps>, {
          ...child.props,
          children: renderChildren(child.props.children),
        });
      }
      return child;
    });
  };

  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {renderChildren(children)}
    </div>
  );
};

export default RandomFontText;