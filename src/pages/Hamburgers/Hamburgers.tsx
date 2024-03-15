import { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "./Hamburgers.style";
import {
  ProductCardContent,
  ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";
import { ApiService } from "../../services/api.service";

interface Category {
  text: string;
  link: string;
}

interface Product {
  image: Array<string> | string;
  title: string;
  description: string;
  values: number | Record<string, number>
}

export default function Hamburgers() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const apiService = new ApiService();

  const priceFormat = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  useEffect(() => {
    if (categories.length) return;

    const fetchCategories = async () => {
      const response = await apiService.request<Category[]>("/categories");
      setCategories(response as Category[]);
    }

    return () => {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (products.length) return;

    const fetchCategories = async () => {
      const response = await apiService.request<Product[]>("/hamburgers");
      setProducts(response as Product[]);
    }

    return () => {
      fetchCategories();
    }
  }, []);

  return (
    <Layout>
      <h1>Hamburgers</h1>
      <ProductCategories>
        {categories.map((item, index) => (
          <CategoryList key={index} data={item} />
        ))}
      </ProductCategories>
      <ProductWrapper>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <ProductCardContent>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <Button onClick={() => {}}>Adicionar</Button>
            </ProductCardContent>
            <ProductCardPrice>
              {priceFormat(
                +product.values === +product.values
                  ? product.values :
                    product.values.single
              )}
            </ProductCardPrice>
            <img src={
              product.image.length
                ? product.image[0] :
                  product.image
            } alt={product.title} />
          </ProductCard>
        ))}
      </ProductWrapper>
    </Layout>
  );
}
