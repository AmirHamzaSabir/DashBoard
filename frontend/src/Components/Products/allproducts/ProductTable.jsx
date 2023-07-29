import React from "react";
import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/products/productSlice";
import Spinner from "../../Spinner/Spinner";

import Header from "./Header";
import UpdateorDel from "../../User/Userlist/UpdateorDel";
const ProductTable = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products?.length > 0) {
      const allProducts = products.map(product => ({
        ...product,
        action:<UpdateorDel />
      }))
      setData(allProducts);
    }
  }, [products]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        Cell: ({ row }) => {
          return (
            <img
              src={row.original.image}
              alt="Product"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: "NAME",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
      },
      {
        accessorKey: "price",
        header: "PRICE",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
      },
      {
        accessorKey: "description",
        header: "DESCRIPTION",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
      },
      {
        accessorKey: "color",
        header: "COLOR",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
        Cell: ({ row }) => (
          <div
            className="color-cell"
            style={{
              backgroundColor: row.original.color,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid black",
              padding: "1rem",
            }}
          ></div>
        ),
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
      },
    ],
    []
  );
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <Header stock={data.length} />
        {data?.length > 0 ? (
          <MaterialReactTable columns={columns} data={data} />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default ProductTable;
