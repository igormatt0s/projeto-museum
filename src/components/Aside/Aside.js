import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryContext } from '../../context/GalleryContext';
import { ListGroup } from 'react-bootstrap';
import './Aside.css';

const Aside = () => {
  const { departments, setSelectedDepartment } = useContext(GalleryContext);
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleDepartmentClick = (departmentId, departmentName) => {
    setSelectedDepartment(departmentId, departmentName); // Atualiza o estado do departamento selecionado
    navigate(`/department/${departmentId}`); // Redireciona para a página de DepartmentGallery
  };

  return (
    <ListGroup>
      {departments.map((department) => (
        <ListGroup.Item 
          key={department.departmentId} 
          onClick={() => handleDepartmentClick(department.departmentId, department.displayName)}
          style={{ cursor: 'pointer' }}
        >
          {department.displayName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Aside;
