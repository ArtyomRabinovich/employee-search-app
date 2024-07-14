import React, { useContext } from 'react';
import { EmployeeContext } from '../../EmployeeContext';
import EmployeeCard from '../global/EmployeeCard';
import { Container, Row, Col } from 'react-bootstrap';

const EmployeeList = () => {
    const { employees } = useContext(EmployeeContext);

    if (!employees || employees.length === 0) {
        return <div>Loading employees...</div>;
    }

    const displayedEmployees = employees.slice(0, 9);

    return (
        <Container>
            <Row>
                {displayedEmployees.map(employee => (
                    <Col md={4} key={employee.email}>
                        <EmployeeCard employee={employee} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EmployeeList;
