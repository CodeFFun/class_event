import React, { useState } from 'react';
import '../../lib/BuyerDashboard.css';

const BuyerDashboard = () => {
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Separate state for booking modal
  const [currentSection, setCurrentSection] = useState(""); // Track which section is being viewed
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected movie/event/sport for booking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const sampleMovies = [
    { title: "Venus", image: "", rating: "88%", price: "Rs.500" },
    { title: "Alone", image: "", rating: "88%", price: "Rs.300" },
  ];

  const sampleEvents = [
    { title: "Music Fest", image: "", rating: "90%", price: "Rs.200" },
    { title: "Tech Expo", image: "", rating: "85%", price: "Rs.150" },
  ];

  const sampleSports = [
    { title: "Football Match", image: "", rating: "95%", price: "Rs.300" },
    { title: "Basketball Game", image: "", rating: "89%", price: "Rs.250" },
  ];

  // Toggle modal visibility for section
  const toggleSectionModal = () => {
    setIsSectionModalOpen(!isSectionModalOpen);
  };

  // Handle section selection and modal opening
  const openSection = (section) => {
    setCurrentSection(section);
    setIsSectionModalOpen(true); // Open the section modal
  };

  // Handle selecting an item to book
  const handleBookNowClick = (item) => {
    setSelectedItem(item);
    setIsBookingModalOpen(true); // Open the booking modal
    setIsSectionModalOpen(false); // Close the section modal when booking
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, like sending the data to an API
    alert('Booking confirmed!');
    setIsBookingModalOpen(false); // Close the booking modal after booking
  };

  // Render section content based on currentSection
  const renderSectionContent = () => {
    switch (currentSection) {
      case "Movies":
        return sampleMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <p>{movie.title}</p>
            <div className="movie-rating">
              <span>{movie.rating}</span>
            </div>
            <button className="book-now-button" onClick={() => handleBookNowClick(movie)}>Book Now</button>
          </div>
        ));
      case "Events":
        return sampleEvents.map((event, index) => (
          <div key={index} className="movie-card">
            <img src={event.image} alt={event.title} />
            <p>{event.title}</p>
            <div className="movie-rating">
              <span>{event.rating}</span>
            </div>
            <button className="book-now-button" onClick={() => handleBookNowClick(event)}>Book Now</button>
          </div>
        ));
      case "Sports":
        return sampleSports.map((sport, index) => (
          <div key={index} className="movie-card">
            <img src={sport.image} alt={sport.title} />
            <p>{sport.title}</p>
            <div className="movie-rating">
              <span>{sport.rating}</span>
            </div>
            <button className="book-now-button" onClick={() => handleBookNowClick(sport)}>Book Now</button>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="buyer-dashboard">
      <header className="buyer-dashboard-header">
        <div className="buyer-header-content">
          <div className="logo">
            <span>EVENTHUB</span>
          </div>
          <nav className="dashboard-nav">
            <a href="#" onClick={() => openSection("Movies")}>MOVIES</a>
            <a href="#" onClick={() => openSection("Events")}>EVENTS</a>
            <a href="#" onClick={() => openSection("Sports")}>SPORTS</a>
            <a href="#">CONTACT</a>
            <button className="join-us-button"><a href="/login"> JOIN US </a></button>
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
          <input type="text" placeholder="Search for Movies" />
          <select>
            <option value="kathmandu">Kathmandu</option>
            <option value="kathmandu">Pokhara</option>
          </select>
          <input type="date" />
          
        </div>
      </section>

      {/* Modal for Section Content */}
      {isSectionModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentSection} Listings</h2>
            <div className="modal-content">
              {renderSectionContent()}
            </div>
            <button className="close-modal-button" onClick={toggleSectionModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Booking Item */}
      {isBookingModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book Your {currentSection === "Movies" ? "Movie" : currentSection === "Events" ? "Event" : "Sport"}</h2>
            <div className="modal-content">
              <p><strong>Title:</strong> {selectedItem.title}</p>
              <p><strong>Price:</strong> {selectedItem.price}</p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
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

                <button type="submit" className="book-now-button">Book Now</button>
              </form>
            </div>
            <button className="close-modal-button" onClick={() => setIsBookingModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <section className="content-section">
        <div className="content-grid">
          <aside className="sidebar">
            <div className="sidebar-item">
              <p>24X7 Care</p>
            </div>
            <div className="sidebar-item">
              <p>100% Assurance</p>
            </div>
            <div className="sidebar-item">
              <p>Our Promise</p>
            </div>
            <div className="trending-searches">
              <p>Trending Searches</p>
            </div>
          </aside>

          <main className="main-content">
            <h2>MOVIES</h2>
            <div className="movie-grid">
              {sampleMovies.map((movie, index) => (
                <div key={index} className="movie-card">
                  <img src={movie.image} alt={movie.title} />
                  <p>{movie.title}</p>
                  <div className="movie-rating">
                    <span>{movie.rating}</span>
                    <span>{movie.price}</span>
                  </div>
                  <button className="book-now-button" onClick={() => handleBookNowClick(movie)}>Book Now</button>
                </div>
              ))}
            </div>

            <h2>EVENTS</h2>
            <div className="movie-grid">
              {sampleEvents.map((event, index) => (
                <div key={index} className="movie-card">
                  <img src={event.image} alt={event.title} />
                  <p>{event.title}</p>
                  <div className="movie-rating">
                    <span>{event.rating}</span>
                  </div>
                  <button className="book-now-button" onClick={() => handleBookNowClick(event)}>Book Now</button>
                </div>
              ))}
            </div>

            <h2>SPORTS</h2>
            <div className="movie-grid">
              {sampleSports.map((sport, index) => (
                <div key={index} className="movie-card">
                  <img src={sport.image} alt={sport.title} />
                  <p>{sport.title}</p>
                  <div className="movie-rating">
                    <span>{sport.rating}</span>
                  </div>
                  <button className="book-now-button" onClick={() => handleBookNowClick(sport)}>Book Now</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
