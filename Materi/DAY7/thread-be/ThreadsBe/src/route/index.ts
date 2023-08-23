import * as express from 'express';
import ThreadsController from '../controllers/ThreadsController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/auth';
import ReplyController from '../controllers/ReplyController';
import LikeController from '../controllers/LikeController';
import { upload } from '../middlewares/upload';
import QueueController from '../controllers/QueueController';
import FollowController from '../controllers/FollowController';
import UserConntroller from '../controllers/UserConntroller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello World! from V1');
});
//thread
router.get("/thread", authenticate ,ThreadsController.find)
router.get("/thread/:id", authenticate , ThreadsController.findOne)
// router.post("/thread/create",  authenticate , upload("image") ,ThreadsController.create)
router.post("/thread",  authenticate , upload("image") ,QueueController.enqueue)
router.delete("/thread/delete/:id", ThreadsController.delete)
router.patch("/thread/update/:id", ThreadsController.update)

//replies
router.get("/reply", authenticate , ReplyController.find)
router.get("/replies", authenticate , ReplyController.findOne)
router.post("/reply/create/:idThread", authenticate , ReplyController.create);

//replies
router.get("/like", LikeController.find)
router.get("/like/:threadId", LikeController.findOne)
router.post("/like", authenticate , LikeController.create);

//Auth
router.post("/auth/register" , upload("picture")  , AuthController.register)
router.post("/auth/login" , AuthController.login )
router.get("/auth/check" , authenticate ,AuthController.check )


//follow
router.get("/followers", authenticate , FollowController.findOne)
router.get("/followings", authenticate , FollowController.findOnefindOneUserLogin)
router.post("/follow/:idUser" , authenticate , FollowController.create)

//user
router.get("/users",  authenticate , UserConntroller.find)
router.get("/user", authenticate , UserConntroller.findUser)
router.get('/random-users', authenticate , UserConntroller.getRandomUsers);
router.get("/search-users", authenticate , UserConntroller.findUsersByUsernameOrFullname);
router.patch("/update-user", authenticate , upload("picture") , UserConntroller.updateUser);





export default router;



