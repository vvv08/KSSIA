import React from 'react';
import './companyCountCard.scss';

const CompanyCountCard = (props) => {
  const title = props.title;
  const number = props.number
  return (
    <>
        <div className="companyCountCardContainer">
            <div className="companyCountCardHeader">
              <p>
                {title}
              </p>
            </div>
            <div className="companyCountCardNumber">
              <p>
                {number}
              </p>
            </div>
        </div>
    </>
  )
}

export default CompanyCountCard
