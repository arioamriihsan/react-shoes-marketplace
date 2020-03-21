// main react
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// redux
import { connect } from 'react-redux'

// Table react-strap
import { Table, Button, Form, FormGroup, Label, Input, CustomInput, Col } from 'reactstrap'

// style
import Swal from 'sweetalert2'
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';

class Cart extends Component {
	state = {
		data: [],
		grandTotal: 0,
		isCheckOut: false,
		selectedCourier: null,
		finishCart: false
	}

	componentDidMount = () => {
		this.setState({
			grandTotal: 0
		})
		let token = localStorage.getItem('token')
		// console.log(token) 
		let tokenUser = JSON.parse(token)
		// console.log(tokenUser)
		Axios.get(`${API_URL}/cart?userId=${tokenUser.id}`)
			.then(res => {
				this.setState({
					data: res.data
				});
				this.countGrandTotal()
			})
			.catch(err => console.log(err))
	}

	componentWillUnmount = () => this.setState({ grandTotal: 0 })

	countGrandTotal = () => {
		// console.log(this.state.data)
		this.state.data.forEach(val => {
			this.setState(prevState => {
				// console.log(prevState)
				return {
					grandTotal: prevState.grandTotal + (val.price * val.count)
				}
			})
		})
	}

	fetchData = () => {
		Axios.get(`${API_URL}/cart`)
			.then(res => this.setState({ data: res.data }))
			.catch(err => console.log(err))
	}

	deleteData = (id, img, num) => {
		// console.log(num)
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			imageUrl: img,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(result => {
			if (result.value) {
				Axios.delete(`${API_URL}/cart/${id}`)
					.then(() => {
						// console.log(res)
						this.fetchData()
						Swal.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						)
					})
			} else if (!result.value && num) {
				// sebelumnya num undefined dan saat ini menjadi -1
				this.handleBtn(id, (num * num))
			}
		}).catch(err => console.log(err))
	}

	selectCourier = e => {
		// console.log(courier.target.value)
		let courier = e.target.value
		this.setState({ selectedCourier : courier })
		// console.log(this.state.selectedCourier)
	}

	handleBtn = (id, num) => {
		// id cart = 1
		Axios.get(`${API_URL}/cart?userId=${this.props.userId}&id=${id}`)
			.then(res => {
				Axios.patch(`${API_URL}/cart/${res.data[0].id}`, { count: res.data[0].count + num })
					.then(res => {
						// console.log(res.data)
						if (res.data.count === 0) {
							this.deleteData(id, res.data.image, num)
						}
						this.componentDidMount()
					})
			})
			.catch(err => console.log(err))
	}

	addToCheckOut = () => {
		this.setState({ isCheckOut : true })
	}

	addToTransaction = () => {
		// console.log(this)
		if (this.state.selectedCourier !== null && this.address.value !== '') {
			Swal.fire({
				title: 'Continue to Transaction?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			}).then(result => {
				if (result.value) {
					Axios.get(`${API_URL}/cart?userId=${this.props.userId}`)
						.then(res => {
							// console.log(res.data) // Array
							let date = new Date()
							let invoice = `INV/${date.getTime()}`
							let time = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
							let address = this.address.value
							let courier = this.state.selectedCourier
							
							let obj = {
								invoice,
								date: time,
								userId: this.props.userId,
								address,
								courier,
								product: res.data,
								grandTotal: this.state.grandTotal
							}
							Axios.post(`${API_URL}/transaction`, obj)
								.then(res => {
									// console.log(res)
								})
								.catch(err => console.log(err))
							res.data.forEach(val => {
								Axios.delete(`${API_URL}/cart/${val.id}`)
									.then(res => {
										console.log(res)
										this.setState({ finishCart: true })
									})
									.catch(err => console.log(err))
							})
						})
						.catch(err => console.log(err))
				}
			})
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please fill your address and courier'
			})
		}
	}

	renderTable = () => {
		return this.state.data.map(val => {
			return (
				<tr key={val.id}>
					<td>{val.id}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt='gambar sepatu' height='60px' width='60px' />
					</td>
					<td>{val.size}</td>
					<td>
						<div className='text-center'>
							<Button color='warning' onClick={() => this.handleBtn(val.id, -1)}>-</Button>
							<span className='m-3'>{val.count}</span>
							<Button color='danger' onClick={() => this.handleBtn(val.id, 1)}>+</Button>
						</div>
					</td>
					<td>Rp {(val.price * val.count).toLocaleString()}</td>
					<td>
						<Button color='danger' onClick={() => this.deleteData(val.id, val.image)}>
							<FaTrashAlt />
						</Button>
					</td>
				</tr>
			)
		})
	}

	render() {
		// console.log(this.state.selectedCourier)
		// console.log(this.state.grandTotal)
		// console.log(this)
		if (this.state.finishCart) {
			return(
				<Redirect to='/transaction' />
			)
		} else if (this.state.data.length === 0) {
			return (
				<img className='rounded mx-auto d-block' src='https://www.seekpng.com/png/full/117-1170538_404-your-cart-is-empty.png' alt='Empty Cart' />
			)
		} 
		return (
			<div>
				<div className='text-center'>
					<h3>Cart Page</h3>
				</div>
				<Table dark>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Image</th>
							<th>Size</th>
							<th className='text-center'>Quantity</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.renderTable()}
					</tbody>
					<tfoot>
						{
							this.state.isCheckOut
							?
							<tr>
								<th colSpan='5' style={{ textAlign: 'right' }}>Grand Total</th>
								<th>Rp {(this.state.grandTotal).toLocaleString()}</th>
								<th>
									<div>
										<Form>
											<FormGroup row>
												<Col sm={6}>
													<Input type="text" name="address" id="address" placeholder="Address" innerRef={(address) => this.address = address} />
												</Col>
											</FormGroup>
											<FormGroup>
												<Label for="selectCourier">Choose Courier</Label>
												<div>
													<CustomInput type='radio' id='gojek' name='courier' label='Gojek' value='Gojek' onChange={this.selectCourier}/>
													<CustomInput type='radio' id='grab' name='courier' label='Grab' value='Grab' onChange={this.selectCourier}/>
													<CustomInput type='radio' id='anteraja' name='courier' label='AnterAja' value='Anteraja' onChange={this.selectCourier}/>
												</div>
											</FormGroup>
											<Button color='primary' onClick={this.addToTransaction}><FaShoppingCart/> Buy</Button>
										</Form>
									</div>
								</th>
							</tr>
							:
							<tr>
								<th colSpan='5' style={{ textAlign: 'right' }}>Grand Total</th>
								<th>Rp {(this.state.grandTotal).toLocaleString()}</th>
								<th>
									<Button color='primary' onClick={this.addToCheckOut}>
										Check Out
									</Button>
								</th>
							</tr>
						}
					</tfoot>
				</Table>
			</div>
		);
	}
}

const stateToProps = state => {
	return {
		userId: state.auth.id
	}
}

export default connect(stateToProps)(Cart);