import { useState, useEffect } from "react";
import "../../lib/BuyerDashboard.css";

const BuyerDashboard = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [eventListings, setEventListing] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticket_quantity: 0,
    ticket_price: 0,
    event_id: ""
  });


  useEffect(() => {
    const userId = localStorage.getItem('authToken')
    if(!userId){
      window.location.href = "/login"
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('http://localhost:8080/event/all/get', {
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data.data);
    setEventListing(data.data);
  }

  const handleBookNowClick = (event) => {
    setSelectedItem(event);
    setIsBookingModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formData.ticket_price = selectedItem.event_price * formData.ticket_quantity;
    formData.event_id = selectedItem.event_id;
    
    const res = await fetch(`http://localhost:8080/ticket`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    alert("Booking confirmed!");
    setIsBookingModalOpen(false);
  };

  return (
    <div className="buyer-dashboard">
      <header className="buyer-dashboard-header">
        <div className="buyer-header-content">
          <div className="logo">
            <span>EVENTHUB</span>
          </div>
          <nav className="dashboard-nav">
            <a href="#">CONTACT</a>
            <button className="join-us-button">
              <a href="/login"> JOIN US </a>
            </button>
          </nav>
        </div>
      </header>

      <section className="buyer-hero-section">
        <div className="buyer-hero-content">
          <h1>BOOK YOUR</h1>
          <h2>TICKETS FOR EVENTS</h2>
          <p>Safe, secure, reliable ticketing. Your ticket to live entertainment!</p>
        </div>
      </section>

      <section className="search-section">
        <div className="search-container">
          <input type="text" placeholder="Search for Events" />
          <select>
            <option value="kathmandu">Kathmandu</option>
            <option value="pokhara">Pokhara</option>
          </select>
          <input type="date" />
        </div>
      </section>

      <section className="content-section">
        <h2>EVENTS</h2>
        <div className="movie-grid">
          {eventListings.map((event, index) => (
            <div key={index} className="movie-card">
              <img src={`http://localhost:8080/${event.event_poster}`} alt={event.event_name} className="h-5 w-full"/>
              <p>{event.event_name}</p>
              <div className="movie-rating">
                <span>Rs {event.event_price}</span>
              </div>
              <button className="book-now-button" onClick={() => handleBookNowClick(event)}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book Your Event</h2>
            <div className="modal-content">
              <p><strong>Title:</strong> {selectedItem.event_name}</p>
              <p><strong>Price:</strong> {selectedItem.event_price}</p>

              <form onSubmit={handleFormSubmit}>
              
                <div className="form-group">
                  <label htmlFor="lastName">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Quantity</label>
                  <input
                    type="number"
                    id="ticket_quantity"
                    name="ticket_quantity"
                    value={formData.ticket_quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="book-now-button">Book Now</button>
              </form>
            </div>
            <button className="close-modal-button" onClick={() => setIsBookingModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
