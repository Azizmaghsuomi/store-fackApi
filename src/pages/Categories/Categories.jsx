import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import getcategoryByIdApi from "../../utils/apis/auth/categories/getcategoryByIdApi";
import Header from "../../components/common/Header";
import CategoryByIdSkeleton from "../../components/skeleton/CategoryByIdSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi/ErrorOnFetchApi";
import ProdctsByCategoryGrid from "../../components/common/ProdctsByCategoryGrid/ProdctsByCategoryGrid";

const Categories = () => {
  const { id } = useParams() || "";
  const { isPending, error, data } = useQuery({
    queryKey: ["categoriesById"],
    queryFn: () => getcategoryByIdApi(id),
  });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-2">
        {isPending && <CategoryByIdSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <>
            <img
              src={data?.data?.image}
              className="w-[8rem] h-[8rem] rounded-full "
              alt={data?.data?.name}
            />
            <p className="font-bold">{data?.data?.name}</p>
          </>
        )}
      </div>
      <div className="mt-16">{<ProdctsByCategoryGrid id={id} />}</div>
    </>
  );
};

export default Categories;
