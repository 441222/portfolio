import React from 'react';

interface NeumoButtonLargeProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const NeumoButtonLarge: React.FC<NeumoButtonLargeProps> = ({ children, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="bg-glass-bg p-5 rounded-xl shadow-glass backdrop-blur transition-transform transform active:scale-95 w-[30vw] h-[30vw] sm:w-[25vw] sm:h-[25vw] md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw]"
        >
            {children}
        </button>
    );
}

export default NeumoButtonLarge;
