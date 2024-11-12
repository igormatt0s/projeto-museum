import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { ListGroup } from 'react-bootstrap';
import './Aside.css';

const Aside = () => {
  const { departments, setSelectedDepartment } = useContext(GalleryContext);

  const handleDepartmentClick = (departmentId) => {
    setSelectedDepartment(departmentId); // Atualiza o estado para o departamento selecionado
  };

  return (
    <ListGroup>
      {departments.map((department) => (
        <ListGroup.Item 
          key={department.departmentId} 
          onClick={() => handleDepartmentClick(department.departmentId)}
          style={{ cursor: 'pointer' }}
        >
          {department.displayName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Aside;
