import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { ToastRootStyled } from "./ToastRoot.style";
import { OrderItem } from "../../interfaces/OrderItem.interface";
import { Toast } from "../Toast/Toast";


export const ToastRoot = () => {
    const orderContext = useContext(OrderContext);
    const lastAddedItem = orderContext.lastAddedItem;

    const [toasts, setToasts] = useState<OrderItem[]>([]);

    useEffect(() => {
        if (lastAddedItem) {
            setToasts([...toasts, lastAddedItem]);
            setTimeout(() => {
                setToasts(currentToasts => {
                    return currentToasts.filter(toast => toast !== lastAddedItem);
                });
            }, 3000);
        }
    }, [lastAddedItem]);

    const handleOnClose = () => {
        setToasts(currentToasts => {
            return currentToasts.filter(toast => toast !== lastAddedItem);
        });
    }

    return <ToastRootStyled active={toasts.length > 0}>
        {toasts.map((toast, index) => (
            <Toast key={index} onClose={handleOnClose}>{toast.title} adicionado com sucesso!</Toast>
        ))}
    </ToastRootStyled>;
}