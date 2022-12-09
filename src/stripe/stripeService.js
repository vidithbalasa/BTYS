// import { useContext } from "react";
// import stripeContext from "./stripeContext";
// import Stripe from "stripe";

// // This is a service that will be used to interact with the Stripe API
// export default class StripeService {
//     // Create one-time price in stripe
//     async createPrice (price, product_name) {
//         const priceData = {
//             'currenct': 'usd',
//             'unit_amount': price,
//             'product': product_name
//         }
//         const response = await stripe.prices.create(priceData);
//         // Get the price_id from the response
//         const price_id = response.id;
//     }
// }