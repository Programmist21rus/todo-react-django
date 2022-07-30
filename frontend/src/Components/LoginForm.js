import React, {Component} from 'react';
import Navibar from "./Navibar";
import Form from 'react-bootstrap/Form';
import {Button, Container} from "react-bootstrap";
import '../App.css'
import Navigator from './Navigator'
import Records from './Tables/Records';
import NewAuthor from './Tables/NewAuthor';
import NewRecord from './Tables/NewRecord';
import NewTag from './Tables/NewTag';


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.log = null;
        this.pas = null;

        this.state = {
            visibility: true,
        };

        this.state_error = {
            vis: false
        }

        this.Login = this.Login.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    changeWindow = (new_window) => {
        this.setState({activeWindow: new_window})
    }


    handleClick() {
        this.setState(state => ({
            visibility: !state.visibility
        }));
        this.setState({vis: false})
    }

    Login = async () => {
        let username = this.log.value;
        let password = this.pas.value;

        try {
            const response = await fetch('https://shikinserezha.pythonanywhere.com/auth/token/login/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });

            let s_token = await response.json();
            if (response.ok) {
                this.setState(state => ({
                    visibility: !state.visibility
                }));
                this.props.setTokenn(s_token.auth_token);
            } else {
                console.log("Не зашли!");
                this.setState({vis: true});
            }
        } catch
            (e) {
            console.log("Ошибка")
        }
    }


    render() {
        if (this.state.visibility) {
            return (
                <div>
                    <Container>
                        <h1 style={{textAlign: "center", marginBottom: "30px", marginTop: "25%"}}>Форма логина</h1>
                        <div className="login">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" name="username" placeholder="Enter username"
                                                  ref={ref => this.log = ref}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" name="password" placeholder="Password"
                                                  ref={ref => this.pas = ref}/>
                                </Form.Group>
                                <Button onClick={this.Login} variant="primary">
                                    Login
                                </Button>
                                {this.state.vis ? <div className="error">Неверный логин или пароль!</div> :
                                    <div></div>}
                            </Form>
                        </div>

                    </Container>
                </div>
            );
        } else {
            return (
                <div>
                    <Navibar handleClick={this.handleClick}/>
                    <Container>
                        <div>
                            <div className='MainScreen'>
                                <Navigator changeWindow={this.changeWindow}/>
                                {(() => {
                                    switch (this.state.activeWindow) {
                                        case 'records':
                                            return (
                                                <Records token={this.props.token}/>
                                            )
                                        case 'newauthor':
                                            return (
                                                <NewAuthor token={this.props.token}/>
                                            )
                                        case 'newrecord':
                                            return (
                                                <NewRecord token={this.props.token}/>
                                            )
                                        case 'newtag':
                                            return (
                                                <NewTag token={this.props.token}/>
                                            )
                                        default:
                                            return (
                                                <Records token={this.props.token}/>
                                            )
                                    }

                                })()}
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
    }
}

export default LoginForm;