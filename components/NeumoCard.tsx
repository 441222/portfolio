import React from 'react';


type NeumoCardProps = {
    children: React.ReactNode;
    className?: string;
};

const NeumoCard: React.FC<NeumoCardProps> = ({ children, small }) => {
    const cardClassName = `bg-glass-bg rounded-xl shadow-glass backdrop-blur border border-neumo-border ${small ? 'p-3' : 'p-6'}`;
  
    return (
      <div className={cardClassName}>
        {children}
      </div>
    );
  }
  
  

export default NeumoCard;
