import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './DepartmentGallery.css';

const DepartmentGallery = () => {
  const { artworks, selectedDepartment } = useContext(GalleryContext);

  return (
    <Container className='department-gallery'>
      <h2 className="my-4 text-center">Obras do Departamento {selectedDepartment.name}</h2>
      <Row>
        {artworks.map((artwork) => (
          <Col md={4} lg={3} key={artwork.objectID} className="mb-4">
            <Card>
              <Card.Img variant="top" src={artwork.primaryImageSmall || 'placeholder.jpg'} />
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>{artwork.artistDisplayName}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DepartmentGallery;
