import { Request, Response } from "express";
import { Organisation } from "../model/Organisation";
import { Organisation as OrganisationType, User as UserType } from "../types";
import { User } from "../model/User";

export const createOrganisation = async (req: Request, res: Response) => {
  try {
    const { user, organisation } = req.body;

    const existingUserEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUserEmail) {
      return res.status(400).json({
        message: {
          en: "User already exists with this email",
          ru: "Пользователь уже существует с этим электронным адресом",
          uz: "Foydalanuvchi allaqachon mavjud bu elektron pochta bilan",
        },
      });
    }
    const userToSave: UserType = { ...user, organisation: organisation.id };
    const newUser = new User(userToSave);

    const organisationToSave: OrganisationType = {
      ...organisation,
      owner: newUser.id,
    };

    const newOrganisation = new Organisation(organisationToSave);
    newUser.organisation = newOrganisation.id;

    await newUser.save();
    await newOrganisation.save();

    return res.status(201).json({ organisation, user });
  } catch (error) {
    res.status(500).json({ msg: "error" });
    console.log(error);
  }
};

export const getOrganisations = async (req: Request, res: Response) => {
  try {
    const organisations = await Organisation.findAll();

    res.status(200).json(organisations);
  } catch (error) {
    res.status(400).json({ msg: "error" });

    console.log(error);
  }
};

export const getOrganisationById = async (req: Request, res: Response) => {
  try {
    const organisation = await Organisation.findByPk(req.params.id);

    res.status(200).json(organisation);
  } catch (error) {
    res.status(400).json({ msg: "error" });

    console.log(error);
  }
};

export const updateOrganisation = async (req: Request, res: Response) => {
  try {
    const organisation = await Organisation.findByPk(req.params.id);

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation not found" });
    }

    await organisation.update(req.body);

    res.status(200).json(organisation);
  } catch (error) {
    res.status;
  }
};

export const deleteOrganisation = async (req: Request, res: Response) => {
  try {
    const organisation = await Organisation.findByPk(req.params.id);

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation not found" });
    }

    await organisation.destroy();

    res.status(200).json({ msg: "Organisation deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: "error" });

    console.log(error);
  }
};
