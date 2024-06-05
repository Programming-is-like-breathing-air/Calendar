// Backend: server.js

const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/Event');
const eventsRouter = require('./routes/events');

const ObjectId = require('mongodb').ObjectId;


const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/calendar');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to database');

});

// Use routes
app.use('/events', eventsRouter);


app.use('/events/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      console.log("Event ID:", eventId)
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
// Route for root path
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// // 创建 Express 应用
// const app = express();
// const PORT = process.env.PORT || 5000;

// // 创建 PrismaClient 实例
// const prisma = new PrismaClient();

// // 中间件：解析 JSON 请求体
// app.use(express.json());

// // 初始化函数，用于验证数据库连接
// async function initialize() {
//   try {
//     // 尝试连接数据库
//     await prisma.$connect();
//     console.log('Database connection established successfully.');

//     // 执行一些简单的数据库操作来验证连接
//     const events = await prisma.event.findMany();
//     console.log('Fetched events:', events);
//   } catch (error) {
//     console.error('Error connecting to database:', error);
//     process.exit(1); // 连接失败时退出应用
//   }
// }

// // 调用初始化函数
// initialize();

// // 获取所有事件
// app.get('/events', async (req, res) => {
//   try {
//     const events = await prisma.event.findMany();
//     res.json(events);
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 创建事件
// app.post('/events', async (req, res) => {
//   const { title, start, end, allDay } = req.body;
//   try {
//     const newEvent = await prisma.event.create({
//       data: {
//         title,
//         start,
//         end,
//         allDay,
//       },
//     });
//     res.status(201).json(newEvent);
//   } catch (error) {
//     console.error('Error creating event:', error);
//     res.status(400).json({ error: 'Failed to create event' });
//   }
// });

// // 获取单个事件
// app.get('/events/:id', async (req, res) => {
//   const eventId = req.params.id;
//   try {
//     const event = await prisma.event.findUnique({
//       where: {
//         id: parseInt(eventId),
//       },
//     });
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     console.error('Error fetching event:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // 删除事件
// app.delete('/events/:id', async (req, res) => {
//   const eventId = req.params.id;
//   try {
//     await prisma.event.delete({
//       where: {
//         id: parseInt(eventId),
//       },
//     });
//     res.json({ message: 'Event deleted' });
//   } catch (error) {
//     console.error('Error deleting event:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route for root path
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server!');
// });

// // Start server
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
