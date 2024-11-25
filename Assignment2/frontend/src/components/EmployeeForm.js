import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee, getEmployeeById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', position: '', salary: '', department: '', date_of_joining: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await getEmployeeById(id);
          setFormData(response.data);
        } catch (err) {
          console.error('Error fetching employee:', err);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, formData);
        alert('Employee updated successfully');
      } else {
        await addEmployee(formData);
        alert('Employee added successfully');
      }
      navigate('/employees');
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
      <input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
      <input name="date_of_joining" type="date" value={formData.date_of_joining} onChange={handleChange} required />
      <button type="submit">{id ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default EmployeeForm;
