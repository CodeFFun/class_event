import { useState, useEffect } from "react";
import "../../lib/AdminDashboard.css";

const AdminDashboard = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [organizers, setOrganizers] = useState([
  ]);

  const [events, setEvents] = useState([
  ]);

  useEffect(() => {
    const role = localStorage.getItem('role')
    if(role !== "ADMIN"){
      window.location.href = "/"
    }
    fetchData();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:8080/event', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data.data);
    setEvents(data.data);
  }

  const fetchData = async () => {
    const res = await fetch('http://localhost:8080/user', {
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data.data);
    setOrganizers(data.data);
  }

  const toggleDetailModal = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const toggleEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(!isEventModalOpen);
  };

  const deleteUser = async () => {
    const res = await fetch(`http://localhost:8080/user/${selectedUser.user_id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    
    setIsDetailModalOpen(false);
  };

  const deleteEvent = async() => {
    const res = await fetch(`http://localhost:8080/event/${selectedEvent.event_id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
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
              <h3>{organizer.user_name}</h3>
              <p><strong>Email:</strong> {organizer.user_email}</p>
              <p><strong>Contacts:</strong> {organizer.user_contact}</p>
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
              <img src={`http://localhost:8080/${event.event_poster}`} className="w-full h-6" />
              <h3>{event.event_name}</h3>
              <p><strong>Date:</strong> {event.event_date}</p>
              <p><strong>Location:</strong> {event.event_location}</p>
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
            <p><strong>Email:</strong> {selectedUser.user_email}</p>
            <p><strong>Name</strong> {selectedUser.user_name}</p>
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
            <h2>{selectedEvent.event_name}</h2>
            <p><strong>Date:</strong> {selectedEvent.event_date}</p>
            <p><strong>Location:</strong> {selectedEvent.event_location}</p>
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
