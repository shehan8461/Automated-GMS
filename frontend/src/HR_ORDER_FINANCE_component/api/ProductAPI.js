import api from "./api";

class ProductAPI {
  // Create Product
  static create(values) {
    return api.post("/api/products", values);
  }

  // Get all Products
  static getAll() {
    return api.get("/api/products");
  }

  // Get Product by id
  static getById(id) {
    return api.get(`/api/products/${id}`);
  }

  // Update Product
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/products/${id}`, data);
  }

  // Delete Product
  static delete(id) {
    return api.delete(`/api/products/${id}`);
  }

  // Get Products Count
  static getCount() {
    return api.get("/api/products/count");
  }
}

export default ProductAPI;
