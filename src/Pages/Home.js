import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import "../styles/Home.css";
import Header from "../components/Header";
import welcomeImage from "../images/HomePencil.png";

const Home = () => {
  const infoSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Cuando la mitad de la sección está visible
      }
    );

    if (infoSectionRef.current) {
      observer.observe(infoSectionRef.current);
    }

    return () => {
      if (infoSectionRef.current) {
        observer.unobserve(infoSectionRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <section className="welcome-section">
        <div className="welcome-text">
          {/* Agrega la imagen aquí */}
          <img
            src={welcomeImage}
            alt="Welcome"
            className="welcome-image animate__animated animate__fadeIn"
          />
          <div className="welcome-text-content animate__animated animate__fadeIn">
            <h1>
              WELCOME TO <span>BOOKIFY</span> !
            </h1>
            <p className="uno">Your all-in-one library.</p>
            <p className="dos">Unlimited access to +50,000 books.</p>
          </div>
        </div>
      </section>
      <section
        ref={infoSectionRef}
        className="info-section animate__animated animate__fadeIn"
      >
        <h1>Know our Numbers</h1>
        <div className="info-grid">
          {isVisible && (
            <>
              <div className="info-item">
                <CountUp end={50000} duration={3} className="counter" />
                <p>Libros Totales</p>
              </div>
              <div className="info-item">
                <span className="counter">+</span>
                <CountUp end={400} duration={3} className="counter" />
                <p>Autores</p>
              </div>
              <div className="info-item">
                <span className="counter"></span>
                <CountUp end={2000} duration={3} className="counter" />
                <p>Usuarios</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
