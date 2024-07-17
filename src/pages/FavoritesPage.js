import React, { useContext } from 'react';
import { EmployeeContext } from '../EmployeeContext';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeCard from '../components/global/EmployeeCard';

const FavoritesPage = () => {
    const { favorites } = useContext(EmployeeContext);

    return (
        <Container>
            <h2>Your Favorite Employees</h2>
            {favorites.length === 0 ? (
                <p>You have no favorite employees.</p>
            ) : (
                <Row>
                    {favorites.map((employee, index) => (
                        <Col md={4} key={employee.email}>
                            <EmployeeCard employee={employee} index={index} context="favorites" />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default FavoritesPage;
