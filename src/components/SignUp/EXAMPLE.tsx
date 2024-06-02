// import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';




export const SignUp = () => {
    return (
        <Form>
            <Container fluid="md" className='mt-4'>
                <Row>
                    <Col lg={8} className='mx-auto'>

                        <h1>Sign Up</h1>

                        {/* Primera */}

                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="formGridName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Tu nombre" />
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="formGridLasName">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Tu apellido" />
                            </Form.Group>
                        </Row>

                        {/* Segunda  */}

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Número telefónico</Form.Label>
                                <Form.Control type="text" placeholder="Teléfono de contacto" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <Form.Label>Nombre del negocio</Form.Label>
                                <Form.Control type="text" placeholder="Nombre del negocio" />
                            </Form.Group>
                        </Row>

                        {/* Tercera */}

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPais">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control type="text" placeholder="Pais" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTipoNegocio">
                                <Form.Label>Tiipo de negocio</Form.Label>
                                <Form.Control type="password" placeholder="Tipo de negocio" />
                            </Form.Group>
                        </Row>

                        {/* Cuarta */}

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>


                    </Col>
                </Row>

            </Container>
        </Form>
    )
}
