import React from 'react'

// react-strap
import { Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap';

const CardHome = (props) => {
    let { name, image } = props
    return (
        <div>
            <Card inverse>
                <CardImg width="100%" src={image} alt='Card image cap' style={{height: '28em', objectFit: 'cover'}}/>
                <CardImgOverlay>
                    <div style={{height: '100%', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                        <CardTitle className='card-text'>
                            {name}
                        </CardTitle>
                    </div>
                </CardImgOverlay>
            </Card>
        </div>
    )
}

export default CardHome