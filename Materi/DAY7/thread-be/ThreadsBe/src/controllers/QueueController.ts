import { Request, Response } from "express-serve-static-core";
import * as amqp from "amqplib";
import { createdThreadSchema } from "../utils/validators/thread";
class QueueController {

async enqueue(req : Request , res:Response){

    try {
    console.log(req.body.content)
        const queueName = "thread-queue"
        const filename = res.locals.filename
        const data = {
          content : req.body.content,
          image: filename
        }
        const { error } = createdThreadSchema.validate(data);

        if (error) {
          return res.status(400).json({ error: error });
        } 

        const loginSession = res.locals.loginSession


    const payload = {
        content : req.body.content,
        image: filename,
        user_id: loginSession.user.id
    }


    const connection = await amqp.connect("amqp://localhost") 
        const channel = await connection.createChannel();

        //create queue
        //assertQueue buat ngecek ada gk data ny di server
        await channel.assertQueue(queueName)

        channel.sendToQueue(queueName , Buffer.from(JSON.stringify(payload)))

        // await channel.close()
        // await connection.close()

        res.status(200).json({
            message:"Thread is Queued"
        })

    } catch (error) {
        console.log("queuing nya error : " , error)
        res.status(200).json({
            message:"Thread is Error / Something wrong"
        })
    }


} 
}


export default new QueueController