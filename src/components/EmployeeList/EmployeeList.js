import React, { useContext } from 'react';
import { EmployeeContext } from '../../EmployeeContext';
import EmployeeCard from '../global/EmployeeCard';
import { Container, Row, Col } from 'react-bootstrap';

const EmployeeList = () => {
    const { employees } = useContext(EmployeeContext);

    if (!employees || employees.length === 0) {
        return <div className="text-light">Loading employees...</div>;
    }

    return (
        <Container className="my-4">
            <Row>
                {employees.map((employee, index) => (
                    <Col md={4} key={employee.email}>
                        <EmployeeCard employee={employee} index={index} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EmployeeList;
