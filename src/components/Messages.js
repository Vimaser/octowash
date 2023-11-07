import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../firebaseConfig';
import "./css/darkMode.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const fetchMessages = async () => {
      const db = getFirestore();
      const messagesCollection = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesList = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages">
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages to display</p>
      ) : (
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <strong>Name:</strong> {message.name}<br />
              <strong>Email:</strong> {message.email}<br />
              <strong>Phone Number:</strong> {message.phoneNumber}<br />
              <strong>TimeSent:</strong> {message.timestamp ? new Date(message.timestamp.seconds * 1000).toLocaleString() : 'N/A'}<br />
              <strong>Message:</strong> {message.message}<br />
              <Link to={`/deletemessages/${message.id}`}>Delete</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
