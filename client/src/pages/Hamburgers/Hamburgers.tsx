import { useEffect, useRef, useState } from "react";
import { CategoryList, Layout } from "../../components";
import { ProductCategories, ProductWrapper } from "./Hamburgers.style";
import { ApiService } from "../../services/api.service";
import Product from "../../components/Product/Product";
import { priceFormat } from "../../helper/priceFormat";

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

  const apiService = useRef(new ApiService());

  const fetchProducts = async (categoryLink: string) => {
    const response = await apiService.current.request<Product[]>(categoryLink);
    setProducts(response as Product[]);
  }

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
    } else {
      fetchProducts(selectedCategory.link);
    }
    setSelectedCategory(selectedCategory);
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
          <Product
            selectedCategory={selectedCategory}
            priceFormat={priceFormat}
            product={product}
            valueOptions={valueOptions}
            key={index}
          />
        )) : <p>Carregando...</p>}
      </ProductWrapper>
    </Layout>
  );
}
