import React from 'react';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About DriveUp</h1>
        <p>
          Welcome to DriveUp, the ultimate destination for vintage car lovers! We're not just another car dealership - 
          we're a curated community where classic beauty meets modern discovery.
        </p>
      </div>

      <div className="about-section">
        <h2>Why We're Different</h2>
        <div className="highlight-box">
          <p>
            <span className="highlight-text">Community-Driven:</span> Like Pinterest, but for cars - 
            add your favorites, share with fellow enthusiasts, and get inspired.
          </p>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p className="mission-text">
          To make the hunt for the perfect vintage car as thrilling as the drive itself. Whether you're a collector, 
          a restorer, or someone who just appreciates classic design, DriveUp is your go-to hub for all things 
          retro and automotive.
        </p>
        <p className="join-text">
          Join us and discover the classics that move you.
        </p>
      </div>

      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>
          Have a question, a rare car to list, or just want to chat classics? We'd love to hear from you!
        </p>

        <div className="contact-details">
          <div className="contact-item">
            <span>📧</span>
            <span>Email:</span>
            <a href="mailto:driveup@gmail.com">driveup@gmail.com</a>
          </div>
          
          <div className="contact-item">
            <span>📞</span>
            <span>Phone:</span>
            <a href="tel:+254720467089">0720 467 089</a>
          </div>
          
          <div className="contact-item">
            <span>📍</span>
            <span>Location:</span>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;