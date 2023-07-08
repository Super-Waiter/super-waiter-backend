import { Application, json } from "express";

export const useMiddlewares = (app: Application) => {
  app.use(json());
};
