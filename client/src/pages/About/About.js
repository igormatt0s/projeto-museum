import React from 'react';
import './About.css';
import atm_facade from '../../assets/images/atm_facade.jpg';
import buddha from '../../assets/images/buddha.jpg';
import atm_curatorial_roman from '../../assets/images/atm_curatorial_roman.jpg';
import atm_policies from '../../assets/images/atm_policies.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = () => {
    return (
        <main className="about">
            <Container>
                <section className="resume">
                    <Row className="align-items-center">
                        <Col md={6} className="resumeText">
                            <h1>The Met</h1>
                            <p>The Met presents over 5,000 years of art from around the world for everyone to experience and enjoy.</p>
                        </Col>
                        <Col md={6} className="text-center custom-spacing-col">
                            <Image src={atm_facade} className="imageMet" alt="Uma vista da fachada neoclássica do The Met Fifth Avenue" fluid />
                        </Col>
                    </Row>
                </section>

                <section className="info py-5">
                    <h2 className="mb-4">About the Museum</h2>
                    <p>The Museum is located in two iconic sites in New York City - The Met Fifth Avenue and The Met Cloisters. Millions of people also participate in The Met experience online.</p>
                    <p>Since its founding in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. Every day, art comes alive in the Museum's galleries and through its exhibitions and events, revealing new ideas and unexpected connections across time and across cultures.</p>
                    
                    <div className="mission my-5 bg-light border">
                        <Row className="align-items-center">
                            <Col md={5}>
                                <Image src={buddha} className="imageMission" alt="Buddha de Medicine Bhaishajyaguru" fluid />
                            </Col>
                            <Col md={7} className="missionText">
                                <h3>Mission</h3>
                                <p>The Metropolitan Museum of Art collects, studies, conserves, and presents significant works of art across time and cultures in order to connect all people to creativity, knowledge, ideas, and one another.</p>
                            </Col>
                        </Row>
                    </div>

                    <div className="apiText">
                        <Row className="rowImages mb-5">
                            <Col xs={6}>
                                <Image src={atm_curatorial_roman} className="imageMet" alt="Arte grega e romana" fluid />
                            </Col>
                            <Col xs={6}>
                                <Image src={atm_policies} className="imageMet" alt="Escultura romana" fluid />
                            </Col>
                        </Row>
                        <h3>Metropolitan Museum of Art Collection API</h3>
                        <p>The Metropolitan Museum of Art provides selected datasets of information on over 470,000 works of art in its collection for unrestricted commercial and non-commercial use. To the extent possible under law, the Metropolitan Museum of Art has waived all copyright and related or neighboring rights to this dataset using the Creative Commons Zero license. This work is published in the United States of America. These selected datasets are now available for use in any media without permission or fee; they also include identifying data for copyrighted works of art. The datasets support research, use, and interaction with the Museum's collection.</p>
                        <p>The Met's open access datasets are available through our API. The API (RESTful web service in JSON format) provides access to all of The Met's open access data and the corresponding high-resolution images (JPEG format) that are in the public domain.</p>
                    </div>
                </section>
            </Container>
        </main>
    );
};

export default About;
