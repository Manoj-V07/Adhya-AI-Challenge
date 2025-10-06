import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mockClassrooms } from "../data/mockData";

export default function ClassroomDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/classrooms");
        setData(res.data);
      } catch {
        setData(mockClassrooms);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-green-200 p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-5xl p-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-green-700">
          Classroom Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((cls) => (
            <div
              key={cls._id}
              onClick={() => navigate(`/classroom/${cls._id}`)}
              className="bg-white/80 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-green-700">
                {cls.department} - {cls.section}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Year: {cls.year} | Leader: {cls.leader}
              </p>

              <div className="text-sm text-gray-700">
                <p>Attendance: {cls.progress.attendance}%</p>
                <p>Event Participation: {cls.progress.eventParticipation}%</p>
                <p>Assignments: {cls.progress.assignmentCompletion}%</p>
                <p className="mt-2 font-semibold text-green-700">
                  Average: {cls.averageScore}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
