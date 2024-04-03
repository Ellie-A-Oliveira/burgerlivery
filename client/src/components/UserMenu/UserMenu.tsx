import { Button } from "..";
import { ShoppingCartButton, UserMenuElement } from "./UserMenu.style";
import ShoppingCartIcon from "../../assets/shoppingCart.svg";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useState } from "react";

export const UserMenu = () => {
  const token = false;

  const [cartOpen, setCartOpen] = useState(false);

  const handleToggleCart = () => {
    setCartOpen(!cartOpen);
  }

  return (
    <UserMenuElement>
      {!token ? (
        <>
          <Button size="small" onClick={() => {}}>
            Cadastre-se
          </Button>
          <Button size="small" inverse onClick={() => {}}>
            Login
          </Button>
        </>
      ) : (
        <>
          <span>Ubirajara</span>
        </>
      )}
      <ShoppingCartButton onClick={handleToggleCart}>
        <img src={ShoppingCartIcon} alt="" />
      </ShoppingCartButton>
      <ShoppingCart open={cartOpen} onCloseClick={handleToggleCart} />
    </UserMenuElement>
  );
};
