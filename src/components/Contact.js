import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "../firebaseConfig";
import "./css/darkMode.css";
import "./css/darkMode.css";
import "./css/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();
    await addDoc(collection(db, "messages"), {
      name,
      email,
      phoneNumber,
      message,
      timestamp: new Date(),
    });

    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <br/>
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thanks for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message (Tell us about yourself!):</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />{" "}
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
       {/* Display the contact number */}
       <div className="contact-number">
        <p>Contact us directly at: <span>1-225-111-1111</span></p>
      </div>
    </div>
  );
};

export default Contact;
