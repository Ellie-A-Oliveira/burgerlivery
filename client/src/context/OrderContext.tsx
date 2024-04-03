import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface OrderItem {
  title: string;
  value: number;
}

interface Order {
  appettizer: OrderItem[],
  hamburger: OrderItem[],
  combo: OrderItem[],
  dessert: OrderItem[],
  beverage: OrderItem[],
  totalValue: number,
}

interface OrderContextProps {
  appettizerOrder: OrderItem[];
  setAppettizerOrder: Dispatch<SetStateAction<OrderItem[]>>;
  hamburgerOrder: OrderItem[];
  setHamburgerOrder: Dispatch<SetStateAction<OrderItem[]>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  lastAddedItem?: OrderItem;
  setLastAddedItem: Dispatch<SetStateAction<OrderItem | undefined>>;
}

const initialOrder = {
  appettizer: [],
  hamburger: [],
  combo: [],
  dessert: [],
  beverage: [],
  totalValue: 0,
}

export const OrderContext = createContext<OrderContextProps>({});

interface OrderContextProviderProps {
  children: React.ReactNode;
}

export const OrderContextProvider = ({ children }: OrderContextProviderProps) => {

  const [appettizerOrder, setAppettizerOrder] = useState<OrderItem[]>([]);
  const [hamburgerOrder, setHamburgerOrder] = useState<OrderItem[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<OrderItem | undefined>();
  const [order, setOrder] = useState<Order>(initialOrder);

  useEffect(() => {
    const allOrders = [
      ...order.appettizer,
      ...order.beverage,
      ...order.combo,
      ...order.dessert,
      ...order.hamburger
    ];
    const newTotal = allOrders.reduce((acc, curr) => acc + curr.value, 0);

    if (newTotal === order.totalValue) return;

    setOrder({...order, totalValue: newTotal});
  }, [order]);

  return (
    <OrderContext.Provider
      value={{
        appettizerOrder,
        setAppettizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        order,
        setOrder,
        lastAddedItem,
        setLastAddedItem
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
