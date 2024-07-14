import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <Form className="mb-4">
            <Row>
                <Col sm={10}>
                    <Form.Group controlId="formSearch">
                        <Form.Control
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter company name..."
                        />
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <Button variant="primary" onClick={handleSearch} block>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBar;
