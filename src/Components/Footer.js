import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#1E2535', color: '#FFF' }}>
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6">
                            <h5 className="title">Shoesilo</h5>
                            <p>
                                Here you can use rows and columns here to organize your footer
                                content.
                </p>
                        </MDBCol>
                        <MDBCol md="3">
                            <h5 className="title">Links</h5>
                            <ul>
                                <li className="list-unstyled" style={{ textDecoration: 'none' }}>
                                    <a href="#!" style={{ textTransform: 'capitalize' }}>men</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!" style={{ textTransform: 'capitalize' }}>women</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!" style={{ textTransform: 'capitalize' }}>kids</a>
                                </li>
                            </ul>
                        </MDBCol>
                        <MDBCol md="3">
                            <h5 className="title">Follow Us</h5>
                            <ul>
                                <li className="list-unstyled" style={{ textDecoration: 'none' }}>
                                    <a href="#!" style={{ textTransform: 'capitalize' }}> <FaInstagram /> instagram </a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!" style={{ textTransform: 'capitalize' }}><FaFacebookF /> facebook </a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!" style={{ textTransform: 'capitalize' }}><FaTwitter /> twitter </a>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="#!"> shoesilo.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    );
}

export default Footer;