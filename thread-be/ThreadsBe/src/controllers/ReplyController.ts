import { Request,Response } from "express";
import ReplyService from "../services/ReplyService";

class ReplyController {
    find(req:Request , res:Response){
        ReplyService.find(req,res)
    }  
    findOne(req:Request , res:Response){
        ReplyService.findOne(req,res)
    }  
    create(req:Request , res:Response){
        ReplyService.create(req,res)
    }  

}
export default new ReplyController()