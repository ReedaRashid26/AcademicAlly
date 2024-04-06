import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HomePage.css';
import EventComponent from './components/EventComponent'; // Import EventComponent

function HomePage() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [isCreatingTask, setIsCreatingTask] = useState(false); // Add this line

    const handleCreateTaskClick = () => { // Add this function
        setIsCreatingTask(true);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        return event.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter ? event.category === filter : true);
    });

    return (
        <div className="container">
            <h1>Home</h1>
            <button onClick={handleCreateTaskClick}>Create New Task</button> {/* Modify this line */}
            <div className="filter-container">
                <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
                <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>Filter</button>
                {showFilter && (
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="">All categories</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        {/* Add more options as needed */}
                    </select>
                )}
            </div>
            <div className="calendar">
                <Calendar />
            </div>
            <EventComponent isCreatingTask={isCreatingTask} setIsCreatingTask={setIsCreatingTask} /> {/* Add this line */}
            {filteredEvents.map(event => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    {/* Display other event properties as needed */}
                </div>
            ))}
        </div>
    );
}

export default HomePage;