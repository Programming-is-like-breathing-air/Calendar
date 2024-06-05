// Backend: routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');



router.get('/', async (req, res) => {
  try {
    
    const events = await Event.find();
    res.json(events); 
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' }); 
  }
});

module.exports = router;


// Create new event
// Helper function to convert ObjectId to string in an event object
function convertEventToString(event) {
    return {
      ...event.toJSON(),
      _id: event._id.toString()
    };
  }
  
  // Create new event
  router.post('/', async (req, res) => {
   
    const end = new Date(req.body.end);
    end.setDate(end.getDate() - 1);
    
  
    const event = new Event({
      title: req.body.title,
      start: req.body.start,
      end: end.toISOString(), 
      allDay: req.body.allDay
    });
  
    try {
      const newEvent = await event.save();
      const eventString = convertEventToString(newEvent);
      res.status(201).json(eventString);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

// Delete event
router.delete('/:id', async (req, res) => {
    try {
    
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted' }); 
    } catch (err) {
      console.error('Error deleting event:', err);
      res.status(500).json({ error: 'Failed to delete event' }); 
    }
  });
  
  module.exports = router;
  
