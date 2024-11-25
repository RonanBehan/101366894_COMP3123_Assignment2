import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      alert('Employee deleted successfully');
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={() => navigate('/employees/add')}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.position}</td>
              <td>
                <button onClick={() => navigate(`/employees/edit/${emp._id}`)}>Edit</button>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
