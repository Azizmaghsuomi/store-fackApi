import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getProductById from "../../utils/apis/products/getProductById";
import Header from "../../components/common/Header";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi/ErrorOnFetchApi";

const Products = () => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const { id } = useParams() || "";
  const { isPending, error, data } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(id),
  });
  console.log(data);
  return (
    <>
      <Header />
      {isPending && <ProductSkeleton />}
      {error && <ErrorOnFetchApi />}
      {data && (
        <div className="flex items-center justify-center flex-col gap-4 px-16">
          <img
            className="w-[15rem] h-[15rem] rounded-xl"
            src={data?.data.images[activeImgIndex]}
          />
          <div className="flex gap-2 flex-wrap">
            {data?.data.images.map((i, index) => (
              <img
                className={`w-[5rem] h-[5rem] rounded-xl cursor-pointer border-4 shadow-lg ${
                  index == activeImgIndex
                    ? "border-blue-300"
                    : "border-transparent"
                }`}
                src={i}
                key={i}
                onClick={() => setActiveImgIndex(index)}
              />
            ))}
          </div>
          <p className="font-bold text-xl">{data?.data.title}</p>
          <p className=" text-xl">{data?.data.price}$</p>
          <p className="text-xl">{data?.data.description}</p>
        </div>
      )}
    </>
  );
};

export default Products;
