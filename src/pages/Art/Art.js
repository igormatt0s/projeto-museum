import React, { useContext } from 'react'
import { GalleryContext } from '../../context/GalleryContext'
import { Container, Row, Col, Card } from 'react-bootstrap'
import './Art.css'

const Art = () => {
  const { artworks } = useContext(GalleryContext);

  return (
    <Container className='art-container'>
      <h1 className="my-4 text-center">Galeria de Arte</h1>
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

export default Art;