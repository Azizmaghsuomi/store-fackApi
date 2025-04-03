import CategoriesChip from "../../components/common/CategoriesChip/CategoriesChip";
import Header from "../../components/common/Header";
import ProductGridWithPagination from "../../components/common/ProductGridWithPagination/ProductGridWithPagination";

const root = () => {
  return (
    <>
      <Header />
      <CategoriesChip />
      <ProductGridWithPagination />
    </>
  );
};

export default root;
