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
            style={{
              background: "#F1F5F4",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100vw",
              height: "100vh",
            }}
            src="https://charts.mongodb.com/charts-proyecto-1-bases-de-datos-xtnnp/embed/dashboards?id=65deaffd-7b65-459f-8d0e-ab0f5c755b5a&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Statistics;
