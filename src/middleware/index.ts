import { Application, json, urlencoded } from "express";
import userRoute from "../route/user";
import itemRoute from "../route/room";

export const useMiddlewares = (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use("/api/user", userRoute);
  app.use("/api/room", itemRoute);

  app.get("/", (req, res) => {
    res.send("Hello World from Express testing. Yup, it works!");
  });
};
