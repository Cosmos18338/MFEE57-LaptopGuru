import express from 'express';
import cors from 'cors';

const router = express.Router();

const whiteList = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許傳遞資料"));
    }
  },
};

// 只針對這個路由使用 CORS
router.get('/checklogin', cors(corsOptions), (req, res) => {
  res.send('Login check');
});

export default router;
