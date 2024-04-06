import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventComponent({ isCreatingTask, setIsCreatingTask }) {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [newEventTitle, setNewEventTitle] = useState(''); // Add this line
    const [newEventDescription, setNewEventDescription] = useState(''); // Add this line

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/search', {
                params: { title }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const filterEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/filter', {
                params: { eventType }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error filtering events: ', error);
        }
    };

    const handleCreateTaskClick = () => {
        setIsCreatingTask(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the form submission, e.g. by making a POST request to the backend.
        console.log('Form submitted');
        setIsCreatingTask(false);
    };

    return (
        <div>
            {isCreatingTask ? (
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Event title"
                        value={newEventTitle}
                        onChange={e => setNewEventTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Event description"
                        value={newEventDescription}
                        onChange={e => setNewEventDescription(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <button onClick={handleCreateTaskClick}>Create new task</button>
            )}

            {events.map((event, index) => (
                <div key={index}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    {/* Render other event properties here */}
                </div>
            ))}
        </div>
    );
}

export default EventComponent;