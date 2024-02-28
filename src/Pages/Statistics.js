// Statistics.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/Statistics.css";

const Statistics = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch image
    fetchImage();

    // Fetch JSON data
    fetchJsonData();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch(
        "https://proyecto1db2-production.up.railway.app/top_authors/img/"
      );
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        console.error("Error fetching image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching image:", error.message);
    }
  };

  const fetchJsonData = async () => {
    try {
      const response = await fetch(
        "https://proyecto1db2-production.up.railway.app/top_authors/json/"
      );
      if (response.ok) {
        const data = await response.json();
        setJsonData(data);
      } else {
        console.error("Error fetching JSON data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-h2-statistcs">Statistics Page</h2>

        {/* Image */}
        {imageSrc && (
          <div className="image-container">
            <h3 className="text-statistcs">Top Authors Image</h3>
            <img src={imageSrc} alt="Top Authors" />
          </div>
        )}

        {/* JSON data */}
        {jsonData && (
          <div className="json-container">
            <h3 className="text-statistcs">Top Authors JSON Data</h3>
            <table>
              <thead>
                <tr>
                  <th>Author Name</th>
                  <th>Number of Books</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.map((author, index) => (
                  <tr key={index}>
                    <td>{author.author_name}</td>
                    <td>{author.books}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* i-frames */}
        <div className="iframe-container">
          <h3 className="text-statistcs">i-Frames Section</h3>
          <iframe
            src="https://api.wo-cloud.com/content/widget/?geoObjectKey=6112695&language=en&region=US&timeFormat=HH:mm&windUnit=mph&systemOfMeasurement=imperial&temperatureUnit=fahrenheit"
            name="CW2"
            scrolling="no"
            width="290"
            height="318"
            frameborder="0"
            style={{ border: "1px solid #10658E", borderRadius: "8px" }} // Cambio aquí
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Statistics;
