import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../../EmployeeContext';

const SearchBar = ({ resetInput }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { setCompanyAndFetchEmployees } = useContext(EmployeeContext);

    const handleSearch = () => {
        if (query.trim()) {
            const lowerCaseQuery = query.trim().toLowerCase();
            setCompanyAndFetchEmployees(lowerCaseQuery);
            navigate(`/?search=${lowerCaseQuery}`);
            resetInput(); 
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    useEffect(() => {
        setQuery('');
    }, [resetInput]);

    return (
        <Form className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5} className="d-flex p-0">
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter company name..."
                        className="bg-secondary text-light"
                        style={{
                            borderRadius: '0.25rem',
                            marginRight: '8px'
                        }}
                    />
                    <Button
                        variant="dark"
                        onClick={handleSearch}
                        style={{
                            borderRadius: '0.25rem'
                        }}
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBar;
