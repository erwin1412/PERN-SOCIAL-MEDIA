import { Request,Response } from "express";
import LikeService from "../services/LikesService";

class LikeController {
    find(req:Request , res:Response){
        LikeService.find(req,res)
    }  
    findOne(req:Request , res:Response){
        LikeService.findOne(req,res)
    }  
    create(req:Request , res:Response){
        LikeService.create(req,res)
    }  

}
export default new LikeController()