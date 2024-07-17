// src/EmployeeContext.js
import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [initialEmployees, setInitialEmployees] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [company, setCompany] = useState('');

    const fetchEmployees = useCallback(async (query) => {
        try {
            const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${query}`);
            setEmployees(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const setCompanyAndFetchEmployees = useCallback(async (query) => {
        setCompany(query);
        await fetchEmployees(query);
    }, [fetchEmployees]);

    useEffect(() => {
        const fetchInitialEmployees = async () => {
            try {
                const response = await axios.get(`https://randomuser.me/api/?results=2&seed=abc`);
                setInitialEmployees(response.data.results);
            } catch (error) {
                console.error('Error fetching initial employees:', error);
            }
        };
        fetchInitialEmployees();
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (employee) => {
        const newFavorites = [...favorites, employee];
        setFavorites(newFavorites);
    };

    const removeFavorite = (index) => {
        const newFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(newFavorites);
    };

    return (
        <EmployeeContext.Provider value={{
            employees,
            initialEmployees,
            favorites,
            company,
            setCompanyAndFetchEmployees,
            addFavorite,
            removeFavorite
        }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeContext, EmployeeProvider };
