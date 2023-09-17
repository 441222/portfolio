import React from 'react';

interface NeumoButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const NeumoButton: React.FC<NeumoButtonProps> = ({ children, onClick }) => {
    return (
      <button 
        onClick={onClick}
        className="bg-glass-bg p-4 rounded-xl shadow-glass backdrop-blur border border-neumo-border transition-transform transform active:scale-95"
      >
        {children}
      </button>
    );
}

export default NeumoButton;
