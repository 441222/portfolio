import React from 'react';

// PrevArrowProps 型を定義します
type PrevArrowProps = {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
};

// 引数に PrevArrowProps 型を使用します
const PrevArrow: React.FC<PrevArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

export default PrevArrow;
