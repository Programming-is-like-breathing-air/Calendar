"use client"
import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import dayMaxEventsPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function MyCalendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        if (response.status === 200) {
          setEvents(response.data);
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    const title = window.prompt('Please enter event title:');
    const calendarApi = (calendarRef.current as any)?.getApi();

    if (title && calendarApi) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: true
      });

      axios.post("/events", {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      })
        .then(response => {
          console.log("Event created:", response.data);

          setEvents(prevEvents => [...prevEvents, response.data]);
        })
        .catch(error => {
          console.error("Error creating event:", error);
        });
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();

      const eventId = clickInfo.event.id;

      console.log("Event ID:", eventId)

      axios.delete(`/events/${clickInfo.event.id}`)
        .then(response => {
          console.log("Event deleted:", response.data);

          setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        })
        .catch(error => {
          console.error("Error deleting event:", error);
        });
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const nextMonth = new Date(prevDate);
      nextMonth.setMonth(prevDate.getMonth() + 1);
      return nextMonth;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const prevMonth = new Date(prevDate);
      prevMonth.setMonth(prevDate.getMonth() - 1);
      return prevMonth;
    });
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, dayMaxEventsPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        eventDisplay="block"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
        }}
        weekends={true}
        editable={true}
        dayMaxEvents={1} 
        initialDate={currentDate}
      />
    </div>
  );
}

export default MyCalendar;
