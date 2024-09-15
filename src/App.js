import React, { useState } from "react";
import {
  Layout,
  Menu,
  AutoComplete,
  Button,
  Progress,
  Spin,
  Alert,
  Switch,
} from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpModal from "./components/SingUpModal";
import WeatherData from "./components/Weather";
import Contacts from "./components/Contacts";
import AboutUs from "./components/AboutUs";
import Cookies from "js-cookie";

const { Header, Content, Footer } = Layout;

const items1 = [
  { key: "Sign up", label: "Sign up" },
  { key: "Contacts", label: "Contacts" },
  { key: "About us", label: "About us" },
];

const cityOptions = [
  { value: "Kyiv" },
  { value: "Washington" },
  { value: "Tokyo" },
  { value: "Berlin" },
  { value: "Paris" },
];

const App = () => {
  const [city, setCity] = useState("Odesa");
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleInputChange = (value) => {
    setInputCity(value);
  };

  const handleButtonClick = () => {
    if (inputCity.trim() !== "") {
      setCity(inputCity);
      setInputCity("");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values) => {
    localStorage.setItem("formData", JSON.stringify(values));
    Cookies.set("formDataExpiry", true, { expires: 14 });
    setIsModalVisible(false);
  };

  const checkLocalStorageExpiry = () => {
    const expiryCookie = Cookies.get("formDataExpiry");

    if (!expiryCookie) {
      localStorage.removeItem("formData");
    }
  };
  checkLocalStorageExpiry();

  const toggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const backgroundColor = theme === "dark" ? "#001529" : "#f0f2f5";
  const textColor = theme === "dark" ? "white" : "black";

  return (
    <Router>
      <Layout style={{ minHeight: "100vh", backgroundColor }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",

            backgroundColor,
          }}
        >
          <div className="demo-logo" />
          <div style={{ color: textColor }}>
            <h1>THE WEATHER</h1>
          </div>
          <Menu
            theme={theme}
            mode="horizontal"
            defaultSelectedKeys={["Home Page"]}
            style={{
              minWidth: 0,
              flex: 1,
              backgroundColor,
              justifyContent: "flex-end",
            }}
            items={items1.map((item) => ({
              key: item.key,
              label:
                item.key === "Sign up" ? (
                  <span onClick={showModal} style={{ color: textColor }}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={`/${item.key.replace(" ", "").toLowerCase()}`}>
                    <span style={{ color: textColor }}>{item.label}</span>
                  </Link>
                ),
            }))}
          />
        </Header>

        <Content
          className="custom-content"
          style={{
            padding: "0 48px",
            backgroundColor,
            flex: "1 0 auto",
            textAlign: "center",
          }}
        >
          <div style={{ margin: "16px 0" }}></div>
          <div
            style={{
              padding: "24px",
              background: theme === "dark" ? "#141414" : "#ffffff",
              borderRadius: "8px",
              minHeight: 280,
              color: textColor,
              textAlign: "left",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h2 style={{ color: textColor }}>Check the Weather</h2>
                    <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
                      <AutoComplete
                        options={cityOptions}
                        value={inputCity}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleButtonClick();
                          }
                        }}
                        placeholder="Enter city name"
                        style={{ width: 200 }}
                      />

                      <Button type="primary" onClick={handleButtonClick}>
                        Get Weather
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 40,
                        alignItems: "flex-start",
                      }}
                    >
                      {loading ? (
                        <Spin tip="Loading weather data..." />
                      ) : error ? (
                        <Alert
                          message="Error"
                          description={error}
                          type="error"
                          showIcon
                        />
                      ) : (
                        weatherData && (
                          <>
                            <div>
                              <h3 style={{ color: textColor }}>
                                Weather in {weatherData.name}
                              </h3>
                              <p style={{ color: textColor }}>
                                Temperature: {weatherData.main.temp}°C
                              </p>
                              <p style={{ color: textColor }}>
                                Pressure: {weatherData.main.pressure} hPa
                              </p>
                              <p style={{ color: textColor }}>
                                Description:{" "}
                                {weatherData.weather[0].description}
                              </p>
                              <p style={{ color: textColor }}>
                                Wind Speed: {weatherData.wind.speed} m/s
                              </p>
                              <p style={{ color: textColor }}>
                                Wind Direction: {weatherData.wind.deg}°
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                              }}
                            >
                              <Progress
                                type="dashboard"
                                percent={weatherData.main.humidity}
                                format={(percent) => (
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: textColor,
                                    }}
                                  >
                                    Humidity: {percent}%
                                  </span>
                                )}
                              />
                              <Progress
                                type="dashboard"
                                percent={
                                  weatherData.clouds
                                    ? weatherData.clouds.all
                                    : 0
                                }
                                format={(percent) => (
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: textColor,
                                    }}
                                  >
                                    Cloudiness: {percent}%
                                  </span>
                                )}
                              />
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </>
                }
              />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </div>
        </Content>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>

        <Footer
          style={{
            textAlign: "center",
            backgroundColor,
            color: textColor,
            flexShrink: 0,
          }}
        >
          Design ©{new Date().getFullYear()} Created by Eva Ivanishcheva
        </Footer>

        <SignUpModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onFinish={handleFinish}
        />

        <WeatherData
          city={city}
          onWeatherData={setWeatherData}
          onLoading={setLoading}
          onError={setError}
        />
      </Layout>

      <style>
        {`
          @media (min-width: 600px) {
            .custom-content {
              text-align: center;
              margin: 0 auto
            }
          }
        `}
      </style>
    </Router>
  );
};

export default App;
