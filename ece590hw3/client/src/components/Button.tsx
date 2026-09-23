import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({ children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} className="app-button" onClick={onClick}>
      {children}
    </button>
  );
}
