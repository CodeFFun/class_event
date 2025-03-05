import  { useState, useEffect } from "react";
import "../../lib/SellerDashboard.css";

const SellerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // For event details modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For edit event modal
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    event_location: "",
    event_description: "",
    event_price: 0
  })
  const [selectedEvent, setSelectedEvent] = useState(null); // To hold selected event details for viewing/editing
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role')
    if(role !== "ORGANIZATION"){
      window.location.href = "/"
    }
    fetchEvents();
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, event_poster: e.target.files[0] });
  };

  const fetchEvents = async () => {
    const res = await fetch('http://localhost:8080/event', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()

    if (Array.isArray(data.data)) {
      setEvents(data.data);  // Only set it if it's an array
      console.log(events)
    } else {
      console.error("Unexpected API response format:", data);
      setEvents([]); // Fallback to empty array
    }
  }

  // Open & close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Open & close event details modal
  const toggleDetailModal = (event) => {
    setSelectedEvent(event)
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  // Open & close edit event modal
  const toggleEditModal = (event) => {
    setEditEvent(event);
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Handle input change for new event
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    }) 
  };

  // Handle input change for editing event
  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  // Add new event
  const addEvent = async () => {
    const sendData = new FormData();
    sendData.append("event_name", formData.event_name);
    sendData.append("event_date", formData.event_date);
    sendData.append("event_location", formData.event_location);
    sendData.append("event_description", formData.event_description);
    sendData.append("event_price", formData.event_price);
    sendData.append("event_poster", formData.event_poster);

    console.log(formData, sendData)

    const res = await fetch('http://localhost:8080/event', {
      method: 'POST',
      body: sendData,
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    toggleModal();
  };

  // Update event after editing
  const saveEditEvent = async () => {
    console.log(editEvent)
    const res = await fetch(`http://localhost:8080/event/${editEvent.event_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editEvent),
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    toggleEditModal(); // Close the edit modal after saving
  };

  // Delete event
  const deleteEvent = async () => {
    const res = await fetch(`http://localhost:8080/event/${selectedEvent.event_id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
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
              <img src={`http://localhost:8080/${event.event_poster}`} alt="Event" className="event-image" />
              <div className="event-info">
                <h3>{event.event_name}</h3>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Location:</strong> {event.event_location}</p>
                <p>{event.event_description}</p>
              </div>
              <button
                className="view-details-button"
                id={event.event_id}
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
            <input type="text" name="event_name" placeholder="Event Title" value={formData.event_name} onChange={handleChange} />
            <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} />
            <input type="text" name="event_location" placeholder="Event Location" value={formData.event_location} onChange={handleChange} />
            <input type="number" name="event_price" placeholder="Event Price" value={formData.event_price} onChange={handleChange} />
            <textarea name="event_description" placeholder="Event Description" value={formData.event_description} onChange={handleChange}></textarea>
            <input type="file" name="event_poster" placeholder="Event Location"  onChange={handleFileChange }/>
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
            <h2>{selectedEvent.event_name}</h2>
            <p><strong>Date:</strong> {selectedEvent.event_date}</p>
            <p><strong>Location:</strong> {selectedEvent.event_location}</p>
            <p><strong>Description:</strong> {selectedEvent.event_description}</p>
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
              name="event_name"
              placeholder="Event Title"
              value={editEvent.event_name}
              onChange={handleEditChange}
            />
            <input
              type="date"
              name="event_date"
              value={editEvent.event_date}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="event_location"
              placeholder="Event Location"
              value={editEvent.event_location}
              onChange={handleEditChange}
            />
            <textarea
              name="event_description"
              placeholder="Event Description"
              value={editEvent.event_description}
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
