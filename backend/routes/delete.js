// Backend: routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


// GET /events 路由，用于获取所有事件数据
router.get('/', async (req, res) => {
  try {
    // 查询数据库获取所有事件
    const events = await Event.find();
    res.json(events); // 将事件数据以 JSON 格式发送回客户端
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' }); // 发送错误状态码和错误信息给客户端
  }
});

module.exports = router;

// Delete event
router.delete('/:id', async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).send("Event not found");
      }
      res.send(deletedEvent);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
