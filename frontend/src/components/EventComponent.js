import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventComponent({ isCreatingTask, setIsCreatingTask }) {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/search`, {
                params: { title }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const filterEvents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/filter`, {
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, {
                title: newEventTitle,
                description: newEventDescription
            });
            console.log('Event created: ', response.data);
            setIsCreatingTask(false);
            setNewEventTitle('');
            setNewEventDescription('');
            fetchEvents();
        } catch (error) {
            console.error('Error creating event: ', error);
        }
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
                </div>
            ))}
        </div>
    );
}

export default EventComponent;