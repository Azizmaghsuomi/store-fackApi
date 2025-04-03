import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getProductsApi from "../../../utils/apis/products/getProductsApi";
import ProdctsGridSkeleton from "../../skeleton/ProdctsGridSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi/ErrorOnFetchApi";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

const ProductGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const total = 200; // backend in response should provide total page, items...
  const { isPending, error, data } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProductsApi((currentPage - 1) * limit, limit),
  });
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-8 my-8">
      {isPending &&
        Array.from("123456789").map((i) => <ProdctsGridSkeleton key={i} />)}
      {error && <ErrorOnFetchApi />}
      {data &&
        data?.data?.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="rounded-xl flex flex-col  shadow-lg gap-4 items-center justify-center pb-4 w-5/12 lg:w-3/12 hover:scale-95 transition"
          >
            <img
              src={product?.images[0]}
              className="rounded-t-xl w-[100%] h-[15rem] "
            />
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </Link>
        ))}
      {data && (
        <div className="my-8">
          <Pagination
            onChange={(event, value) => setCurrentPage(value)}
            size="large"
            count={Math.ceil(total / limit)}
            defaultPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGridWithPagination;
