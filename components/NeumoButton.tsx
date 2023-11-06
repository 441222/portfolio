import React from 'react';

interface NeumoButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    as?: keyof JSX.IntrinsicElements;
    href?: string;
}

const NeumoButton: React.FC<NeumoButtonProps> = ({
    children,
    onClick,
    className = '',
    type = 'button',
    as: Component = 'button', // default to 'button'
    href,
    ...props // to collect any other prop that might be needed
}) => {
    // className and otherProps will be applied to the component, whether it's a 'button' or 'a'
    const otherProps: any = { // use 'any' to allow any other property
        className: `bg-glass-bg p-2 rounded-xl shadow-glass backdrop-blur border border-neumo-border transition-transform transform active:scale-95 ${className}`,
        onClick,
        ...props
    };

    // If 'Component' is 'a', we add 'href' and 'type' should not be included
    if (Component === 'a') {
        otherProps.href = href;
    } else {
        // Only add 'type' if the component is not an 'a' element
        otherProps.type = type;
    }

    return React.createElement(Component, otherProps, children);
}

export default NeumoButton;
