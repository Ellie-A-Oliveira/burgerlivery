import { useContext, useMemo } from "react";
import { OrderContext } from "../../context/OrderContext";
import xIcon from "../../assets/x.svg";
import minusIcon from "../../assets/minus-3108.svg";
import { priceFormat } from "../../helper/priceFormat";
import { OrderItem } from "../../interfaces/OrderItem.interface";
import { sumValues } from "../../helper/sumValues";
import { useNavigate } from "react-router-dom";
import { Button, Layout } from "../../components";

interface GroupedItems {
  [key: string]: OrderItem[];
}

export default function Checkout() {
  const context = useContext(OrderContext);
  const handleNavigate = useNavigate();
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

  const handleDeleteItem = (item: OrderItem, deleteAll: boolean = false) => {
    const orderTypes = Object.keys(order);
    Object.values(order).forEach((eachOrder, i) => {
      if (Array.isArray(eachOrder) && eachOrder.includes(item)) {
        let newOrder;
        if (deleteAll) {
          console.log(order[orderTypes[i]]);
          newOrder = order[orderTypes[i]].filter((o) => o.title !== item.title);
        } else {
          newOrder = order[orderTypes[i]].filter((o) => o !== item);
        }
        context.setOrder({
          ...order,
          [orderTypes[i]]: newOrder
        });
      }
    });
  }

  return (
    <Layout>
    <div>
      <header className="shopping-header">
        <h3 className="shopping-title">Checkout</h3>
      </header>
      <section>
        <ul>
          {Object.entries(groupedItems).map(([title, orders], i) => (
            <li className="flex space-between align-center" key={i}>
              <span>{title} x{orders.length}: {priceFormat(sumValues(orders.map((o) => o.value)))}</span>
              <div className="flex">
              { orders.length > 1 ?
                <Button
                  variant="nostyle"
                  size="small"
                  onClick={() => handleDeleteItem(orders[0])}
                >
                  <img className="icon" src={minusIcon} alt="" />
                </Button>
                :
                null
              }
                <Button
                  variant="nostyle"
                  size="small"
                  onClick={() => handleDeleteItem(orders[0], true)}
                >
                  <img className="icon" src={xIcon} alt="" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="total">Total: {priceFormat(order.totalValue)}</p>
        <Button
          variant="info"
          onClick={() => null}
        >
          Finalizar Compra
        </Button>
      </section>
    </div>
    </Layout>
  )
}
