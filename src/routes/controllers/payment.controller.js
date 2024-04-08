import mercadopago from "mercadopago";
import { MERCADOPAGO_KEY_TOKEN } from "../../config.js";

export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: MERCADOPAGO_KEY_TOKEN,
    });

   const result = await mercadopago.preferences.create({
        items: [
            {
                title: "iphone",
                unit_price: 700.000,
                currency_id: "ARS",
                quantity: 1,
            }
        ],

        back_urls:{
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending',

        },
        notification_url: 'https://c43f-190-183-203-135.ngrok-free.app/webhook',
    })

    console.log(result);
    res.send(result.body)
}

export const receiveWebhook = async (req, res) => {
    try {
      const payment = req.query;
      console.log(payment);
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        console.log(data);
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };