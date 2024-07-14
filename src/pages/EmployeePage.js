import React from 'react';
import EmployeeDetails from '../components/EmployeeDetails/EmployeeDetails';
import { Container } from 'react-bootstrap';

const EmployeePage = ({ employees }) => {
    return (
        <Container>
            <EmployeeDetails employees={employees} />
        </Container>
    );
};

export default EmployeePage;
