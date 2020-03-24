import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

// children
import Header from './Components/Header'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import ProductPage from './Pages/ProductPage'
import ProductDetail from './Pages/ProductDetail'
import Transaction from './Pages/Transaction';
import Footer from './Components/Footer'
import ManageProduct from './Pages/ManageProduct';
import NoMatch from './Pages/NoMatch'
// import ProductMen from './Pages/ProductMen';

// API
import Axios from 'axios'
import { API_URL } from './Support/API_URL'

// redux
import { connect } from 'react-redux'
import { Login } from './Redux/Action'

// style 
import './App.css'

class App extends Component {
	state = {}

	componentDidMount() {
		let token = localStorage.getItem('token')
		if (token) {
			// console.log(JSON.parse(token))
			let tokenParse = JSON.parse(token)
			Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.password}`)
				.then((res) => {
					let { username, email, role, id } = res.data[0]
					this.props.Login({
						username,
						email,
						role,
						id
					})
				})
				.catch(err => console.log(err))
		}
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/login' component={LoginPage} />
					<Route path='/register' component={Register} />
					<Route path='/my-cart' component={Cart} />
					<Route path='/product' component={ProductPage} exact />
					{/* <Route path='/product/men' component={ProductMen} /> */}
					<Route path='/product-detail' component={ProductDetail} />
					<Route path='/transaction' component={Transaction} />
					<Route path='/manage-products' component={ManageProduct} />
					<Route component={NoMatch}/>
				</Switch>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(null, { Login })(App);