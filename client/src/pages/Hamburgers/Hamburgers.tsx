import { useEffect, useRef, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "./Hamburgers.style";
import {
  ProductCardContent,
  ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";
import { ApiService } from "../../services/api.service";
import { ButtonGroup } from "../../components/Button/Button.style";

interface Category {
  text: string;
  link: string;
}

interface Product {
  image: Array<string> | string;
  title: string;
  description: string;
  values?: Record<string, number>;
  value?: number;
}

const valueOptions = {
  "/appetizers": {
    first: "small",
    second: "large",
  },
  "/hamburgers": {
    first: "single",
    second: "combo"
  },
  "/combos": {
    first: "single",
    second: "combo"
  },
};

export default function Hamburgers() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedOption, setSelectedOption] = useState<"first" | "second">("first");

  const apiService = useRef(new ApiService());

  const fetchProducts = async (categoryLink: string) => {
    const response = await apiService.current.request<Product[]>(categoryLink);
    setProducts(response as Product[]);
  }

  const priceFormat = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiService.current.request<Category[]>("/categories");
      const categories = response as Category[]
      setCategories(categories);

      const hamburgerCategory = categories.find(category => category.link === "/hamburgers");
      fetchProducts(hamburgerCategory!.link);
      setSelectedCategory(hamburgerCategory);
    }

    fetchCategories();
  }, []);

  const handleCategorySelectedClick = (selectedCategory: Category) => {
    if (selectedCategory.link === "/combos") {
      fetchProducts("/hamburgers");
      setSelectedOption("second");
    } else {
      fetchProducts(selectedCategory.link);
      setSelectedOption("first");
    }
    setSelectedCategory(selectedCategory);
  }

  const onFirstOptionClick = () => {
    setSelectedOption("first");
  }

  const onSecondOptionClick = () => {
    setSelectedOption("second");
  }

  return (
    <Layout>
      <h1>{selectedCategory?.text}</h1>
      <ProductCategories>
        {categories.map((item, index) => (
          <CategoryList key={index} data={item} onClick={handleCategorySelectedClick} />
        ))}
      </ProductCategories>
      <ProductWrapper>
        {products ? products.map((product, index) => (
          <ProductCard key={index}>
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
              <Button onClick={() => {}}>Adicionar</Button>
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
        )) : <p>Carregando...</p>}
      </ProductWrapper>
    </Layout>
  );
}
