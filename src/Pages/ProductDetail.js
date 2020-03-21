import React, { Component } from 'react';

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// redux
import { connect } from 'react-redux'

// style
import Select from 'react-select'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'

class ProductDetail extends Component {
    state = { 
        data: {},
        sizes: [
            {value: 40, label: 40},
            {value: 41, label: 41},
            {value: 42, label: 42},
            {value: 43, label: 43},
            {value: 44, label: 44},
            {value: 45, label: 45},
            {value: 46, label: 46},
            {value: 47, label: 47},
            {value: 48, label: 48},
        ],
        selectedSize: false,
        sizeValue: 0
    }

    componentDidMount = () => {
        // console.log(this)
        let id = this.props.location.search.split('=')[1]
        // console.log(id)
        Axios.get(`${API_URL}/products/${id}`)
        .then(res => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
        .catch(err => console.log(err))
    }  

    selectedSize = sz => {
        // console.log(sz)
        let size = sz.value
        if(size !== 0) {
            this.setState({
                selectedSize: true,
                sizeValue: size
            })
        }
    }

    handleCart = () => {
        if (this.state.selectedSize) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Added to Cart',
                showConfirmButton: false,
                timer: 1500
            })
            let { name, id, price, image, category, brand } = this.state.data
            let addToCart = {
                name,
                idProduct: id,
                price,
                image,
                category,
                brand,
                size: this.state.sizeValue,
                userId: this.props.userId,
                count: 1
            }
            // console.log(addToCart)
            Axios.get(`${API_URL}/cart?userId=${addToCart.userId}&size=${addToCart.size}&idProduct=${addToCart.idProduct}`)
            .then(res => {
                // console.log(res)
                if (res.data.length > 0) {
                    Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {count: res.data[0].count + 1})
                    // .then(res => console.log(res))
                    // .catch(err => console.log(err))
                } else {
                    Axios.post(`${API_URL}/cart`, addToCart)
                    // .then(res => console.log(res))
                    // .catch(err => console.log(err))
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select your size'
            })
        }
    }

    render() { 
        let { data } = this.state
        return ( 
            <div className='row'>
                <div className='col-4'>
                    <img src={data.image} alt='Shoes' width='300px'/>
                </div>
                <div className='col-8'>
                    <div>Name: {data.name}</div>
                    <div>Brand: {data.brand}</div>
                    <div>Category: {data.category}</div>
                    <div>
                        Rp. 
                        {
                            data.price
                            ?
                            data.price.toLocaleString()
                            :
                            null
                        }
                    </div>
                    <div>
                        <Select className='mt-3' options={this.state.sizes} onChange={this.selectedSize}/>
                    </div>
                    <div>
                        <Button className='mt-3' color='primary' onClick={() => this.handleCart(this.selectedSize)}>Add To Cart</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        userId: state.auth.id
    }
}

export default connect(mapStateToProps)(ProductDetail);