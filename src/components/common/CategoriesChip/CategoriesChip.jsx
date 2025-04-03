import { Avatar, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import getCategoriesApi from "../../../utils/apis/auth/categories/getCategoriesApi";
import CategoriesSkeleton from "../../skeleton/CategoriesSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi/ErrorOnFetchApi";
import { Link } from "react-router-dom";

const CategoriesChip = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  return (
    <div className="mx-4 flex flex-wrap gap-4">
      {isPending && <CategoriesSkeleton />}

      {error && <ErrorOnFetchApi message={""} />}
      {data &&
        data?.data.map((category) => (
          <Link to={`/categories/${category?.id}`} key={category?.id}>
            <Chip
              sx={{ width: "12rem", height: "5rem" }}
              avatar={
                <Avatar
                  sx={{ width: "4rem !important", height: "4rem !important" }}
                  alt={`${category?.name} image`}
                  src={category?.image || null}
                />
              }
              label={category?.name}
              variant="outlined"
            />
          </Link>
        ))}
    </div>
  );
};

export default CategoriesChip;
