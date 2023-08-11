import * as express from 'express';
import ThreadsController from '../controllers/ThreadsController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello World! from V1');
});

router.get("/thread", authenticate ,ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread/create",  authenticate ,ThreadsController.create)
router.delete("/thread/delete/:id", ThreadsController.delete)
router.patch("/thread/update/:id", ThreadsController.update)

router.post("/auth/register" , AuthController.register)
router.post("/auth/login" , AuthController.login )
router.get("/auth/check" , authenticate ,AuthController.check )


export default router;



