import * as express from 'express';
import ThreadsController from '../controllers/ThreadsController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello World! from V1');
});

router.get("/thread", ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread/create", ThreadsController.create)
router.get("/thread/delete/:id", ThreadsController.delete)
router.patch("/thread/update/:id", ThreadsController.update)

export default router;



