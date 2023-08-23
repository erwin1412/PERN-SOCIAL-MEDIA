import { Request,Response } from "express";
import FollowService from "../services/FollowService";
class FollowController {

    findOne(req:Request , res:Response){
        FollowService.findOne(req,res)
    }  

    findOnefindOneUserLogin(req:Request , res:Response){
        FollowService.findOneUserLogin(req,res)
    }  

    create(req:Request , res:Response){
        FollowService.create(req,res)
    }  


}
export default new FollowController()