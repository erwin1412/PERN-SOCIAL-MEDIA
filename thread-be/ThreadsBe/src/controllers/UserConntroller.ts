import { Request,Response } from "express";
import UserService from "../services/UserService";

class AuthController {
    find(req:Request , res:Response){
        UserService.find(req,res)
    }  

    findUser(req:Request , res:Response){
        UserService.findUser(req,res)
    }  

    getRandomUsers(req:Request , res:Response){
        UserService.getRandomUsers(req,res)
    }  

    findUsersByUsernameOrFullname(req:Request , res:Response){
        UserService.findUsersByUsernameOrFullname(req,res)
    }  

    updateUser(req:Request , res:Response){
        UserService.updateUser(req,res)
    }  

}
export default new AuthController()