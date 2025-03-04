import React, { useState } from "react";
import "../../lib/SellerDashboard.css";

const SellerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // For event details modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For edit event modal
  const [events, setEvents] = useState([
    { title: "Music Fest", date: "2025-03-10", location: "New York", description: "Live music festival with top artists." },
    { title: "Tech Expo", date: "2025-03-15", location: "San Francisco", description: "Latest technology trends and innovations." },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null); // To hold selected event details for viewing/editing
  const [editEvent, setEditEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // Open & close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Open & close event details modal
  const toggleDetailModal = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  // Open & close edit event modal
  const toggleEditModal = (event) => {
    setEditEvent(event);
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Handle input change for new event
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Handle input change for editing event
  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  // Add new event
  const addEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", location: "", description: "" });
    toggleModal();
  };

  // Update event after editing
  const saveEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.title === editEvent.title ? editEvent : event
    );
    setEvents(updatedEvents);
    toggleEditModal(); // Close the edit modal after saving
  };

  // Delete event
  const deleteEvent = () => {
    const updatedEvents = events.filter((event) => event.title !== selectedEvent.title);
    setEvents(updatedEvents);
    toggleDetailModal(); // Close the detail modal after deleting
  };

  return (
    <div className="seller-dashboard">
      {/* Header Section */}
      <header className="seller-dashboard-header">
        <div className="seller-header-content">
          <div className="logo">EVENTHUB</div>
          <nav className="dashboard-nav">
            <a href="#">HOME</a>
            <a href="#">EVENTS</a>
            <a href="#">ADD EVENT</a>
            <button className="join-us-button" onClick={toggleModal}>
              ADD EVENT
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="seller-hero-section">
        <div className="hero-content">
          <h1>MANAGE YOUR EVENTS</h1>
          <h2>LIST & CREATE EVENTS</h2>
          <p>Organize your events easily with our secure platform.</p>
        </div>
      </section>

      {/* Events List (Buyer-style Cards) */}
      <section className="events-section">
        <h2>Your Events</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <img src="https://via.placeholder.com/150" alt="Event" className="event-image" />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
              </div>
              <button
                className="view-details-button"
                onClick={() => toggleDetailModal(event)} // Open event details modal
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Event</h2>
            <input type="text" name="title" placeholder="Event Title" value={newEvent.title} onChange={handleChange} />
            <input type="date" name="date" value={newEvent.date} onChange={handleChange} />
            <input type="text" name="location" placeholder="Event Location" value={newEvent.location} onChange={handleChange} />
            <textarea name="description" placeholder="Event Description" value={newEvent.description} onChange={handleChange}></textarea>
            <div className="modal-buttons">
              <button onClick={addEvent}>Add Event</button>
              <button onClick={toggleModal} className="close-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {isDetailModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <div className="modal-buttons">
              <button onClick={() => toggleEditModal(selectedEvent)}>Edit</button>
              <button onClick={deleteEvent} className="delete-button">Delete</button>
              <button onClick={toggleDetailModal} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Event</h2>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={editEvent.title}
              onChange={handleEditChange}
            />
            <input
              type="date"
              name="date"
              value={editEvent.date}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={editEvent.location}
              onChange={handleEditChange}
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={editEvent.description}
              onChange={handleEditChange}
            ></textarea>
            <div className="modal-buttons">
              <button onClick={saveEditEvent}>Save</button>
              <button onClick={toggleEditModal} className="close-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
