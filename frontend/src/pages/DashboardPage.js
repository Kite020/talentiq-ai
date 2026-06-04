import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function DashboardPage() {

  const [stats, setStats] = useState({
    total_resumes: 0,
    total_jobs: 0,
    total_matches: 0,
    average_match_score: 0
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          "https://talentiq-ai-backend.onrender.com/dashboard-stats",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setStats(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  const chartData = [

    {
      name: "Resumes",
      value: stats.total_resumes
    },

    {
      name: "Jobs",
      value: stats.total_jobs
    },

    {
      name: "Matches",
      value: stats.total_matches
    }

  ];

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">

        <div className="mb-4">

          <h2>

            Welcome back 👋

          </h2>

          <p
            className="text-muted"
          >

            TalentIQ AI Recruitment Dashboard

          </p>

        </div>

          <div className="row g-4">

            <div className="col-md-3">
            <StatCard
              title="Total Resumes"
              value={stats.total_resumes}
              icon="📄"
            />
            </div>

            <div className="col-md-3">
            <StatCard
              title="Total Jobs"
              value={stats.total_jobs}
              icon="💼"
            />
            </div>

            <div className="col-md-3">
            <StatCard
              title="Total Matches"
              value={stats.total_matches}
              icon="🎯"
            />

            </div>

            <div className="col-md-3">
            <StatCard
              title="Average Score"
              value={`${stats.average_match_score}%`}
              icon="⭐"
            />
            </div>

          </div>

          <div className="card shadow mt-5">

            <div className="card-body">

              <h4 className="mb-4">

                Platform Analytics

              </h4>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={chartData}
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>
          <div className="card shadow mt-4">

            <div className="card-body">

              <h4 className="mb-4">

                Match Quality

              </h4>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie

                    data={[
                      {
                        name: "Excellent",
                        value: stats.excellent
                      },
                      {
                        name: "Good",
                        value: stats.good
                      },
                      {
                        name: "Average",
                        value: stats.average
                      },
                      {
                        name: "Poor",
                        value: stats.poor
                      }
                    ]}

                    dataKey="value"

                    nameKey="name"

                    outerRadius={100}

                    label
                  >

                    <Cell />
                    <Cell />
                    <Cell />
                    <Cell />

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;