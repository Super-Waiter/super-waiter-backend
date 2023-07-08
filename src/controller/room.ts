import { Request, Response } from "express";
import { Room } from "../model/Room";
import { User } from "../model/User";
import { Op } from "sequelize";
import { ROOM_STATUS, Room as RoomType } from "../types";
import { ParsedQs } from "qs";

export const createFakeData = async (req: Request, res: Response) => {
  try {
    Array(30)
      .fill(null)
      .map((u, i) => {
        const newItem: RoomType = {
          name: `Room ${i}`,
          status: ROOM_STATUS.EMPTY,
        };

        Room.create(newItem);
      });

    return res.status(201).json("Done");
  } catch (error) {
    res.status(500).json({ msg: "error" });
    console.log(error);
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.create(req.body);

    return res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ msg: "error" });
    console.log(error);
  }
};

export const getRoomsBySearch = async (req: Request, res: Response) => {
  const { searchText } = req.query;

  try {
    const rooms = await Room.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${searchText}%`,
            },
          },
        ],
      },
      include: [{ model: User, as: "roomUser" }],
    });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ msg: "error" });

    console.log(error);
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByPk(req.params.id, {
      include: [{ model: User, as: "roomUser" }],
    });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ msg: "error" });

    console.log(error);
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const region = req.query?.region;
  const caseType = req.query.case;

  const whereQuery: {
    case?: string | ParsedQs | string[] | ParsedQs[];
    region?: string | ParsedQs | string[] | ParsedQs[];
  } = {};

  if (caseType && caseType !== "All") {
    whereQuery.case = caseType;
  }

  if (region && region !== "All") {
    whereQuery.region = region;
  }

  try {
    const result = await Room.findAndCountAll({
      where: whereQuery,
      limit,
      offset: page,
      include: [{ model: User, as: "roomUser" }],
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: "error" });
    console.log(error);
  }
};

export const getRoomsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const rooms = await Room.findAll({
      where: {
        userId,
      },
      include: [{ model: User, as: "roomUser" }],
    });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ msg: "error" });
    console.log(error);
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const removeItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    await room.destroy();

    res.status(200).json({ msg: "Item removed" });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};
