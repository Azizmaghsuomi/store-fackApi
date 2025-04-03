import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div className="bg-slate-400 animate-pulse w-[15rem] h-[15rem] rounded-xl"></div>
      <div className="flex gap-2 flex-wrap">
        <div className="bg-slate-400 animate-pulse w-[5rem] h-[5rem] rounded-xl"></div>
        <div className="bg-slate-400 animate-pulse w-[5rem] h-[5rem] rounded-xl"></div>
        <div className="bg-slate-400 animate-pulse w-[5rem] h-[5rem] rounded-xl"></div>
      </div>
      <div className="bg-slate-400 animate-pulse w-[5rem] h-[1.5rem] rounded-xl"></div>
      <div className="bg-slate-400 animate-pulse w-[5rem] h-[1.5rem] rounded-xl"></div>
      <div className="bg-slate-400 animate-pulse w-[15rem] h-[5rem] rounded-xl"></div>
    </div>
  );
};

export default ProductSkeleton;
