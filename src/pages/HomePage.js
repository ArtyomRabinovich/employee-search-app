import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import { EmployeeContext } from '../EmployeeContext';
import { Container } from 'react-bootstrap';

const HomePage = () => {
    const { employees, fetchEmployees } = useContext(EmployeeContext);

    return (
        <Container>
            <SearchBar onSearch={fetchEmployees} />
            <EmployeeList employees={employees} />
        </Container>
    );
};

export default HomePage;
