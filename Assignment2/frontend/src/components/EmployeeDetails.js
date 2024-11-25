import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../services/api';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        alert('Failed to fetch employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Salary:</strong> ${employee.salary}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
      <button onClick={() => navigate('/employees')}>Back to Employee List</button>
    </div>
  );
};

export default EmployeeDetails;
