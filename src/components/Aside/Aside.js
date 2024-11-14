import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryContext } from '../../context/GalleryContext';
import { ListGroup } from 'react-bootstrap';
import './Aside.css';

const Aside = () => {
  const { departments, setSelectedDepartment } = useContext(GalleryContext);
  const navigate = useNavigate();

  const handleDepartmentClick = (departmentId, departmentName) => {
    setSelectedDepartment(departmentId, departmentName);
    navigate(`/department/${departmentId}`);
  };

  return (
    <div className="aside">
      <h2>Departments</h2>
      <ListGroup>
        {departments.map((department) => (
          <ListGroup.Item
            key={department.departmentId}
            onClick={() => handleDepartmentClick(department.departmentId, department.displayName)}
          >
            {department.displayName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Aside;
