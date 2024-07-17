import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import { EmployeeContext } from '../EmployeeContext';
import EmployeeCard from '../components/global/EmployeeCard';
import { Container, Row, Col } from 'react-bootstrap';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const HomePage = () => {
    const { employees, initialEmployees, setCompanyAndFetchEmployees } = useContext(EmployeeContext);
    const query = useQuery();
    const searchQuery = query.get('search');
    const [hasSearched, setHasSearched] = useState(false);
    const [resetInputKey, setResetInputKey] = useState(0);

    useEffect(() => {
        if (searchQuery) {
            setCompanyAndFetchEmployees(searchQuery);
            setHasSearched(true);
        } else {
            setHasSearched(false);
        }
    }, [searchQuery, setCompanyAndFetchEmployees]);

    const resetInput = () => {
        setResetInputKey(prevKey => prevKey + 1);
    };

    return (
        <div className="p-0">
            {!hasSearched && (
                <div
                    className="strip"
                    style={{
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/10/06/09/32/relationship-2822420_1280.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        width: '100vw',
                        position: 'relative',
                        left: '50%',
                        right: '50%',
                        marginLeft: '-50vw',
                        marginRight: '-50vw',
                        marginTop: '-30px'
                    }}
                />
            )}
            <div className="container mt-5">
                <SearchBar key={resetInputKey} resetInput={resetInput} />
                {!hasSearched && (
                    <div className="container mt-3 text-center">
                        <h2>Employees of the month:</h2>
                        <Container className="my-4">
                            <Row className="justify-content-center">
                                {initialEmployees.map((employee, index) => (
                                    <Col md={6} lg={4} className="d-flex mb-4" key={employee.email}>
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <EmployeeCard employee={employee} index={index} context="initial" />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                )}
                {hasSearched && searchQuery && (
                    <div className="container mt-3">
                        <h2>Search for employees of {searchQuery.toUpperCase()}</h2>
                        <EmployeeList employees={employees} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
