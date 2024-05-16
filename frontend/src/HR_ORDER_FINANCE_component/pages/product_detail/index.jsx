import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProductData";

const index = () => {
  const { id } = useParams();
  const { data: product } = useProduct(id);
  //
  return (
    <>
      <NavBar />
      <ProductDetailPage product={product?.data?.product} />
    </>
  );
};

export default index;
