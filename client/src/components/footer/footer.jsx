import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <>
      <div className="footerWrapper">
        <div className="footerContainer">
          <div className="footerLeft">
            <h2>KSSIA Products</h2>
            <p>© 2024 KSSIA. All Rights Reserved</p>
          </div>
          <div className="footerRight">
            <Link to= '/aboutUs' style={{ textDecoration: "none",color:"var(--kssiaBlue)" }}><p>About Us</p></Link>
            <p>kssiapkd@rediffmail.com</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
