import { Application, json, urlencoded } from "express";
import cors from "cors";
import userRoute from "../route/user";
import itemRoute from "../route/room";
import organisationRoute from "../route/organisation";
import paymentRoute from "../route/payment";

export const useMiddlewares = (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api/user", userRoute);
  app.use("/api/room", itemRoute);
  app.use("/api/payze", paymentRoute);
  app.use("/api/organisation", organisationRoute);

  app.get("/", (req, res) => {
    res.send("Hello World from Express testing. Yup, it works!");
  });
};
