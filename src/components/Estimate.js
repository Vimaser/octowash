import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { Alert } from "bootstrap";
import "./css/darkMode.css";
import "./css/darkMode.css";
import "./css/Estimate.css";

const Estimate = () => {
  const [pricePerSqFt, setPricePerSqFt] = useState(0);
  const [editPrice, setEditPrice] = useState(""); // Separate state to handle the editable price
  const [sqFootage, setSqFootage] = useState("");
  const [totalEstimate, setTotalEstimate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Renamed from isAdmin to isUserLoggedIn

  const db = getFirestore();
  const auth = getAuth();
  const priceRef = doc(db, "pricePerSqFt", "MM3hv2J6dAndwKSBxqku");

  useEffect(() => {
    const fetchPricePerSqFt = async () => {
      const docSnap = await getDoc(priceRef);
      if (docSnap.exists()) {
        setPricePerSqFt(docSnap.data().pricePerSqFt);
      } else {
        console.log("No pricing data found in Firestore!");
      }
    };

    fetchPricePerSqFt();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user); // Set based on the user's login status
      console.log("User login status:", !!user); // Log the user's login status
    });

    return () => unsubscribe();
  }, [auth, priceRef]);

  const savePriceToBackend = async () => {
    const numericPrice = Number(editPrice);
    if (!isNaN(numericPrice) && isUserLoggedIn) {
      try {
        await updateDoc(priceRef, {
          pricePerSqFt: numericPrice,
        });
        setPricePerSqFt(numericPrice);
        setEditPrice(""); // Clear the editPrice field after saving
        alert("Price updated successfully!");
        setEditMode(false);
      } catch (error) {
        console.error("Error updating price:", error);
        alert("Failed to update price. Please try again.");
      }
    } else {
      alert("Please enter a valid number for the price.");
    }
  };

  const handlePriceChange = (e) => {
    setEditPrice(e.target.value);
  };

  const handleSqFootageChange = (e) => {
    setSqFootage(e.target.value);
  };

  const calculateEstimate = () => {
    setTotalEstimate(pricePerSqFt * sqFootage);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditPrice(pricePerSqFt.toString());
    }
  };

  return (
    <div className="background-image">
    <br/>
    <div className="estimate-container">
      {editMode ? (
        <div>
          <label htmlFor="priceInput">Price per square foot:</label>
          <input
            type="number"
            id="priceInput"
            value={editPrice}
            onChange={handlePriceChange}
            disabled={!isUserLoggedIn}
          />
          <button onClick={savePriceToBackend} disabled={!isUserLoggedIn}>
            Save Price
          </button>
        </div>
      ) : (
        <div>
          <p>Price per square foot: ${pricePerSqFt}</p>
          {isUserLoggedIn && (
            <button onClick={toggleEditMode}>Edit Price</button>
          )}
        </div>
      )}

      <label htmlFor="sqFootage">Enter square footage:</label>
      <input
        type="number"
        id="sqFootage"
        value={sqFootage}
        onChange={handleSqFootageChange}
      />
      <button onClick={calculateEstimate}>Calculate Estimate</button>

      {totalEstimate !== null && (
        <p>
          The estimate for {sqFootage} sq ft is: ${totalEstimate.toFixed(2)}
        </p>
      )}
      <p className="acknowledgement">
        *Acknowledgement Octowash Pricing Calculator provides only an estimate
        of your Softwashing fees and doesn't include any taxes that might apply.
        Your actual fees depend on a variety of factors.
      </p>
    </div>
    <section className="cta-section">
        <h2 className="clean">Ready for a spotless clean?</h2>
        <Link to="/contact" className="btn btn-success">
          Get in Touch
        </Link>
      </section>
    <br/>
    </div>
  );
};

export default Estimate;
