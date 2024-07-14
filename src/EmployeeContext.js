import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();
export let FAVS = []; 

const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const fetchEmployees = async (query = '') => {
        try {
            const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${query}`);
            setEmployees(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        FAVS = savedFavorites;
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        FAVS = favorites;
    }, [favorites]);

    const addFavorite = (employee) => {
        const newFavorites = [...favorites, employee];
        setFavorites(newFavorites);
        FAVS = newFavorites;
    };

    const removeFavorite = (email) => {
        const newFavorites = favorites.filter(fav => fav.email !== email);
        setFavorites(newFavorites);
        FAVS = newFavorites;
    };

    return (
        <EmployeeContext.Provider value={{ employees, favorites, fetchEmployees, addFavorite, removeFavorite }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeContext, EmployeeProvider };
