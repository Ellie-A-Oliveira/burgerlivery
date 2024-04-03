import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "..";
import { ShoppingCartStyled } from "./ShoppingCart.style"
import { OrderContext } from "../../context/OrderContext";
import xIcon from "../../assets/x.svg";
import { priceFormat } from "../../helper/priceFormat";

interface ShoppingCartProps {
  open: boolean;
  onCloseClick: () => void;
}

export const ShoppingCart = ({ open, onCloseClick }: ShoppingCartProps) => {
  const context = useContext(OrderContext);
  const order = context.order;

  const allOrders = useMemo(() => [
    ...order.appettizer,
    ...order.beverage,
    ...order.combo,
    ...order.dessert,
    ...order.hamburger
  ], [order]);
  
  const [itemTypes, setItemTypes] = useState<any[]>([]);

  useEffect(() => {
    
  }, [allOrders]);

  return (
    <ShoppingCartStyled open={open}>
      <header className="shopping-header">
        <h3 className="shopping-title">Carrinho</h3>
        <Button
          variant="nostyle"
          onClick={onCloseClick}
        >
          <img className="icon" src={xIcon} alt="" />
        </Button>
      </header>
      <section>
        <ul>
          {allOrders.map((order, i) => (
            <li key={i}>{priceFormat(order.value)}: {order.title}</li>
          ))}
        </ul>
        <p>Total: {priceFormat(order.totalValue)}</p>
      </section>
    </ShoppingCartStyled>
  )
}
