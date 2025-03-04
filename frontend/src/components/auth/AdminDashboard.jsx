import React, { useState } from "react";
import "../../lib/AdminDashboard.css";

const AdminDashboard = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [organizers, setOrganizers] = useState([
    { name: "Alice Johnson", email: "alice@example.com", events: 5 },
    { name: "Bob Smith", email: "bob@example.com", events: 3 },
  ]);

  const [events, setEvents] = useState([
    { title: "Corporate Meetup", date: "2025-04-01", location: "Chicago", organizer: "Alice Johnson" },
    { title: "Art Exhibition", date: "2025-04-10", location: "Los Angeles", organizer: "Bob Smith" },
  ]);

  const toggleDetailModal = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const toggleEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(!isEventModalOpen);
  };

  const deleteUser = () => {
    setOrganizers(organizers.filter((org) => org.email !== selectedUser.email));
    setIsDetailModalOpen(false);
  };

  const deleteEvent = () => {
    setEvents(events.filter((ev) => ev.title !== selectedEvent.title));
    setIsEventModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <header className="admin-dashboard-header">
        <div className="admin-header-content">
          <div className="logo">EVENTHUB ADMIN</div>
          <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="admin-hero-section">
        <div className="hero-content">
          <h1>ADMIN DASHBOARD</h1>
          <h2>MANAGE ORGANIZERS & EVENTS</h2>
          <p>Oversee and regulate platform activities efficiently.</p>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="organizers-section">
        <h2 className="section-title">Event Organizers</h2>
        <div className="organizers-grid">
          {organizers.map((organizer, index) => (
            <div key={index} className="organizer-card">
              <h3>{organizer.name}</h3>
              <p><strong>Email:</strong> {organizer.email}</p>
              <p><strong>Events:</strong> {organizer.events}</p>
              <button className="view-details-button" onClick={() => toggleDetailModal(organizer)}>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <h2 className="section-title">All Events</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Organizer:</strong> {event.organizer}</p>
              <button className="view-details-button" onClick={() => toggleEventModal(event)}>Edit Event</button>
            </div>
          ))}
        </div>
      </section>

      {/* Organizer Details Modal */}
      {isDetailModalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Events Hosted:</strong> {selectedUser.events}</p>
            <div className="modal-buttons">
              <button onClick={toggleDetailModal} className="close-button">Close</button>
              <button onClick={deleteUser} className="delete-button">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {isEventModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
            <div className="modal-buttons">
              <button onClick={toggleEventModal} className="close-button">Close</button>
              <button onClick={deleteEvent} className="delete-button">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
