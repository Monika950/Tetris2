import React from 'react';

interface ButtonProps {
  name: string;
}

const Button: React.FC<ButtonProps> = ({name}) => {
  return (
    <div className="button">
        <button>{name}</button>
    </div>
  );
}

export default Button;