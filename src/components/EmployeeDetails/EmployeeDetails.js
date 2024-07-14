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
        return <div>Employee not found</div>;
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
        <Container>
            <Row>
                <Col>
                    <h2>{employee.name.first} {employee.name.last}</h2>
                    <p>Age: {employee.dob.age}</p>
                    <p>Gender: {employee.gender}</p>
                    <p>Username: {employee.login.username}</p>
                    <p>Registered: {new Date(employee.registered.date).toLocaleDateString()}</p>
                    <p>Country: {employee.location.country}</p>
                    <p>City: {employee.location.city}</p>
                    <p>Street: {employee.location.street.name} {employee.location.street.number}</p>
                    <p>Postcode: {employee.location.postcode}</p>
                    <p>Email: {employee.email}</p>
                    <p>Phone: {employee.phone}</p>
                    <p>Cell: {employee.cell}</p>
                    <Button onClick={handleFavoriteClick}>
                        {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                    </Button>
                    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
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
