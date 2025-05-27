import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "@fontsource/anton";
import "@fontsource/antic";

const App = () => {
  const [currentLocation] = useState({
    latitude: 6.791164,
    longitude: 79.900497,
    temperature: 30,
    humidity: 80,
    voc: 140,
    pm25: 40,
  });

  const airQualityMarkers = useMemo(() => [
    {
      id: 1,
      latitude: 6.8088,
      longitude: 79.8743,
      airQuality: 45,
      temperature: 28,
      humidity: 75,
      voc: 120,
      pm25: 35,
      pm10: 0,
      pm1: 0,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      latitude: 6.791164,
      longitude: 79.900497,
      airQuality: 60,
      temperature: 30,
      humidity: 80,
      voc: 140,
      pm25: 40,
      pm10: 0,
      pm1: 0,
      updatedAt: new Date().toISOString(),
    },
  ], []);

  const NavigationBar = React.memo(() => (
    <nav style={navStyles}>
      <h2 style={navTitleStyles}>Air Aware</h2>
      <div style={navLinksContainer}>
        <Link to="/" style={navLinkStyles}>Home</Link>
        <Link to="/insights" style={{ ...navLinkStyles, marginRight: '60px' }}>Insights</Link>
      </div>
    </nav>
  ));

  const InsightsPage = () => {
    const chartUrls = useMemo(() => [
      "https://thingspeak.com/channels/2820612/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Temperature&type=line",
      "https://thingspeak.com/channels/2820612/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Humidity&type=line",
      "https://thingspeak.com/channels/2820612/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Rain+Sensor&type=spline",
      "https://thingspeak.com/channels/2820612/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=VOC&type=line",
      "https://thingspeak.com/channels/2820612/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15",
      "https://thingspeak.com/channels/2820612/charts/6?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
    ], []);

    const widgetUrls = useMemo(() => [
      "https://thingspeak.com/channels/2820612/widgets/1013606",
      "https://thingspeak.com/channels/2820612/widgets/1014636",
      "https://thingspeak.com/channels/2820612/widgets/1018937",
      "https://thingspeak.com/channels/2820612/widgets/1013617",
      "https://thingspeak.com/channels/2820612/widgets/1020462",
      "https://thingspeak.com/channels/2820612/widgets/1020463",
      "https://thingspeak.com/channels/2820612/widgets/1020464"
    ], []);

    return (
      <div style={insightsPageStyles}>
        <NavigationBar />
        <div style={insightsContentStyles}>
          {/* Welcome Section */}
          <div style={welcomeSectionStyles}>
            <div style={welcomeImageContainer}>
              <img 
                src="/public/forest.jpg"
                alt="Forest"
                style={welcomeImageStyles}
              />
            </div>
            <div style={welcomeTextContainer}>
              <p style={welcomeTextStyles}>
                Welcome to Air Aware, your trusted companion for real-time air quality monitoring. Our
                platform displays accurate data on temperature, humidity, VOC levels, and PM2.5 concentrations,
                tailored to your current location. Explore interactive maps, gain valuable insights, and stay
                informed about the air quality in your area and beyond. Designed with user-friendliness in
                mind, Air Aware empowers you to make better decisions for your health and the environment.
                Whether you're planning outdoor activities or tracking air trends, we're here to help you
                breathe easier and live smarter.
              </p>
            </div>
          </div>

          {/* Sensor Data Section */}
          <div style={sensorDataSectionStyles}>
            <h2 style={sectionTitleStyles}>Sensor Data Insights</h2>
            <div style={chartsContainerStyles}>
              {chartUrls.map((src, index) => (
                <div key={index}>
                  <iframe
                    width="450"
                    height="300"
                    style={chartIframeStyles}
                    src={src}
                    title={`Sensor Chart ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* VOC Section */}
          <div style={vocSectionStyles}>
            <h2 style={sectionTitleStyles}>
              Volatile Organic Compounds<br />(VOC)
            </h2>
            <div style={contentRowStyles}>
              <iframe
                width="600"
                height="400"
                style={largeIframeStyles}
                src={chartUrls[3]}
                title="VOC Chart"
              />
              <div style={textContentStyles}>
                <p style={paragraphStyles}>
                  Volatile Organic Compounds (VOCs) are organic chemicals that easily evaporate into the air and can
                  significantly impact indoor and outdoor air quality. They are commonly released from products such as
                  paints, cleaning supplies, and industrial processes. Prolonged exposure to high levels of VOCs can cause
                  adverse health effects, including respiratory issues, headaches, and irritation of the eyes, nose, and throat.
                  Maintaining VOC levels within a healthy range is crucial for well-being. Ideally, VOC concentrations should
                  remain below 500 parts per billion (ppb) in indoor environments, with levels below 200 ppb being optimal
                  for sensitive individuals.
                </p>
              </div>
            </div>
          </div>

          {/* PM2.5 Section */}
          <div style={pmSectionStyles}>
            <h2 style={sectionTitleStyles}>
              Particulate Matter (PM 2.5,<br />PM 10)
            </h2>
            <div style={{ ...contentRowStyles, flexDirection: 'row-reverse' }}>
              <div style={textContentStyles}>
                <p style={paragraphStyles}>
                  Particulate Matter (PM) refers to tiny particles in the air that can harm human health when inhaled. PM2.5
                  consists of fine particles with a diameter of 2.5 micrometers or smaller, while PM10 includes slightly
                  larger particles up to 10 micrometers. These particles can originate from sources like vehicle emissions,
                  industrial processes, and natural events such as wildfires or dust storms. PM2.5 is particularly concerning as it
                  can penetrate deep into the lungs and even enter the bloodstream. For healthy air quality, PM2.5 levels should
                  ideally remain below 12 µg/m³ (micro grams per cubic meter) while PM10 levels should stay below 50 µg/m³,
                  based on 24-hour average standards.
                </p>
              </div>
              <iframe
                width="600"
                height="400"
                style={largeIframeStyles}
                src={chartUrls[5]}
                title="PM2.5 Chart"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => {
    const widgetUrls = useMemo(() => [
      "https://thingspeak.com/channels/2820612/widgets/1013606",
      "https://thingspeak.com/channels/2820612/widgets/1014636",
      "https://thingspeak.com/channels/2820612/widgets/1018937",
      "https://thingspeak.com/channels/2820612/widgets/1013617",
      "https://thingspeak.com/channels/2820612/widgets/1020462",
      "https://thingspeak.com/channels/2820612/widgets/1020463",
      "https://thingspeak.com/channels/2820612/widgets/1020464"
    ], []);

    return (
      <div style={homePageStyles}>
        <NavigationBar />
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]}
          zoom={15}
          style={mapContainerStyles}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {airQualityMarkers.map((marker) => (
            <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
              <Popup>
                <AirQualityPopup marker={marker} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
  
        <div style={locationInfoStyles}>
          <h3>Current Location</h3>
          <p>
            Latitude: {currentLocation.latitude} <br />
            Longitude: {currentLocation.longitude}
          </p>
          <h3>Air Quality Data</h3>
          <AirQualityData location={currentLocation} />
        </div>
  
        <div style={widgetsContainerStyles}>
          {widgetUrls.slice(0, 4).map((url, index) => (
            <iframe
              key={`top-${index}`}
              width={index === 3 ? "300" : "270"}
              height={index === 3 ? "260" : "150"}
              style={widgetIframeStyles}
              src={url}
              title={`Sensor Widget ${index + 1}`}
            />
          ))}
        </div>
  
        <div style={{ ...widgetsContainerStyles, top: '350px' }}>
          {widgetUrls.slice(4).map((url, index) => (
            <iframe
              key={`bottom-${index}`}
              width="270"
              height="150"
              style={widgetIframeStyles}
              src={url}
              title={`Sensor Widget ${index + 5}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const AirQualityPopup = ({ marker }) => (
    <div>
      <h4>Air Quality Details</h4>
      <ul style={popupListStyles}>
        <li><strong>Latitude:</strong> {marker.latitude}</li>
        <li><strong>Longitude:</strong> {marker.longitude}</li>
        <li><strong>Temperature:</strong> {marker.temperature} °C</li>
        <li><strong>Humidity:</strong> {marker.humidity} %</li>
        <li><strong>VOC:</strong> {marker.voc} ppb</li>
        <li><strong>PM2.5:</strong> {marker.pm25} µg/m³</li>
        <li><strong>PM10.0:</strong> {marker.pm10} µg/m³</li>
        <li><strong>PM1.0:</strong> {marker.pm1} µg/m³</li>
        <li><strong>Air Quality Index:</strong> {marker.airQuality}</li>
        <li><strong>Last Updated:</strong> {new Date(marker.updatedAt).toLocaleString()}</li>
      </ul>
    </div>
  );

  const AirQualityData = ({ location }) => (
    <ul style={dataListStyles}>
      <li><strong>Temperature:</strong> {location.temperature} °C</li>
      <li><strong>Humidity:</strong> {location.humidity} %</li>
      <li><strong>VOC:</strong> {location.voc} ppb</li>
      <li><strong>PM2.5:</strong> {location.pm25} µg/m³</li>
      <li><strong>PM10.0:</strong> {location.pm10} µg/m³</li>
      <li><strong>PM1.0:</strong> {location.pm1} µg/m³</li>
    </ul>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
};

// Styles
const navStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "#000000",
  color: "white",
  padding: "10px 20px",
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "Anton, sans-serif",
};

const navTitleStyles = {
  margin: 0,
  fontSize: "40px"
};

const navLinksContainer = {
  fontFamily: "Antic, sans-serif"
};

const navLinkStyles = {
  color: "white",
  marginRight: "40px",
  fontSize: "24px",
  textDecoration: "none"
};

const insightsPageStyles = {
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  overflow: "scroll"
};

const insightsContentStyles = {
  paddingTop: "80px"
};

const welcomeSectionStyles = {
  display: "flex",
  backgroundColor: "#4CAF50",
  padding: "40px",
  color: "white"
};

const welcomeImageContainer = {
  flex: 1
};

const welcomeImageStyles = {
  width: "100%",
  height: "400px",
  objectFit: "cover"
};

const welcomeTextContainer = {
  flex: 1,
  padding: "20px"
};

const welcomeTextStyles = {
  fontSize: "24px",
  lineHeight: "1.6"
};

const sensorDataSectionStyles = {
  padding: "40px",
  overflow: "hidden"
};

const sectionTitleStyles = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "30px"
};

const chartsContainerStyles = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
  height: "100%"
};

const chartIframeStyles = {
  border: "1px solid #cccccc",
  borderRadius: "8px",
  backgroundColor: "white",
  overflow: "hidden"
};

const vocSectionStyles = {
  backgroundColor: "black",
  color: "white",
  padding: "40px"
};

const pmSectionStyles = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "40px"
};

const contentRowStyles = {
  display: "flex",
  gap: "40px",
  alignItems: "center"
};

const largeIframeStyles = {
  border: "1px solid #cccccc",
  borderRadius: "8px"
};

const textContentStyles = {
  flex: 1
};

const paragraphStyles = {
  fontSize: "18px",
  lineHeight: "1.6"
};

const homePageStyles = {
  height: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden"
};

const mapContainerStyles = {
  height: "100%",
  width: "100%",
  marginTop: "50px"
};

const locationInfoStyles = {
  position: "absolute",
  top: "80px",
  left: "20px",
  width: "300px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "300px",
  zIndex: 1000,
};

const widgetsContainerStyles = {
  position: "absolute",
  top: "80px",
  right: "20px",
  display: "flex",
  gap: "10px",
  padding: "10px",
  borderRadius: "8px",
  zIndex: 1000,
};

const widgetIframeStyles = {
  border: "1px solid #cccccc",
  borderRadius: "8px"
};

const popupListStyles = {
  listStyleType: "none",
  padding: 0,
  margin: 0
};

const dataListStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0
};

export default App;