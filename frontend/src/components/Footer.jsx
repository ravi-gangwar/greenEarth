import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../style/footer.css"
const Footer = () => {
    let currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">greenEarth</h1>
        
        <h2>Contact</h2>
        
        <address>
           UP Kanpur, PSIT Kanpur 209305, <br />
              
          <Link className="footer__btn" to="mailto:green.earth.mini.project@gmail.com">Email Us</Link>
        </address>
      </div>
      
      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Media</h2>

          <ul className="nav__ul">
            <li>
              <Link to="#">Online</Link>
            </li>

            <li>
              <Link to="#">Print</Link>
            </li>
                
            <li>
              <Link to="#">Alternative Ads</Link>
            </li>
          </ul>
        </li>
        
        <li className="nav__item nav__item--extra">
          <h2 className="nav__title">Technologies</h2>
          
          <ul className="nav__ul nav__ul--extra">
            <li>
              <Link to="#">HTML</Link>
            </li>
            
            <li>
              <Link to="#">CSS</Link>
            </li>
            
            <li>
              <Link to="#">JavaScript</Link>
            </li>
            
            <li>
              <Link to="#">React</Link>
            </li>
            
            <li>
              <Link to="#">Node js</Link>
            </li>
            
            <li>
              <Link to="#">Express js</Link>
            </li>
            <li>
              <Link to="#">MongoDb</Link>
            </li>
          </ul>
        </li>
        
        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>
          
          <ul className="nav__ul">
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            
            <li>
              <Link to="#">Terms of Use</Link>
            </li>
            
            <li>
              <Link to="#">Sitemap</Link>
            </li>
          </ul>
        </li>
      </ul>
      
      <div className="legal">
        <p>&copy; {currentYear} Something. All rights reserved.</p>
        
        <div className="legal__links">
            <Link to={"https://twitter.com/_Ravi_Gangwar"} target="_blank"><FaTwitter className="links-fopter"/></Link>
            <Link to={"https://www.linkedin.com/in/ravi-gangwar/"} target="_blank"><FaLinkedin className="links-fopter"/></Link>
            <Link to={"https://twitter.com/_Ravi_Gangwar"} target="_blank"><FaFacebook className="links-fopter"/></Link>
            <Link to={"https://www.instagram.com/_ravi_gangwar/"} target="_blank"><FaInstagram className="links-fopter"/></Link>
            <Link to={""} target="_blank"><FaWhatsappSquare className="links-fopter"/></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
