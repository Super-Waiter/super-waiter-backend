import api from "api";
import { Request, Response } from "express";

const sdk = api("@payze/v2.0#1224ti2jl4nwdjaa");
const payzeSubscriptionSDK = api("@payze/v2.0#585kul8sj1mog");

const PAYZE_KEY = process.env.PAYZE_KEY;
const PAYZE_SECRET = process.env.PAYZE_SECRET;
const authorization = `${PAYZE_KEY}:${PAYZE_SECRET}`;

export const createProduct = async (_: Request, res: Response) => {
  try {
    const data = await sdk.postV2ApiProduct(
      {
        name: "Standart",
        description: "Monthly Standart Plan",
        imageUrl: "https://payze.io?imageId=12",
        price: "99000",
        currency: "UZS",
        occurrenceType: "Month",
        occurrenceNumber: "1",
        occurrenceDuration: "100",
        freeTrial: 7,
        numberOfFailedRetry: 3,
      },
      {
        authorization,
      }
    );

    return res.status(200).json({
      message: "Product created successfully",
      data: data.data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const data = await payzeSubscriptionSDK.postV2ApiSubscription(
      {
        productId: 1431,
        cardToken: "PAY123ZE...",
        hookUrl: "https://payze.io",
        email: "sardorbekaminjonov2001@gmail.com",
        phone: "+998911087176",
        callback: "https://payze.io",
        callbackError: "https://payze.io/error",
        sendEmails: true,
      },
      {
        authorization,
      }
    );

    return res.status(200).json({
      message: "Subscription created successfully",
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
};
