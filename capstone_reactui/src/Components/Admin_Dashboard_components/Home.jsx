import React, { useEffect, useState } from "react";

import "./Admincss.css";

import {
  BsPeopleFill,
  BsFillPersonBadgeFill,
  BsBellFill,
} from "react-icons/bs";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import axios from "axios";

import { useSelector } from "react-redux";

import {
  USER_COUNT_URL,
  PROVIDER_COUNT_URL,
  PENDING_COUNT_URL,
  WEEKLY_USERS_URL,
  WEEKLY_PROVIDERS_URL,
  BOOKING_COUNTS_URL,
  DASHBOARD_TITLE,
  USERS_TITLE,
  PROVIDERS_TITLE,
  ALERTS_TITLE,
  REGISTRATIONS_CHART_TITLE,
  BOOKINGS_CHART_TITLE,
  USERS_BAR_COLOR,
  PROVIDERS_BAR_COLOR,
  BOOKINGS_LINE_COLOR,
} from "../GlobalData/Constant"; // Import the constants

function Home() {
  const [userCount, setUserCount] = useState(0);

  const [providerCount, setProviderCount] = useState(0);

  const [alertCount, setAlertCount] = useState(0);

  const [barChartData, setBarChartData] = useState([]);

  const [lineChartData, setLineChartData] = useState([]);

  const user = useSelector((state) => state.user.user);

  const jwttoken = user.token;

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(USER_COUNT_URL, config);

        setUserCount(response.data.length);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchProviderCount = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(PROVIDER_COUNT_URL, config);

        setProviderCount(response.data.length);
      } catch (error) {
        console.error("Error fetching provider count:", error);
      }
    };

    const fetchAlertCount = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(PENDING_COUNT_URL, config);

        setAlertCount(response.data);
      } catch (error) {
        console.error("Error fetching alert count:", error);
      }
    };

    const fetchWeeklyRegistrations = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const [userResponse, providerResponse] = await Promise.all([
          axios.get(WEEKLY_USERS_URL, config),

          axios.get(WEEKLY_PROVIDERS_URL, config),
        ]);

        const userData = userResponse.data;

        const providerData = providerResponse.data;

        const combinedData = userData.map((userItem, index) => ({
          day: userItem.day,

          users: userItem.count,

          providers:
            providerData.find(
              (providerItem) => providerItem.day === userItem.day
            )?.count || 0,
        }));

        setBarChartData(combinedData);
      } catch (error) {
        console.error("Error fetching weekly registration data:", error);
      }
    };

    const fetchBookingCounts = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(BOOKING_COUNTS_URL, config);

        const transformedData = Object.entries(response.data).map(
          ([day, count]) => ({
            day,

            count,
          })
        );

        setLineChartData(transformedData);
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchUserCount();

    fetchProviderCount();

    fetchAlertCount();

    fetchWeeklyRegistrations();

    fetchBookingCounts();
  }, [jwttoken]);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 style={{ color: "black" }}>{DASHBOARD_TITLE}</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>{USERS_TITLE}</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{userCount}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>{PROVIDERS_TITLE}</h3>
            <BsFillPersonBadgeFill className="card_icon" />
          </div>
          <h1>{providerCount}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>{ALERTS_TITLE}</h3>
            <BsBellFill className="card_icon" />
          </div>
          <h1>{alertCount}</h1>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{
                top: 5,

                right: 30,

                left: 20,

                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill={USERS_BAR_COLOR} />
              <Bar dataKey="providers" fill={PROVIDERS_BAR_COLOR} />
            </BarChart>
          </ResponsiveContainer>
          <h3>{REGISTRATIONS_CHART_TITLE}</h3>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineChartData}
              margin={{
                top: 5,

                right: 30,

                left: 20,

                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke={BOOKINGS_LINE_COLOR}
              />
            </LineChart>
          </ResponsiveContainer>
          <h3>{BOOKINGS_CHART_TITLE}</h3>
        </div>
      </div>
    </main>
  );
}

export default Home;
