import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PersonForm from "./Person/PersonForm";
import PeopleList from "./Person/PersonList";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 leading-tight py-2">
            Person Management
          </h1>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="flex justify-center gap-8">
              <li>
                <Link
                  to="/"
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/add-person"
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all"
                >
                  Add Person
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all"
                >
                  People List
                </Link>
              </li>
            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <h2 className="text-2xl text-center text-gray-700">
                  Welcome to Person Management
                </h2>
              }
            />
            <Route path="/add-person" element={<PersonForm />} />
            <Route path="/people" element={<PeopleList />} />
            <Route path="/people/edit/:id" element={<PersonForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;