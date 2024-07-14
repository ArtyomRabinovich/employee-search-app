import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import FavoritesPage from './pages/FavoritesPage';
import { EmployeeProvider } from './EmployeeContext';
import './index.css';

const App = () => {
    return (
        <EmployeeProvider>
            <Router>
                <div>
                    <Header />
                    <main className="container my-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/employee/:email" element={<EmployeePage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </EmployeeProvider>
    );
};

export default App;
