import { ButtonHTMLAttributes } from "react";
import { ButtonElement } from "./Button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  inverse?: boolean;
  size?: "large" | "small";
  variant?: "info" | "danger" | "nostyle";
  onClick: () => void;
}

export const Button = ({
  children,
  inverse,
  size,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonElement
      size={size}
      inverse={inverse}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </ButtonElement>
  );
};
