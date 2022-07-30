import React, {Component} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import '../App.css'

class Navibar extends Component {


    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand className="me-auto">Шикин Сергей Артемович 1 Вариант</Navbar.Brand>
                        <Nav>
                            <Button variant="primary" className="me-3" onClick={this.props.handleClick}>Sign Out</Button>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Navibar;
