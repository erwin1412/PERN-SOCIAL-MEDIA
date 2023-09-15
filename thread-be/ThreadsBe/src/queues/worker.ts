import * as amqp from "amqplib";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { Threads } from "../entities/Thread";

async function processQueue() {
  const queueName = "thread-queue";
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("queueName");

    // Callback -> (()=> { })
    await channel.consume(queueName, async (message) => {
      if (message !== null) {
        try {
          const payload = JSON.parse(message.content.toString());
          let cloudinaryResponse : any;
          //taruh sini
          if (payload.image) {
            cloudinaryResponse = await cloudinary.uploader.upload(
              "./uploads/" + payload.image
            );
            console.log("testing" , cloudinaryResponse.secure_url);
          }
          const thread = AppDataSource.getRepository(Threads).create({
            content: payload.content ? payload.content : "",
            image:  payload.image ? cloudinaryResponse.secure_url  : "",
            user: {
              id: payload.user_id,
            },
          });
          
          // console.log("Received Message : ", payload);
          // console.log("masuk siniga 3");
          const createdThread = await AppDataSource.getRepository(Threads).save(
            thread
          );

          //kasih tau kalau sudah selesai kirim data
          channel.ack(message);
        } catch (error) {
          console.log("Error hehehe ", error);
        }
      }
    });
  } catch (error) {
    console.log("Error Processing Queue : ", error);
  }
}
// export { processQueue };
AppDataSource.initialize().then(async () => {
  processQueue();
});
