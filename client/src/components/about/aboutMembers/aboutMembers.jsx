import React from 'react';
import './aboutMembers.scss';
import AboutMemberCard from '../aboutMemberCard/aboutMemberCard';

const AboutMembers = () => {
  return (
    <>
        <div className="kssia_aboutMembersWrapper">
            <div className="kssia_aboutMembersContainer">
                <div className="kssia_aboutMembersHeader">
                    <h2>Palakkad district committee</h2>
                </div>
                <div className="kssia_aboutMembersContent">
                    <AboutMemberCard name = {"Sri. T.V.Mammu"} company = {"M/s.Noushad Bricks Industries"} designation = {"District President"} address = {"Perumudiyur, Pattambi, Palakkad"} number = {"9946746470"} email = {"tvnoushad@gmail.com"} image = {"/assets/committe/T-V-Mammu--PKD.jpg"}/>
                    <AboutMemberCard name = {"Sri. Sunil Joseph"} company = {"M/s. Sark Cables Pvt. Ltd"} designation = {"District Secretary"} address = {"NIDA, Kanjikode, Palakkad - 678621"} number = {"9447751312"} email = {"sarkcables@gmail.com"} image = {"/assets/committe/sunil-joseph.jpg"}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutMembers
