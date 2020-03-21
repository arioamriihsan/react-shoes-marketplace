import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// form react-strap
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// redux
import { connect } from 'react-redux'
import { Login } from '../Redux/Action'

// swalfire
import Swal from 'sweetalert2'

class LoginPage extends Component {
    state = {  }

    onBtnLogin = () => {
        // console.log(this)
        let username = this.username.value
        let password = this.password.value

        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res) => {
            // console.log(res)
            if(res.data.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User does not exist or invalid password'
                })
            } else {
                let { id, username, email, role } = res.data[0]
                this.props.Login({
                    id,
                    username,
                    email,
                    role
                })
                localStorage.setItem('token', JSON.stringify({username: res.data[0].username, password: res.data[0].password, id: res.data[0].id}))
            }
        })
        .catch(err => console.log(err))
    }

    render() { 
        if(this.props.logged) {
            return(
                <Redirect to='/'/>
            )
        }
        return ( 
            <div className='d-flex justify-content-center'>
                <Form className='mt-3'> 
                    <FormGroup>
                        <Label for='exampleUsername'>Username</Label>
                        <Input type='text' name='username' id='username' placeholder='Username' innerRef={(uName) => this.username = uName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='examplePassword'>Password</Label>
                        <Input type='password' name='password' id='password' placeholder='Password' innerRef={(pass) => this.password = pass}/>
                    </FormGroup>
                    <div className='d-flex justify-content-around'>
                        <Button onClick={this.onBtnLogin}>
                            Login
                        </Button>
                        <Link to='register'>
                            <Button>
                                Register
                            </Button>
                        </Link>  
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged: state.auth.logged
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);