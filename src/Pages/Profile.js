import React, { Component } from 'react';
import {API_URL} from '../Support/API_URL'
import Axios from 'axios'
import { connect } from 'react-redux'

import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

class Profile extends Component {
    state = {  }

    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let id = JSON.parse(token)
        Axios.get(`${API_URL}/users?id=${id.id}`)
        .then(res => {
            console.log(res.data)
            
        })
        .catch(err => console.log(err))  
    }

    onBtnLogin = () => {
        // console.log(this.password.value)
        // console.log(this.confirmPass.value)
        let pass = this.password.value
        let confirmPass = this.confirmPass.value

        if (pass === confirmPass) {
            Axios.get(`${API_URL}/users?id=${this.props.id}`)
            .then(res => {
                console.log(res.data)
                Axios.patch(`${API_URL}/users/${res.data[0].id}`, {password: confirmPass})
                .then(res=> {
                    console.log(res.data)
                    window.alert('success change password')
                })
            })
            .catch(err => console.log(err))
        } else {
            window.alert('password didnt match')
        }

    }

    render() { 
        // console.log(this.props.id)
        return ( 
            <div className='d-flex justify-content-center'>
            <Form className='mt-3'> 
                <FormGroup>
                    <Label for='exampleUsername'>Change Password</Label>
                    <Input type='password' name='password' id='pass' placeholder='Password' innerRef={(pass) => this.password = pass}/>
                </FormGroup>
                <FormGroup>
                    <Label for='examplePassword'>Confirm Password</Label>
                    <Input type='password' name='confirmPass' id='confirmPass' placeholder='Confirm Password' innerRef={(cPass) => this.confirmPass = cPass}/>
                </FormGroup>
                <div className='d-flex justify-content-around'>
                    <Button onClick={this.onBtnLogin}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
        );
    }
}

const stateToProps = state => {
    return{
        id: state.auth.id
    }
}

export default connect(stateToProps)(Profile);