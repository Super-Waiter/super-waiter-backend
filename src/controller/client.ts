import { Request, Response } from "express";
import { Client as ClientType } from "../types";
import { Client } from "../model/Client";

export const createClient = async (req: Request, res: Response) => {
  const client = req.body as ClientType;

  try {
    const checkClient = await Client.findAll({
      where: { id: client.id },
    });

    if (checkClient.length !== 0) throw Error("This room has already client!");

    const newClient = await Client.create(client);

    return res.status(201).json(newClient);
  } catch (error) {
    console.log(error);
  }
};

export const getClientById = async (req: Request, res: Response) => {
  const clientId = req.params.id as string;

  try {
    const client = await Client.findAll({
      where: { id: clientId },
    });

    if (client.length !== 0)
      throw Error("There is no any client with this ID!");

    return res.status(201).json(client);
  } catch (error) {
    console.log(error);
  }
};

export const deleteClientById = async (req: Request, res: Response) => {
  const clientId = req.params.id as string;

  try {
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    await client.destroy();
  } catch (error) {
    console.log(error);
  }
};
