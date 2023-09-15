import * as amqp from "amqplib";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

async function processUpdateUserQueue() {
  const queueName = "update-user-queue";
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    await channel.consume(queueName, async (message) => {
      if (message !== null) {
        try {
          const payload = JSON.parse(message.content.toString());
          let cloudinaryResponse: any;

          if (payload.picture) {
            cloudinaryResponse = await cloudinary.uploader.upload(
              "./uploads/" + payload.picture
            );
          }

          const user = AppDataSource.getRepository(User).create({
            fullname: payload.fullname ? payload.fullname : "",
            email: payload.email ? payload.email : "",
            username: payload.username ? payload.username : "",
            password: payload.password ? payload.password : "",
            description: payload.description ? payload.description : "",
            picture: payload.picture ? cloudinaryResponse.secure_url : "",
          });

          user.id =  payload.user_id ; // Assign user_id to users array

          const createdUser = await AppDataSource.getRepository(User).save(
            user
          );

          channel.ack(message);
        } catch (error) {
          console.log("Error processing update user queue: ", error);
        }
      }
    });
  } catch (error) {
    console.log("Error processing update user queue: ", error);
  }
}

AppDataSource.initialize().then(async () => {
  processUpdateUserQueue();
});
