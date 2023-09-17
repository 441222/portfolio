import React from 'react';

type NeumoCardProps = {
  children: React.ReactNode;
  className?: string;
  small?: boolean; // small プロパティを追加
};

const NeumoCard: React.FC<NeumoCardProps> = ({ children, small }) => {
  const cardClassName = `bg-glass-bg rounded-xl shadow-glass backdrop-blur border border-neumo-border ${small ? 'p-3 m-2' : 'p-6'}`;

  return (
    <div className={cardClassName}>
      {children}
    </div>
  );
}

export default NeumoCard;
