// main
import React from 'react';

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// style
import { Table, Button } from 'reactstrap'
import Swal from 'sweetalert2';

class Transaction extends React.Component {
    state = {
        data: []
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let userId = JSON.parse(token)
        this.fetchData(userId.id)
    }

    fetchData = userId => {
        Axios.get(`${API_URL}/transaction?userId=${userId}`)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => console.log(err))
    }

    renderTransaction = () => {
        return this.state.data.map(val => {
            return (
                <React.Fragment key={val.id}>
                    <tr className="table-secondary" key={val.id}>
                        <td colSpan='4'>{val.id}</td>
                        <td colSpan='4'>{val.date}</td>
                        <td colSpan='4'>{val.time}</td>
                        <td colSpan='4'>{val.invoice}</td>
                        <td colSpan='4'>{val.address}</td>
                        <td>Rp. {val.grandTotal.toLocaleString()}</td>
                        <td>
                            <Button className='rounded mx-auto d-block' color='success' onClick={() => this.showDetail(val.product, val.grandTotal, val.date, val.time, val.invoice, val.courier, val.address)}>
                                Details
                            </Button>
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
    }

    showDetail = (product, price, date, time, inv, courier, address) => {
        let innerHtml = `<strong><p>Transaction Detail</p><p>${inv}</p><p>${date}, ${time}</p></strong><hr/>`
        product.forEach(val => {
            innerHtml += `<img width='30%' src='${val.image}' alt='foto'/>
            <h5>${val.name}</h5>
            <p>Size: ${val.size}</p>
            <p>Quantity: ${val.count} (@ Rp.${val.price.toLocaleString()})</p>
            <p>Subtotal: Rp. ${(val.count * val.price).toLocaleString()}</p>
            <hr/>`
        })
        innerHtml += `<strong><p>Grand Total: Rp. ${price.toLocaleString()}</p><p>Destination: ${address}</p><p>Courier: ${courier}</p></strong>`
        Swal.fire({ html: innerHtml })
    }

    render() { 
        if(this.state.data.length === 0 ){
            return(
                <img className='rounded mx-auto d-block' src='https://i.pinimg.com/236x/1c/ff/d9/1cffd9d30776049fdd0726e97a6c1527---life-minion.jpg' alt='Empty Transaction'/>
            )
        }else{
            return ( 
                <div>
                    <Table style={{'width': '75%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                        <thead>
                            <tr>
                                <th colSpan='4'>Id</th>
                                <th colSpan='4'>Date</th>
                                <th colSpan='4'>Time</th>
                                <th colSpan='4'>Invoice</th>
                                <th colSpan='4'>Destination</th>
                                <th>Total Price</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTransaction()}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default Transaction;