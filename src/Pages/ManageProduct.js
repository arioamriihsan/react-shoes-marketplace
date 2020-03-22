import React, { Component } from 'react';
import { Table, Input, Button } from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'

class ManageProduct extends Component {
    state = { 
        data : [],
        selectedId : null
    }

    fetchData = () => {
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            this.setState({
                data: res.data
            })
            // console.log(this.state.data)
        })
        .catch(err => console.log(err))
    }
    
    componentDidMount() {this.fetchData()}

    confirmEdit = () => {
        // console.log(this)
        let name = this.editName.value
        let brand = this.editBrand.value
        let price = parseInt(this.editPrice.value)
        let category = this.editCategory.value
        let image = this.editImage.value

        Axios.put(`${API_URL}/products/${this.state.selectedId}`, {name, brand, price, category, image})
        .then(res => {
            console.log(res)
            this.setState({
                selectedId : null
            })
            this.fetchData()
        })
        .catch(err => console.log(err))
    }

    deleteData = (id, image) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            imageUrl : image,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then(res => {
                    console.log(res)
                    this.fetchData()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
            }
        })
    }

    renderProduct = () => {
        // console.log(this.state.data)
        return this.state.data.map(val => {
            if( val.id === this.state.selectedId ) {
                return(
                    <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>
                            <Input defaultValue={val.name} innerRef={(editName => this.editName = editName)}/>
                        </td>
                        <td>
                            <Input defaultValue={val.brand} innerRef={(editBrand => this.editBrand = editBrand)}/>
                        </td>
                        <td>
                            <Input defaultValue={val.price} innerRef={(editPrice => this.editPrice = editPrice)}/>
                        </td>
                        <td>
                            <Input defaultValue={val.category} innerRef={(editCategory => this.editCategory = editCategory)}/>
                        </td>
                        <td>
                            <Input defaultValue={val.image} innerRef={(editImage => this.editImage = editImage)}/>
                        </td>
                        <td>
                            <Button color='danger' onClick={() => this.setState({selectedId : null})}>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button color='primary' onClick={() => this.confirmEdit(val.id)}>
                                Save
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.brand}</td>
                    <td>{val.price}</td>
                    <td>{val.category}</td>
                    <td>
                        <img src={val.image} alt={val.name} style={{height: '160px', width: '200px'}}/>
                    </td>
                    <td>
                        <Button color="success" className='m-2' onClick={() => this.selectEdit(val.id)}>Edit</Button>
                        <Button color="danger" className='m-2' onClick={() => this.deleteData(val.id, val.image)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    selectEdit = id => this.setState({ selectedId : id })

    addProduct = () => {
        let name = this.name.value
        let brand = this.brand.value
        let price = this.price.value
        let category = this.category.value
        let image = this.image.value
        
        let productData = {
            name,
            brand,
            price,
            category,
            image
        }

        Axios.post(`${API_URL}/products`, productData)
        .then(res => {
            console.log(res.data)
            {this.fetchData()}
        })
        .catch(err => console.log(err))

        this.name.value = ''
        this.brand.value = ''
        this.price.value = ''
        this.category.value = ''
        this.image.value = ''
    }

    render() { 
        return (  
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='text-center'>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th className='text-center'>Image</th>
                            <th colSpan='2' className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProduct()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><Input placeholder='Name' innerRef={(name) => this.name = name}/></td>
                            <td><Input placeholder='Brand' innerRef={(brand) => this.brand = brand}/></td>
                            <td><Input type='number' placeholder='Price' innerRef={(price) => this.price = price}/></td>
                            <td>
                                <Input type='select' innerRef={(category) => this.category = category}>
                                    <option>Men</option>
                                    <option>Women</option>
                                    <option>Kids</option>
                                </Input>
                            </td>
                            <td><Input placeholder='Image' innerRef={(image) => this.image = image}/></td>
                            <td>
                                <Button onClick={this.addProduct} color="primary">Add Product</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

export default ManageProduct;