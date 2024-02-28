import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import "../styles/Home.css";
import Header from "../components/Header";
import welcomeImage from "../images/HomePencil.png";

const Home = () => {
  const infoSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bookCount, setBookCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

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

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await fetch(
          "https://proyecto1db2-production.up.railway.app/libros/count",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBookCount(data.count);
        } else {
          console.error(
            "Error al obtener el recuento de libros:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener el recuento de libros:", error.message);
      }
    };

    const fetchAuthorCount = async () => {
      try {
        const response = await fetch(
          "https://proyecto1db2-production.up.railway.app/authors/count",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAuthorCount(data.count);
        } else {
          console.error(
            "Error al obtener el recuento de autores:",
            response.statusText
          );
        }
      } catch (error) {
        console.error(
          "Error al obtener el recuento de autores:",
          error.message
        );
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          "https://proyecto1db2-production.up.railway.app/users/count",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.count);
        } else {
          console.error(
            "Error al obtener el recuento de usuarios:",
            response.statusText
          );
        }
      } catch (error) {
        console.error(
          "Error al obtener el recuento de usuarios:",
          error.message
        );
      }
    };

    fetchBookCount();
    fetchAuthorCount();
    fetchUserCount();
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
                <CountUp end={bookCount} duration={3} className="counter" />
                <p>Libros Totales</p>
              </div>
              <div className="info-item">
                <CountUp end={authorCount} duration={3} className="counter" />
                <p>Autores</p>
              </div>
              <div className="info-item">
                <CountUp end={userCount} duration={3} className="counter" />
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
