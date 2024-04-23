import { styled } from "styled-components";

interface ShoppingCartStyledProps {
  open: boolean;
}

export const ShoppingCartStyled = styled.article<ShoppingCartStyledProps>`
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  padding: 1.5rem;
  transform: translateX(100%);
  background-color: white;
  transition: transform .5s ease-in-out;

  .shopping-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .shopping-title {
    margin: 0;
  }

  .icon {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }

  .total {
    margin-bottom: 1rem;
  }

  ${(props) => props.open &&
    `
    transform: translateX(0);
    `
  }
`;
