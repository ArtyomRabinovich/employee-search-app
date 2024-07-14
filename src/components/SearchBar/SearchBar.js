import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <Form className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5} className="d-flex p-0">
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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
