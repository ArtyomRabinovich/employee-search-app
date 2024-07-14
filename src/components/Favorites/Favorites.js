import React, { useContext } from 'react';
import { EmployeeContext } from '../../EmployeeContext';
import EmployeeCard from '../global/EmployeeCard';
import { Container, Row, Col } from 'react-bootstrap';

const Favorites = () => {
    const { favorites } = useContext(EmployeeContext);

    return (
        <Container>
            <h2>Your Favorite Employees</h2>
            {favorites.length === 0 ? (
                <p>You have no favorite employees.</p>
            ) : (
                <Row>
                    {favorites.map(employee => (
                        <Col md={4} key={employee.email}>
                            <EmployeeCard employee={employee} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Favorites;
