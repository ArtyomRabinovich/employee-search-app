import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import FavoritesPage from './pages/FavoritesPage';
import { EmployeeProvider } from './EmployeeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
    return (
        <EmployeeProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100 bg-secondary text-light">
                    <Header />
                    <main className="flex-grow-1 container my-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/employee" element={<EmployeePage />} />
                            <Route path="/initial/employee" element={<EmployeePage />} />
                            <Route path="/favs/employee" element={<EmployeePage />} />
                            <Route path="/favs" element={<FavoritesPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </EmployeeProvider>
    );
};

export default App;
