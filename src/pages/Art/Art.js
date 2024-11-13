import React, { useContext } from 'react'
import { GalleryContext } from '../../context/GalleryContext'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Art.css'

const Art = () => {
  const { artworks } = useContext(GalleryContext);

  return (
    <Container className='art-container'>
      <h1 className="my-4 text-center">Galeria de Arte</h1>
      {artworks.length === 0 ? (
        <Alert variant="info" className="text-center">
          Nenhuma pesquisa foi realizada. Por favor, faça uma busca para ver as principais obras.
        </Alert>
      ) : (
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
      )}
    </Container>
  );
};

export default Art;