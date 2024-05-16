import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../store/useProductStore";
import { useProductData } from "../../hooks/useProductData";
import { BootstrapModal } from "../../components";
import ProductAPI from "../../api/ProductAPI";
import Toast from "../../utils/toast";
import { useState } from "react";
import { handleUpload } from "../../utils/HandleUploadOrder";

const AddProductModal = () => {
  // Get the state and actions from the store
  const { isAddProductModalOpen, closeAddProductModal } = useProductStore(
    (state) => ({
      isAddProductModalOpen: state.isAddProductModalOpen,
      closeAddProductModal: state.closeAddProductModal,
    })
  );

  // Get refetch function from react-query hook
  const { refetch } = useProductData();

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
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

  // Create mutation
  const { mutate } = useMutation(ProductAPI.create, {
    onSuccess: () => {
      // reset the percent and image state
      setPercent(0);
      setImage("");
      // close the modal and refetch the data
      closeAddProductModal();
      refetch();
      Toast({ type: "success", message: "Product created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    values.image = image;

    // covert the price and stock to number
    values.price = Number(values.price);
    values.countInStock = Number(values.countInStock);

    console.log(values);
    mutate(values);
    reset();
    // reset the percent and image state
    setPercent(0);
    setImage("");
  };

  // categories
  const categories = [
    "handloom saree",
    "handloom sarong",
    "handloom shirt",
    "soft toys",
  ];

  return (
    <BootstrapModal
      show={isAddProductModalOpen}
      handleClose={closeAddProductModal}
      title="Add Product"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="description">
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

        <div className="form-group">
          <label className="my-2" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload image"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!file || percent === 100}
            // add suitable color to the button
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
          <div className="col-md-6">
            <label className="my-2" htmlFor="brand">
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

          {/* category select dropdown */}
          <div className="col-md-6">
            <label className="my-2" htmlFor="category">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              {...register("category", { required: true })}
            >
              <option value="">Select category</option>
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
          <div className="col-md-6">
            <label className="my-2" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              pattern="^\d*(\.\d{0,2})?$"
              {...register("price", {
                required: true,
                pattern: /^\d*(\.\d{0,2})?$/,
              })}
              title="Please enter a valid price (optionally up to two decimal places)."
            />
            {errors.price && (
              <small className="form-text text-danger">
                Price is required and must be a valid number with up to two
                decimal places.
              </small>
            )}
          </div>

          <div className="col-md-6">
            <label className="my-2" htmlFor="countInStock">
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddProductModal;
