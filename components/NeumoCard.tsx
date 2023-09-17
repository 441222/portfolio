import React from 'react';


type NeumoCardProps = {
    children: React.ReactNode;
    className?: string;
};

const NeumoCard: React.FC<NeumoCardProps> = ({ children }) => {
    return (
        <div className="bg-glass-bg p-6 rounded-xl shadow-glass backdrop-blur border border-neumo-border">

                {children}

        </div>
    );
}

export default NeumoCard;
