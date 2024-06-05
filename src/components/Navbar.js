import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Study Path</Link>
        </h1>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Home</Link>
          <Link to="/study-plan" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors">Study Plan</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-400" />}
            <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
