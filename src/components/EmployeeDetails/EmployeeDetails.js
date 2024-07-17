import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EmployeeContext } from '../../EmployeeContext';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const EmployeeDetails = () => {
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const index = parseInt(query.get('index'), 10);
    const { employees, favorites, initialEmployees, company, addFavorite, removeFavorite } = useContext(EmployeeContext);
    const [employee, setEmployee] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('/initial/employee')) {
            setEmployee(initialEmployees[index]);
        } else if (location.pathname.includes('/favs/employee')) {
            setEmployee(favorites[index]);
            setIsFavorite(true);
        } else if (location.pathname.includes('/employee')) {
            setEmployee(employees[index]);
            setIsFavorite(favorites.some(fav => fav.login.username === employees[index]?.login.username));
        }
    }, [location.pathname, index, employees, favorites, initialEmployees]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            const favIndex = favorites.findIndex(fav => fav.login.username === employee.login.username);
            removeFavorite(favIndex);

            if (location.pathname.includes('/favs/employee')) {
                navigate('/favs');
            } else {
                setIsFavorite(false);
            }
        } else {
            addFavorite(employee);
            setIsFavorite(true);
        }
    };

    if (!employee) {
        return <div className="text-light">Employee not found</div>;
    }

    const position = [employee.location.coordinates.latitude, employee.location.coordinates.longitude];
    const fullAddress = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}`;

    return (
        <Container className="my-4 bg-dark text-light p-4" style={{ borderRadius: '0.5rem' }}>
            <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center mb-4">
                    <img
                        src={employee.picture.large || "https://via.placeholder.com/150"}
                        alt={`${employee.name.first} ${employee.name.last}`}
                        style={{ objectFit: 'cover', height: '150px', width: '150px', borderRadius: '50%' }}
                    />
                </Col>
                <Col md={8}>
                    <h2>{employee.name.first} {employee.name.last}</h2>
                    <p>Age: {employee.dob.age}</p>
                    <p>Gender: {employee.gender}</p>
                    <p>Registered: {new Date(employee.registered.date).toLocaleDateString()}</p>
                    <p>Country: {employee.location.country}</p>
                    <p>City: {employee.location.city}</p>
                    <p>Street: {employee.location.street.name} {employee.location.street.number}</p>
                    <p>Postcode: {employee.location.postcode}</p>
                    <p>Email: {employee.email}</p>
                    <p>Phone: {employee.phone}</p>
                    <p>Cell: {employee.cell}</p>
                    <div className="d-flex justify-content-start mt-3">
                        <Button onClick={handleFavoriteClick} variant={isFavorite ? "danger" : "primary"} style={{ padding: '0.5rem 1rem' }}>
                            {isFavorite ? 'Unfavorite' : 'Favorite'}
                        </Button>
                        <Link to="/favs" className="btn btn-info" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
                            Go to Favorites
                        </Link>
                    </div>
                    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }} className="mt-4">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>
                                <img
                                    src={employee.picture.thumbnail}
                                    alt={`${employee.name.first} ${employee.name.last}`}
                                    style={{ objectFit: 'cover', height: '50px', width: '50px', borderRadius: '50%', marginBottom: '0.5rem' }}
                                />
                                <div>
                                    {employee.name.first} {employee.name.last} <br />
                                    {fullAddress}
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <Link to={`/?search=${company}`} className="btn btn-secondary mt-3">Back</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeDetails;
