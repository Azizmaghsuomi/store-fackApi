import { useQuery } from "@tanstack/react-query";
import React from "react";
import getProductByCategoryApi from "../../../utils/apis/products/getProductByCategoryApi";
import ProdctsGridSkeleton from "../../skeleton/ProdctsGridSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi/ErrorOnFetchApi";
import { Link } from "react-router-dom";

const ProdctsByCategoryGrid = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsBycategory"],
    queryFn: () => getProductByCategoryApi(id),
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
    </div>
  );
};

export default ProdctsByCategoryGrid;
