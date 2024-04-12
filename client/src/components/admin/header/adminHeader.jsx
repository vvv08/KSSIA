import React from 'react';
import './adminHeader.scss';
import { useNavigate } from 'react-router-dom';

const AdminHeader = (props) => {
    const navigate = useNavigate();
  return (
    <>
        <div className="adminHeaderWrapper">
            <div className="adminHeaderContainer">
                <div className="adminHeaderTop">
                    <h1>Registered {props.name}</h1>
                </div>
                <div className="adminHeaderBottom">
                    <button className='adminButton_one' onClick = {() => {navigate(props.button_one_url)}}>View {props.button_one}</button>
                    <button className='adminButton_two' onClick = {() => {navigate(props.button_two_url)}}>View {props.button_two}</button>
                    <button className='adminButton_three' onClick = {() => {navigate(props.button_three_url)}}>Add {props.button_three}</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminHeader
