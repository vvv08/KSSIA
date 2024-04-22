import React from 'react';
import './aboutMemberCard.scss';

const AboutMemberCard = ({name, designation,company,address,number,email,image}) => {
  return (
    <>
      <div className="aboutMemberCardWrapper">
        <div className="aboutMemberCardContainer">
          <div className="aboutMemberCardTop">
            <img src={image} />
          </div>
          <div className="aboutMemberCardBottom">
            <p className='aboutMemberCardName'>{name}</p>
            <p className='aboutMemberCardDesignation'>{designation}</p>
            <p className='aboutMemberCardCompany'>{company}</p>
            <p className='aboutMemberCardAddress'>{address}</p>
            <p className='aboutMemberCardNumber'>{number}</p>
            <p className='aboutMemberCardMail'>{email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMemberCard
