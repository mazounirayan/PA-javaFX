import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeComponent: React.FC = () => {
  const [employee, setEmployee] = useState<any>(null); // State to hold employee data

  useEffect(() => {
    // Function to fetch employee data
    const fetchEmployee = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contacts/'); // Replace URL with your JSON Server endpoint
        setEmployee(response.data); // Update state with fetched employee data
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee(); // Call fetchEmployee function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Role:</strong> {employee.role}</p>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeComponent;
