import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { EmployeeContext } from '../../EmployeeContext';
import '../../css/EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
    const { favorites, addFavorite, removeFavorite } = useContext(EmployeeContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.some(fav => fav.email === employee.email));
    }, [favorites, employee.email]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(employee.email);
        } else {
            addFavorite(employee);
        }
    };

    return (
        <Card className="employee-card mb-4">
            <div className="employee-card-img-wrapper">
                <Card.Img
                    variant="top"
                    src={employee.picture.thumbnail || "https://via.placeholder.com/150"}
                    alt={`${employee.name.first} ${employee.name.last}`}
                    className="employee-card-img"
                />
            </div>
            <Card.Body>
                <Card.Title>{employee.name.first} {employee.name.last}</Card.Title>
                <Card.Text>
                    Age: {employee.dob.age} <br />
                    Location: {employee.location.city}, {employee.location.country}
                </Card.Text>
                <Button variant={isFavorite ? "danger" : "primary"} onClick={handleFavoriteClick}>
                    {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                </Button>
                <Link to={`/employee/${employee.email}`} className="btn btn-secondary ml-2">More Info</Link>
            </Card.Body>
        </Card>
    );
};

export default EmployeeCard;
