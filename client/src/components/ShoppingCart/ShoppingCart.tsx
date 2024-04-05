import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "..";
import { ShoppingCartStyled } from "./ShoppingCart.style"
import { OrderContext } from "../../context/OrderContext";
import xIcon from "../../assets/x.svg";
import { priceFormat } from "../../helper/priceFormat";
import { OrderItem } from "../../interfaces/OrderItem.interface";
import { sumValues } from "../../helper/sumValues";

interface ShoppingCartProps {
  open: boolean;
  onCloseClick: () => void;
}

interface GroupedItems {
  [key: string]: OrderItem[];
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
  
  const groupedItems = useMemo(() => {
    const grouped: GroupedItems = {};
    allOrders.forEach((item) => {
      let title = `${item.title}`;
      if (item.size) {
        title += ` (${item.size})`;
      }
      if (!grouped[title]) {
        grouped[title] = [];
      }
      grouped[title].push(item);
    });
    return grouped;
  }, [allOrders]);

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
          {Object.entries(groupedItems).map(([title, orders], i) => (
            <li key={i}>
              {title} x{orders.length}: {priceFormat(sumValues(orders.map((o) => o.value)))}
            </li>
          ))}
        </ul>
        <p>Total: {priceFormat(order.totalValue)}</p>
      </section>
    </ShoppingCartStyled>
  )
}
