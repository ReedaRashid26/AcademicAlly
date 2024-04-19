// src/components/CalendarComponent.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../calendarStyles.css';  // Make sure the path is correct

const CalendarComponent = ({ events, eventClick }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={eventClick}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            contentHeight="auto"
            aspectRatio={1.35} // Adjust as needed for your design
            titleFormat={{ year: 'numeric', month: 'long' }}  // Format the title
        />
    );
};

export default CalendarComponent;
