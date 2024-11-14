import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DepartmentGallery.css';

const DepartmentGallery = () => {
  const { artworks, selectedDepartment, currentPage, setPage } = useContext(GalleryContext);

  const handleNextPage = () => setPage(currentPage + 1);
  const handlePrevPage = () => setPage(currentPage > 1 ? currentPage - 1 : 1);

  return (
    <Container className='department-gallery'>
      <h2 className="my-4 text-center">Works of the Department {selectedDepartment.name}</h2>
      <Row>
        {artworks.map((artwork) => (
          <Col md={4} lg={3} key={artwork.objectID} className="mb-4">
            <Link to={`/art/${artwork.objectID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card>
                <Card.Img variant="top" src={artwork.primaryImageSmall || 'placeholder.jpg'} />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>{artwork.artistDisplayName}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <div className="pagination-controls mt-4 text-center">
        <Button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          style={{
            backgroundColor: currentPage === 1 ? '#484848' : '#222', 
            color: 'white',
            cursor: currentPage === 1 ? 'default' : 'pointer',
          }}
        >
          Previous
        </Button>
        <span className="page-indicator mx-3">Page {currentPage}</span>
        <Button 
          onClick={handleNextPage}
          style={{
            backgroundColor: '#222', 
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default DepartmentGallery;
