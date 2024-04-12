import React from 'react';
import './itemsList.scss';
import ItemCard from '../itemCard/itemCard';

const ItemsList = (props) => {
  return (
    <>
        <div className="itemsListWrapper">
            <div className="itemsListContainer">
                <div className="itemsListContent">
                    {props.data && props.data.map((obj,index) => {
                        return(
                            <ItemCard key={index} details = {obj} href = {`${props.href}/${obj.name}/${obj.id}`}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default ItemsList
