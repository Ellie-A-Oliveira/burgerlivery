import { useContext, useEffect, useState } from "react";
import { ProductCard, Button } from "..";
import { ButtonGroup } from "../Button/Button.style";
import { ProductCardContent, ProductCardPrice } from "../ProductCard/ProductCard.style";
import { OrderContext } from "../../context/OrderContext";

interface ProductProps {
  selectedCategory?: {
    text: string;
    link: string;
  };
  product: {
    image: Array<string> | string;
    title: string;
    description: string;
    values?: Record<string, number>;
    value?: number;
  };
  valueOptions: any;
  priceFormat: CallableFunction;
}

const orderPropMapping = {
  "Entradinhas": "appettizer",
  "Burgers": "hamburger",
  "Combos": "combo",
  "Sobremesas": "dessert",
  "Bebidas": "beverage",
};

export default function Product({
  selectedCategory,
  product,
  valueOptions,
  priceFormat,
}: ProductProps) {
  const [selectedOption, setSelectedOption] = useState<"first" | "second">("first");
  const orderContext = useContext(OrderContext);

  const onFirstOptionClick = () => {
    setSelectedOption("first");
  }

  const onSecondOptionClick = () => {
    setSelectedOption("second");
  }

  const handleAddProduct = () => {
    const order = orderContext.order;
    const value = product.value
      ? product.value :
        product.values?.[valueOptions[selectedCategory.link]?.[selectedOption]]
        ?? product.values?.[valueOptions[selectedCategory.link]?.first];

    const newProduct = { value: value!, title: product.title };
    const orderType = orderPropMapping[selectedCategory!.text];
    const currentOrder = order[orderType];
        
    orderContext.setOrder({
      ...order,
      [orderType]: [
        ...currentOrder,
        newProduct
      ]
    });

    orderContext.setLastAddedItem(newProduct);
  }

  useEffect(() => {
    if (selectedCategory?.link === "/combos") {
      setSelectedOption("second");
    } else {
      setSelectedOption("first");
    }
  }, [selectedCategory])

  return (
    <ProductCard>
      <ProductCardContent>
        <h2>{selectedCategory?.link === "/combos" ? "COMBO ": ""}{product.title}</h2>
        <p>{product.description}{selectedCategory?.link === "/combos" ? (<><br /><br /><span> + batata tradicional e bebida</span></>): ""}</p>
        {!(selectedCategory?.link === "/hamburgers" ||
          selectedCategory?.link === "/combos") &&
          product.values?.[valueOptions[selectedCategory.link]?.["second"]] ?
          <ButtonGroup>
            <Button onClick={onFirstOptionClick}>P</Button>
            <Button onClick={onSecondOptionClick}>G</Button>
          </ButtonGroup> :
          null
        }
        <Button onClick={handleAddProduct}>Adicionar</Button>
      </ProductCardContent>
      <ProductCardPrice>
        {priceFormat(
          product.value
            ? product.value :
              product.values?.[valueOptions[selectedCategory.link]?.[selectedOption]]
              ?? product.values?.[valueOptions[selectedCategory.link]?.first]
        )}
      </ProductCardPrice>
      <img src={
        Array.isArray(product.image)
          ? selectedCategory?.link === "/combos" ?
              product.image[1] :
              product.image[0] :
            product.image as string
      } alt={product.title} />
    </ProductCard>
  )
}
