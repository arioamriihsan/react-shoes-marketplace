import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const CardProduct = (props) => {
    let { name, image, brand, price } = props
    return(
        <div className='m-3' style={{textAlign: 'center', justifyContent: 'center', width: '220px'}}>
            <Card className='box-glow'>
                <div className='d-flex justify-content-center'>
                    <CardImg top src={image} alt='Card image cap' style={{height: '188px', width: '200px'}}/>
                </div>
                <CardBody>
                    <CardTitle style={{fontWeight: 'bolder', fontSize: '14px', height: '42px'}}>{name}</CardTitle>
                    <CardSubtitle style={{fontWeight: 'bolder', fontSize: '14px'}}>{brand}</CardSubtitle>
                    <CardText style={{fontSize: '16px'}}>Rp. {price.toLocaleString()}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default CardProduct