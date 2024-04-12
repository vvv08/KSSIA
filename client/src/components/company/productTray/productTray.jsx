import React from 'react';
import './productTray.scss';
import PlainCard from '../../simpleItemCard/plainCard';

const ProductTray = (props) => {
    const products = props.data;
  return (
    <>
        <div className="productTrayWrapper">
            <div className="productTrayContainer">
                <div className="productTrayHeader">
                    <h2>Products</h2>
                </div>
                <div className="productTrayContent">
                {
                    products.map((obj,index) => {
                        return(
                            <PlainCard key={index} data = {obj}/>
                        )
                    })
                }
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductTray
