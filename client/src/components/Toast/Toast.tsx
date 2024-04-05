import { Button } from "../Button/Button";
import { ToastStyled } from "./Toast.style";
import xIcon from "../../assets/x.svg";

interface ToastProps {
    children: React.ReactNode;
    onClose: () => void;
}

export const Toast = ({ children, onClose }: ToastProps) => {

    return <ToastStyled>
        <Button
          variant="nostyle"
          onClick={onClose}
          size="small"
        >
          <img className="icon" src={xIcon} alt="" />
        </Button>
        {children}
    </ToastStyled>;
}