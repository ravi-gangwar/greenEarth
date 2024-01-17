import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactAction } from '../actions/contactAction';
import { Link } from 'react-router-dom';
import '../style/contact.css';

function Contact() {
  const dispatch = useDispatch();
  const contactState = useSelector((state) => state.contactMessageReducer);
  const { loading, success } = contactState;



  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const userId = currentUser?.data?._id || "";
  const [contactMessage, setContactMessage] = useState({
    userId: userId,
    name: '',
    message: '',
  });

  const handleMessage = () => {
    if(!currentUser){
      alert('Please login to send message');
      window.location.href = '/login';
      return;
    }
    if (contactMessage.name !== '' && contactMessage.message !== '') {
      dispatch(contactAction(contactMessage));
    } else {
      alert('Fill all the fields');
    }
  };

  useEffect(() => {
    if (success === true) {
      alert('Your message has been sent successfully');
    }
  }, [success]);
  

  return (
    <div className='contactPage'>
      <h1 className='heading1'>Connect With Us</h1>
      <p>
        We would love to respond to your queries and help you succeed. Feel free to get in touch with us.
      </p>
      <div className='ContactContainer'>
        <div className='contact-left'>
          <h3>Contact Us</h3>
          <p>Feel free to contact us and we will get back to you as soon as we can</p>
          <div className='contact-input-fields'>
            <input
              type='text'
              id='name'
              placeholder='Name'
              onChange={(e) => setContactMessage({ ...contactMessage, name: e.target.value })}
            />
            <textarea
              type='text'
              id='message'
              placeholder='Tell us about it'
              onChange={(e) => setContactMessage({ ...contactMessage, message: e.target.value })}
            />
            <button className='contactBtns' type='submit' onClick={handleMessage}>
              {loading ? 'Loading...' : 'Send'}
            </button>
          </div>
        </div>
        <div className='contact-right'>
          <h3>Reach Us</h3>
          <h4>Opening Hours</h4>
          <p>Monday-Friday</p>
          <p>9am-5pm</p>
          <p>Weekend</p>
          <p>Closed</p>
          <br />
          <h4>Address</h4>
          <p>
            Pranveer Singh Institute of Technology
            <br />
            Bhauti, Kanpur
          </p>
          <br />
          <h4>Support</h4>
          <Link to='mailto:green.earth.miniproject@gmail.com' className="link-tag"> <p className='contact-link-tag'>
            earthgreen42453632@gmail.com
          </p></Link>
          <Link to='tel:' className="link-tag">
            <p>10101010110</p></Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
