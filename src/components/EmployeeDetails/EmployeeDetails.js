import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EmployeeContext } from '../../EmployeeContext';
import 'leaflet/dist/leaflet.css';

const EmployeeDetails = () => {
    const { email } = useParams();
    const { employees, favorites, addFavorite, removeFavorite } = useContext(EmployeeContext);
    const employee = employees.find(emp => emp.email === email);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (employee) {
            setIsFavorite(favorites.some(fav => fav.email === employee.email));
        }
    }, [favorites, employee]);

    if (!employee) {
        return <div className="text-light">Employee not found</div>;
    }

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(employee.email);
        } else {
            addFavorite(employee);
        }
    };

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
                            {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                        </Button>
                        <Link to="/favorites" className="btn btn-info" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
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
                                {employee.name.first} {employee.name.last} <br /> {fullAddress}
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <Link to="/" className="btn btn-secondary mt-3">Back</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeDetails;
