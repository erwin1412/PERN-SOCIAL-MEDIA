import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

import { User } from "../entities/User";
import { loginSchema, registerSchema } from "../utils/validators/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response) {
    try {
      const filename = res.locals.filename;
      const data = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        picture: filename,
      };
      const { error, value } = registerSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }
      const password = bcrypt.hash(value.password, 10);
      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email,
          username: value.username,
        },
      });
      if (checkEmail > 0) {
        return res.status(400).json("Error Email / username sudah ada");
      }
      const user = this.authRepository.create({
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
        picture: filename,
      });
      this.authRepository.save(user);
      return res.status(200).json(`Data Berhasil di buat`);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error, value } = loginSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
          username: value.username,
        },
        select: ["id", "fullname", "username", "email", "password"],
      });

      if (!checkEmail) {
        return res.status(400).json("Error Email / password is wrong");
      }

      const isPasswordValid = bcrypt.compare(
        value.password,
        checkEmail.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          error: "Email/passwrod is wrong!",
        });
      }
      const user = this.authRepository.create({
        id: checkEmail.id,
        fullname: checkEmail.fullname,
        username: checkEmail.username,
        email: checkEmail.email,
      });
      const token = jwt.sign({ user }, "bagiansecret", { expiresIn: "24h" });

      return res.status(200).json({
        user: user,
        token,
      });
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        select: ["id", "fullname", "username", "email", "password"],
      });

      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }
}
export default new AuthService();
