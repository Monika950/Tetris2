import React from 'react';

interface ButtonProps {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <div className="button">
      <button onClick={onClick}>{name}</button>
    </div>
  );
}

export default Button;
