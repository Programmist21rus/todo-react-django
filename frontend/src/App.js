import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from "./Components/LoginForm";

class App extends React.Component {

    state = {
        token: undefined
    };


    setTokenn = (token) => {
        this.setState({token: token})
    }


    render() {
        return (
            <div>
                <LoginForm setTokenn={this.setTokenn} token={this.state.token}/>
            </div>

        );
    }
}

export default App;
