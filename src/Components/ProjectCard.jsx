import React,{ useState } from 'react'
import { Card,Button,Modal, Row, Col } from 'react-bootstrap'
import ProjectOne from '../Assets/projectOne.png'
import { BASE_URL } from '../services/baseurl';


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
           { project&& <Card className='shadow mb-5 btn' onClick={handleShow}>
                <Card.Img style={{height:'200px'}}  variant="top" src={ project?`${BASE_URL}/uploads/${project?.projectImage}`:ProjectOne} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{project?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                        <img style={{height:'200px'}} className='img-fluid' src={ project?`${BASE_URL}/uploads/${project?.projectImage}`:ProjectOne} />
                        </Col>
                        <Col md={6}>
                            <h2 className='text-danger'></h2>
                            <p className='fw-bolder'>Project Overview : <span className='fw-bolder text-success'>{project?.overview}</span></p>
                        <p className=''>Language Used : <span className='fw-bolder text-primary'>{project?.languages}</span></p>
                        </Col>
                    </Row>
                    <div className='mt-3'>
                        <a href={project?.github} target='_blank' className='me-3 btn'><i className='fa-brands fa-github fa-2x'></i></a>
                        <a href={project?.linkedin} target='_blank' className='me-3 btn'><i className='fa-solid fa-link fa-2x'></i></a>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard