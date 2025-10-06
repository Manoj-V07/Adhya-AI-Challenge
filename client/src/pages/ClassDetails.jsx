import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { mockClassrooms } from "../data/mockData";

export default function ClassDetails() {
  const { id } = useParams();
  const [cls, setCls] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/classrooms/${id}`);
        setCls(res.data);
      } catch {
        const fallback = mockClassrooms.find((c) => c._id === id);
        setCls(fallback);
      }
    };
    fetchClass();
  }, [id]);

  if (!cls) return <p className="p-6 text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-green-200 p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-3xl p-8 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-green-700 mb-4">
          {cls.department} - {cls.section} | Year {cls.year}
        </h1>
        <p className="text-gray-600 mb-4">Leader: {cls.leader}</p>

        <div className="bg-white/80 rounded-lg p-4 mb-4 shadow-md">
          <h3 className="font-semibold text-green-700 mb-2">Progress Overview</h3>
          <ul className="text-gray-700 text-sm">
            <li>Attendance: {cls.progress.attendance}%</li>
            <li>Event Participation: {cls.progress.eventParticipation}%</li>
            <li>Assignments: {cls.progress.assignmentCompletion}%</li>
            <li className="mt-1 font-semibold text-green-700">
              Average Score: {cls.averageScore}%
            </li>
          </ul>
        </div>

        <div className="bg-white/80 rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-green-700 mb-2">Student Hierarchy</h3>
          <ul className="text-gray-700 text-sm">
            <li><strong>Leader:</strong> {cls.leader}</li>
            <li><strong>NSS Members:</strong> {cls.nssMembers}</li>
            <li><strong>Normal Students:</strong> {cls.normalStudents}</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/classroom"
            className="text-green-700 font-semibold hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
