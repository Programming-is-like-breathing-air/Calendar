const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: {},
    
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  },
  allDay: {
    type: Boolean,
    default: false
  }
});


eventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
