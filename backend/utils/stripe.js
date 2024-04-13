import Stripe from "stripe";
import { Config } from "../config/index.js";

export const stripe = new Stripe(Config.STRIPE_API_KEY, {
	apiVersion: "2023-08-16",
});
