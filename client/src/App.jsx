import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import ClassroomDashboard from './pages/ClassroomDashboard';
import ClassDetails from './pages/ClassDetails';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import ClassLeaderDashboard from './components/ClassLeaderDashboard';
import NSSVolunteerDashboard from './components/NSSVolunteerDashboard';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/student"
          element={isAuthenticated ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/faculty"
          element={isAuthenticated ? <FacultyDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/class-leader"
          element={isAuthenticated ? <ClassLeaderDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/nss-volunteer"
          element={isAuthenticated ? <NSSVolunteerDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/classroom" element={<ClassroomDashboard />} />
        <Route path="/classroom/:id" element={<ClassDetails />} />
      </Routes>
    </Router>
  );
};

export default App;