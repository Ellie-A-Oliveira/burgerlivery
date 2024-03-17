import { CategoryListElement } from "./CategoryList.style";

interface CategoryListProps {
  data: {
    text: string;
    link: string;
  };
  onClick: (...args: any[]) => void;
}

export const CategoryList = ({ data, onClick }: CategoryListProps) => {
  const handleCategorySelectedClick = () => {
    onClick(data);
  }
  return <CategoryListElement onClick={handleCategorySelectedClick}>{data.text}</CategoryListElement>;
};
