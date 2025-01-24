import React, { useState, useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import './InsertArtwork.css';

const InsertArtwork = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [artistNationality, setArtistNationality] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [objectName, setObjectName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { insertArtwork } = useContext(GalleryContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await insertArtwork({ image, title, artist, year, artistNationality, city, country, objectName, department });
      setImage('');
      setTitle('');
      setArtist('');
      setYear('');
      setArtistNationality('');
      setCity('');
      setCountry('');
      setObjectName('');
      setDepartment('');

      setSuccess('Artwork inserted successfully!');
    } catch (err) {
      setError('Failed to insert artwork.');
    }
  };

  return (
    <div className="insert-artwork-container">
      <h1 className="my-4 text-center">Insert New Artwork</h1>
      {/* Mensagens de erro e sucesso */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {success && <Alert variant="success" className="text-center" style={{backgroundColor: 'rgb(211, 253, 200)'}}>{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group>
            <Form.Label>URL Image</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Artist's Nationality</Form.Label>
              <Form.Control
                type="text"
                value={artistNationality}
                onChange={(e) => setArtistNationality(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Object Type</Form.Label>
              <Form.Control
                type="text"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="w-100 mt-5 custom-search-button">Insert</Button>
      </Form>
    </div>
  );
};

export default InsertArtwork;
