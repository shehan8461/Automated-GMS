import api from "./api";

class StripeAPI {
  // Add New Card
  static addNewCard(values) {
    return api.post("/api/stripe/add-new-card", values);
  }

  // Create Payment Intent
  static createPaymentIntent(values) {
    return api.post("/api/stripe/create-payment-intent", values);
  }

  // Get Payment Methods
  static getPaymentMethods() {
    return api.post("/api/stripe/get-payment-methods");
  }
}

export default StripeAPI;
