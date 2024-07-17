import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { EmployeeContext } from '../../EmployeeContext';

const EmployeeCard = ({ employee, index, context }) => {
    const { company, favorites, addFavorite, removeFavorite } = useContext(EmployeeContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.some(fav => fav.login.username === employee.login.username));
    }, [favorites, employee.login.username]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            const favIndex = favorites.findIndex(fav => fav.login.username === employee.login.username);
            removeFavorite(favIndex);
        } else {
            addFavorite(employee);
        }
    };

    let linkPath = `/employee?company=${company}&index=${index}`;
    if (context === 'initial') {
        linkPath = `/initial/employee?index=${index}`;
    } else if (context === 'favorites') {
        linkPath = `/favs/employee?index=${index}`;
    }

    return (
        <Card className="mb-4 shadow-sm bg-dark text-light" style={{ borderRadius: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', padding: '1rem' }}>
                <Card.Img
                    variant="top"
                    src={employee.picture.large || "https://via.placeholder.com/150"}
                    alt={`${employee.name.first} ${employee.name.last}`}
                    style={{ objectFit: 'cover', height: '150px', width: '150px', borderRadius: '50%' }}
                />
            </div>
            <Card.Body>
                <Card.Title>{employee.name.first} {employee.name.last}</Card.Title>
                <Card.Text>
                    Age: {employee.dob.age} <br />
                    Location: {employee.location.city}, {employee.location.country}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant={isFavorite ? "danger" : "primary"} onClick={handleFavoriteClick}>
                        {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                    </Button>
                    <Link to={linkPath} className="btn btn-secondary">
                        More Info
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EmployeeCard;
