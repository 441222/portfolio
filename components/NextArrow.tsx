import React from 'react';

// ここで 'NextArrowProps' という型を定義します
type NextArrowProps = {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
};

// 引数に 'NextArrowProps' 型を使用します
const NextArrow: React.FC<NextArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      →
    </div>
  );
};

export default NextArrow;
