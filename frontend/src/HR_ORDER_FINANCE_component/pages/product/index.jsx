import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useProductStore } from "../../store/useProductStore";
import { useProductData } from "../../hooks/useProductData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import ProductAPI from "../../api/ProductAPI";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";

const index = () => {
  // Get the state and actions from the store
  const { openAddProductModal, openEditProductModal, setSelectedProduct } =
    useProductStore((state) => ({
      openAddProductModal: state.openAddProductModal,
      openEditProductModal: state.openEditProductModal,
      setSelectedProduct: state.setSelectedProduct,
    }));

  // Get the data from the react-query hook
  const { data, refetch } = useProductData();

  // Delete mutation
  const { mutate } = useMutation(ProductAPI.delete, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Product deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Edit function
  const handleEdit = (product) => {
    setSelectedProduct(product);
    openEditProductModal();
  };

  // PDF report function
  const downloadPDF = () => {
    // Calclating the total products
    const products = data.data.products;
    // make colors comma separated
    products.forEach((product) => {
      product.colors = product.colors.join(", ");
      product.sizes = product.sizes.join(", ");
      product.materials = product.materials.join(", ");
    });
    const productCount = products.length;
    //
    const additionalInfo = `Total Products: ${productCount}`;
    //
    generatePDF(
      additionalInfo,
      [
        "name",
        "brand",
        "category",
        "price",
        "countInStock",
        "colors",
        "sizes",
        "materials",
      ],
      data.data.products,
      "products-report"
    );
  };

  return (
    <div className="container mt-2">
      <AddProductModal />
      <EditProductModal />

      <h1 className="mb-4">Products</h1>

      <Button variant="primary" className="m-1" onClick={openAddProductModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Product</span>
      </Button>

      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      <div className="mt-5">
        <BootstrapTable
          headers={[
            "Image",
            "Name",
            "Brand",
            "Category",
            "Price",
            "Stock",
            "Actions",
          ]}
          children={
            data &&
            data.data.products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                {/* <td>{product.description}</td> */}
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(product._id)}
                    size="sm"
                  >
                    <AiTwotoneDelete className="mb-1 mx-1" />
                    <span>Delete</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    onClick={() => handleEdit(product)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                    <span>Edit</span>
                  </Button>
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
