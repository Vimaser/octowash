import React from "react";
// import { scroller } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
import "./css/Home.css";
import octopus from "./img/image3.png";

function Home() {
  // const [isCleaningDone, setCleaningDone] = useState(false);
  const isDarkMode = document.body.classList.contains("dark-mode");

/*   useEffect(() => {
    const timer = setTimeout(() => {
      setCleaningDone(true);
    }, 3000);

    scroller.scrollTo("estimate", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });

    return () => clearTimeout(timer);
  }, []); */

  return (
    <div className={`home-container ${isDarkMode ? "dark-mode" : ""}`}>
      <section className="hero-section">
        <img src={octopus} alt="Octowash Logo" className="brand-image" />
        <h1>Welcome to Octowash</h1>
        <p>Expert Softwash Services</p>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Octowash provides top-tier softwashing services for commercial and
          residential properties. With our state-of-the-art cleaning technology
          and eco-friendly practices, we ensure spotless results with minimal
          environmental impact. Our team of skilled professionals is committed
          to delivering quality service and unparalleled customer satisfaction.
        </p>
      </section>

      <section className="services-section">
        <div className="service-item">
          <h2>What is Softwashing?</h2>
          <p>
            Experience the gentle touch of soft washing — a revolutionary
            cleaning method that transforms your home's exterior without the
            harshness of traditional power washing. At Octowash, we specialize
            in this low-pressure wash technique that combines the power of safe,
            eco-friendly cleaning solutions with the subtlety of under 1,000 PSI
            water pressure to meticulously eliminate mold, algae, pollen, dirt,
            and other contaminants from your home.
          </p>
          <p>
            Soft washing isn't just about keeping the surfaces of your home
            clean; it's about longevity and care. Our process uses specialized
            nozzles to ensure the water stream is just right — forceful enough
            to reach the hidden spots but gentle enough to protect your siding,
            paint, and plants.
          </p>
          <p>
            Forget the brute force of pressure washing; soft washing treats your
            property to a thorough clean that's hard on dirt but easy on
            surfaces. The solutions we apply do more than just clean; they
            sanitize, killing the microscopic threats that can take root in your
            home's exterior. This isn't just cleaning; this is a deep cleanse
            for your home, offering a level of detail that power washing can't
            match.
          </p>
          <p>
            Choose Octowash for a soft washing service that guarantees a clean
            that lasts longer, safeguards your property, and enhances curb
            appeal with a spotless finesse. Embrace the modern, sophisticated
            approach to exterior cleaning — because your home deserves a wash
            that's as nurturing as it is clean.
          </p>
        </div>
        <h2>Our Services</h2>
        <div className="service-item">
          <h3>Commercial Cleaning</h3>
          <p>Comprehensive cleaning solutions for businesses of all sizes.</p>
        </div>
        <div className="service-item">
          <h3>Residential Cleaning</h3>
          <p>Comprehensive cleaning solutions for homes of all sizes.</p>
        </div>
      </section>

      <section className="cta-section" id="estimate">
        <h2>Need an estimate?</h2>
        <RouterLink to="/estimate" className="btn btn-success">
          Get an Estimate
        </RouterLink>
      </section>

      <section className="cta-section" id="contact">
        <h2>Ready for a spotless clean?</h2>
        <RouterLink to="/contact" className="btn btn-success">
          Get in Touch
        </RouterLink>
      </section>
    </div>
  );
}

export default Home;
