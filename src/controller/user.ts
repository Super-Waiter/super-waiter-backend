import { Request, Response } from "express";
// import { Room } from "../model/Room";
import { User } from "../model/User";
// import firebaseAdmin from "../firebase";

// const firebaseAuth = firebaseAdmin.auth();

export const createUser = async (req: Request, res: Response) => {
  try {
    User.options.freezeTableName = true;

    const existingUser = await User.findOne({
      where: { phone: req.body.phone },
    });

    if (existingUser) {
      return res.status(400).json({
        message: {
          en: "User already exists",
          ru: "Пользователь уже существует",
          uz: "Foydalanuvchi allaqachon mavjud",
        },
      });
    }

    const user = await User.create(req.body);
    res.status(200).json({ msg: "Success", user });
  } catch (error) {
    res.status(400).json({ msg: "Error", error });
    console.log(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    User.options.freezeTableName = true;

    const user = await User.findByPk(req.params.id, {
      include: [{ model: User, as: "rooms" }],
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    // User.options.freezeTableName = true;

    const user = await User.update(
      { ...req.body },
      {
        where: { id: req.body.id },
      }
    );

    res.status(200).json({ msg: "Success", user });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const updateUserByPhoneNumber = async (req: Request, res: Response) => {
  try {
    User.options.freezeTableName = true;

    const user = await User.update(req.body, {
      where: { phone: req.body.phone },
    });

    res.status(200).json({ msg: "Success", user });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ include: [User] });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const getUserByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { phone: req.params.phone },
      include: [User],
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};

export const removeUserById = async (req: Request, res: Response) => {
  try {
    // const user = await User.findByPk(req.params.id);
    await User.destroy({ where: { id: req.params.id } });
    await User.destroy({ where: { userId: req.params.id } });

    // if (user) {
    //   const firebaseUser = await firebaseAuth.getUserByPhoneNumber(user.phone);

    //   await firebaseAuth.deleteUser(firebaseUser.uid);
    // }

    res.status(200).json({ msg: "Success", user: req.params.id });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log(error);
  }
};
