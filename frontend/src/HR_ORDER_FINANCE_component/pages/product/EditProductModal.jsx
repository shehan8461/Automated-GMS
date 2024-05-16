import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useProductStore } from "../../store/useProductStore";
import { useProductData } from "../../hooks/useProductData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import ProductAPI from "../../api/ProductAPI";
import { handleUpload } from "../../utils/HandleUpload";

const EditProductModal = () => {
  // Get the state and actions from the store
  const { isEditProductModalOpen, closeEditProductModal, selectedProduct } =
    useProductStore((state) => ({
      isEditProductModalOpen: state.isEditProductModalOpen,
      closeEditProductModal: state.closeEditProductModal,
      selectedProduct: state.selectedProduct,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useProductData();

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Handle image upload
  const handleImageUpload = (e) => {
    // const file = e.target.files[0];
    setFile(file);
    handleUpload({ file, setPercent, setImage });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Update mutation
  const { mutate } = useMutation(ProductAPI.update, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditProductModal();
      Toast({ type: "success", message: "Product updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedProduct._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedProduct changes
    if (selectedProduct) {
      setValue("name", selectedProduct.name);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("countInStock", selectedProduct.countInStock);
      setValue("sizes", selectedProduct.sizes);
      setValue("colors", selectedProduct.colors);
      setValue("materials", selectedProduct.materials);
    }
  }, [selectedProduct, setValue]);

  // categories
  const categories = ["Handloom saree", "Handloom shirt", "Handloom sarong", "soft toys"];

  return (
    <BootstrapModal
      show={isEditProductModalOpen}
      handleClose={closeEditProductModal}
      title={`Edit: ${selectedProduct?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>

        {/* description */}
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Current Image
          </label>
          <br />
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            width="50"
            height="50"
          />
        </div>

        {/* image */}
        <div className="form-group mb-3">
          <label htmlFor="image">New Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload image"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!file || percent === 100}
            className="btn btn-outline-dark mt-2 btn-sm"
          >
            Upload
          </button>
          <div className="progress mt-2">
            <div
              className={`progress-bar bg-success ${
                percent < 100
                  ? "progress-bar-animated progress-bar-striped"
                  : ""
              }`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent < 100 ? `Uploading ${percent}%` : `Uploaded ${percent}%`}
            </div>
          </div>
        </div>

        {/* show in two columns */}
        <div className="row">
          {/* brand */}
          <div className="col-md-6 mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              {...register("brand", { required: true })}
            />
            {errors.brand && (
              <small className="form-text text-danger">Brand is required</small>
            )}
          </div>

          {/* category */}
          <div className="col-md-6 mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              {...register("category", { required: true })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <small className="form-text text-danger">
                Category is required
              </small>
            )}
          </div>
        </div>

        {/* price and stock */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <small className="form-text text-danger">Price is required</small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="countInStock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="countInStock"
              name="countInStock"
              {...register("countInStock", { required: true })}
            />
            {errors.countInStock && (
              <small className="form-text text-danger">Stock is required</small>
            )}
          </div>
        </div>

        {/* side by side to 3 columns */}
        {/* sizes checkboxes - size data should store in a array */}
        <div className="row">
          <div className="col-md-4">
            <label className="my-2">Sizes</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="S"
                id="sizeS"
                {...register("sizes")}
              />
              <label className="form-check-label" htmlFor="sizeS">
                S
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="M"
                id="sizeM"
                {...register("sizes")}
              />
              <label className="form-check-label" htmlFor="sizeM">
                M
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="L"
                id="sizeL"
                {...register("sizes")}
              />
              <label className="form-check-label" htmlFor="sizeL">
                L
              </label>
            </div>
          </div>

          {/* colors checkboxes - color data should store in a array */}
          <div className="col-md-4">
            <label className="my-2">Colors</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Red"
                id="colorRed"
                {...register("colors")}
              />
              <label className="form-check-label" htmlFor="colorRed">
                Red
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Blue"
                id="colorBlue"
                {...register("colors")}
              />
              <label className="form-check-label" htmlFor="colorBlue">
                Blue
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Green"
                id="colorGreen"
                {...register("colors")}
              />
              <label className="form-check-label" htmlFor="colorGreen">
                Green
              </label>
            </div>
          </div>

          {/* materials checkboxes - material data should store in a array */}
          <div className="col-md-4">
            <label className="my-2">Materials</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Cotton"
                id="materialCotton"
                {...register("materials")}
              />
              <label className="form-check-label" htmlFor="materialCotton">
                Cotton
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Polyester"
                id="materialPolyester"
                {...register("materials")}
              />
              <label className="form-check-label" htmlFor="materialPolyester">
                Polyester
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Silk"
                id="materialSilk"
                {...register("materials")}
              />
              <label className="form-check-label" htmlFor="materialSilk">
                Silk
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditProductModal;
