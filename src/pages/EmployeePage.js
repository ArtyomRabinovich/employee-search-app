import React, { useContext, useEffect, useState } from 'react';
import EmployeeDetails from '../components/EmployeeDetails/EmployeeDetails';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { EmployeeContext } from '../EmployeeContext';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const EmployeePage = () => {
    const { pathname } = useLocation();
    const query = useQuery();
    const { employees, favorites, initialEmployees, company, setCompanyAndFetchEmployees } = useContext(EmployeeContext);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const companyQuery = query.get('company');
        const index = parseInt(query.get('index'), 10);

        console.log('Pathname:', pathname);
        console.log('Initial Employees:', initialEmployees);
        console.log('Index:', index);

        if (pathname.includes('/initial/employee')) {
            setEmployee(initialEmployees[index]);
        } else if (companyQuery && companyQuery !== company) {
            setCompanyAndFetchEmployees(companyQuery).then(() => {
                setEmployee(employees[index]);
            });
        } else if (pathname.includes('/favs/employee')) {
            setEmployee(favorites[index]);
        } else {
            setEmployee(employees[index]);
        }
    }, [pathname, query, company, setCompanyAndFetchEmployees, employees, favorites, initialEmployees]);

    if (!employee) {
        return <div className="text-light">Employee not found</div>;
    }

    return (
        <Container>
            <EmployeeDetails employee={employee} />
        </Container>
    );
};

export default EmployeePage;
