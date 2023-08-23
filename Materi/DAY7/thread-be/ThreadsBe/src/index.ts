import { AppDataSource } from "./data-source";
import * as express from 'express';
import router from "./route";
import * as cors from 'cors'
// import {processQueue} from './queues/worker'
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;
    // processQueue();
    
    app.use(cors({
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
      // origin: ["http://localhost:5173/"],
      // allowedHeaders
    }))
    
    app.use(express.json());
    app.use("/api/v1", router);
    // app.use("/uploads",express.static("uploads"))
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
