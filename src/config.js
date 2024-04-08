import { config } from "dotenv";

config();

export const PORT = 3000;

export const MERCADOPAGO_KEY_TOKEN = process.env.MERCADOPAGO_KEY_TOKEN;

console.log(MERCADOPAGO_KEY_TOKEN);