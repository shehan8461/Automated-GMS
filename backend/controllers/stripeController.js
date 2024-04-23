require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = {
  // !Not Needed
  // add new card
  addNewCard: async (req, res) => {
    const {
      stripeCustomerId,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;
    //
    try {
      const card_token = await stripe.tokens.create({
        card: {
          name: card_Name,
          number: card_Number,
          exp_month: card_ExpMonth,
          exp_year: card_ExpYear,
          cvc: card_CVC,
        },
      });
      console.log("🧪🧪🧪 Card Token: " + card_token);

      const card = await stripe.customers.createSource(stripeCustomerId, {
        source: `${card_token.id}`,
      });

      res.status(200).json({
        success: true,
        card,
        message: "Card added successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // payment intent
  createPaymentIntent: async (req, res) => {
    try {
      const { amount, stripeCustomerId, cardNumber } = req.body;

      const cards = [
        {
          cardNumber: "4242",
          cardName: "Visa",
          cardType: "pm_card_visa",
        },
        {
          cardNumber: "4000",
          cardName: "Visa Debit",
          cardType: "pm_card_visa_debit",
        },
        {
          cardNumber: "5555",
          cardName: "Mastercard",
          cardType: "pm_card_mastercard",
        },
        {
          cardNumber: "5200",
          cardName: "Mastercard Debit",
          cardType: "pm_card_mastercard_debit",
        },
      ];

      let payment_method = cards.find((card) =>
        cardNumber.startsWith(card.cardNumber)
      ).cardType;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "lkr",
        customer: stripeCustomerId,
        payment_method: payment_method,
        confirm: true,
        payment_method_types: ["card"],
      });

      if (paymentIntent.status === "succeeded") {
        res.status(200).json({
          success: true,
          paymentIntent,
          message: "Payment successful",
        });
      } else {
        res.status(400).json({
          success: false,
          paymentIntent,
          message: "Payment failed",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // !Not Needed
  // get payment methods
  getPaymentMethods: async (req, res) => {
    try {
      const { stripeCustomerId } = req.body;

      const paymentMethods = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: "card",
      });

      res.status(200).json({
        success: true,
        paymentMethods,
        message: "Payment methods fetched successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = stripeController;
