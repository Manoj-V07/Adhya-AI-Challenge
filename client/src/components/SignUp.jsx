import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const roles = ['Student', 'Faculty', 'NSS Leader'];
const subRoles = ['Normal Student', 'Class Leader', 'NSS Member'];
const departments = [
  'CSE', 'IT', 'AIDS', 'AIML', 'MECH', 'CSE (AIML)', 'CYB', 'CSBS', 'CCE'
];
const sections = ['A', 'B', 'C', 'D'];
const years = ['1', '2', '3', '4'];

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  subRole: '',
  department: '',
  section: '',
  year: '',
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation
  useEffect(() => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is required.';
    else if (form.name.length < 2) newErrors.name = 'Name must be at least 2 characters.';

    if (!form.email) newErrors.email = 'Email is required.';
    else if (!form.email.endsWith('@sece.ac.in')) newErrors.email = 'Only SECE institutional emails are allowed.';

    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm password.';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (!form.role) newErrors.role = 'Role is required.';
    if (form.role === 'Student' && !form.subRole) newErrors.subRole = 'Sub Role is required for students.';
    if (!form.department) newErrors.department = 'Department is required.';
    if (!form.section) newErrors.section = 'Section is required.';
    if (!form.year) newErrors.year = 'Year is required.';

    setErrors(newErrors);
  }, [form]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true, email: true, password: true, confirmPassword: true,
      role: true, subRole: true, department: true, section: true, year: true,
    });
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          department: form.department,
          section: form.section,
          year: form.year,
          role: form.role,
          subRole: form.role === 'Student' ? form.subRole : null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrors({ api: data.message || 'Signup failed.' });
      }
    } catch {
      setErrors({ api: 'Network error.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 rounded transition-all duration-200 border-2 outline-none
     ${touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-600'
        : touched[field] && !errors[field]
        ? 'border-green-500 focus:border-green-600'
        : 'border-gray-300 focus:border-blue-400'
      }
     bg-white focus:shadow-lg`;

  const icon = (field) =>
    touched[field] && errors[field] ? (
      <ExclamationCircleIcon className="w-5 h-5 text-red-500 absolute right-3 top-3" />
    ) : touched[field] && !errors[field] ? (
      <CheckCircleIcon className="w-5 h-5 text-green-500 absolute right-3 top-3" />
    ) : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-green-100">
      <form
        className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-green-700 tracking-tight">
          SECE Signup
        </h2>
        {errors.api && <div className="mb-4 text-red-600 text-center animate-pulse">{errors.api}</div>}

        {/* Name */}
        <div className="mb-5 relative">
          <input
            className={inputClass('name')}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {icon('name')}
          {touched.name && errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-5 relative">
          <input
            className={inputClass('email')}
            type="email"
            name="email"
            placeholder="SECE Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {icon('email')}
          {touched.email && errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <input
            className={inputClass('password')}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {icon('password')}
          {touched.password && errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 relative">
          <input
            className={inputClass('confirmPassword')}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {icon('confirmPassword')}
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Role */}
        <div className="mb-5 relative">
          <select
            className={inputClass('role')}
            name="role"
            value={form.role}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Role</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {icon('role')}
          {touched.role && errors.role && <div className="text-xs text-red-500 mt-1">{errors.role}</div>}
        </div>

        {/* Sub Role (only for Students) */}
        {form.role === 'Student' && (
          <div className="mb-5 relative">
            <select
              className={inputClass('subRole')}
              name="subRole"
              value={form.subRole}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Sub Role</option>
              {subRoles.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {icon('subRole')}
            {touched.subRole && errors.subRole && (
              <div className="text-xs text-red-500 mt-1">{errors.subRole}</div>
            )}
          </div>
        )}

        {/* Department */}
        <div className="mb-5 relative">
          <select
            className={inputClass('department')}
            name="department"
            value={form.department}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {icon('department')}
          {touched.department && errors.department && (
            <div className="text-xs text-red-500 mt-1">{errors.department}</div>
          )}
        </div>

        {/* Section */}
        <div className="mb-5 relative">
          <select
            className={inputClass('section')}
            name="section"
            value={form.section}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Section</option>
            {sections.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {icon('section')}
          {touched.section && errors.section && <div className="text-xs text-red-500 mt-1">{errors.section}</div>}
        </div>

        {/* Year */}
        <div className="mb-6 relative">
          <select
            className={inputClass('year')}
            name="year"
            value={form.year}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          {icon('year')}
          {touched.year && errors.year && <div className="text-xs text-red-500 mt-1">{errors.year}</div>}
        </div>

        <button
          className="w-full py-2 rounded-lg font-bold text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </form>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default Signup;
