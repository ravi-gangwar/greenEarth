import '../style/aboutPage.css';
import { Link } from 'react-router-dom';


function About() {

  return (
    <div className='about-page'>
      <div className='about-div-website'>
        <div className='what-greenearth'>
          <h1>What is greenEarth?</h1>
        </div>
        <div className='about-greenearth'>
        <p className='about-website-paragraph'>
          I am introduce you to greenEarth, a revolutionary platform designed to merge your online shopping experience with environmental sustainability.
          Much like industry giants such as Amazon, greenEarth is your one-stop-shop for a unique and impactful shopping journey. Our distinctive offering allows you to purchase trees at your convenience, specifying the quantity and providing a valid location for our dedicated team to plant them on your behalf.
          At greenEarth, we believe in turning every transaction into a meaningful contribution to the planet. When you make a tree purchase, our team ensures its seamless integration into the specified location, contributing to the global effort for reforestation.
          However, we recognize the responsibility that comes with planting trees. To address this, we've developed an innovative solution — the greenEarth <Link to="/get-membership">Membership</Link> Plan. By becoming a member, you not only gain exclusive benefits but also actively participate in the ongoing care of your planted trees.
          Our membership includes a commitment to water the trees daily or as needed, ensuring their healthy growth and long-term sustainability. As a member, you'll receive regular updates on the progress of your trees and the positive impact they are making on the environment.
          Join us in making a lasting difference. Purchase your greenEarth <Link to="/get-membership">Membership</Link> today and become a vital part of the sustainable movement that goes beyond online transactions.
          Thank you for considering greenEarth, where every purchase plants a seed of change.
        </p>
        <h2 className='readMore-about'>click ⬆ to read more!!</h2>
          <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/green-earth.png?raw=true" alt="" />
      </div>
      </div>
         <div className='objectives'>
          <h1>Our Objectives</h1>
            <div className='objective-cards'>
              <div className='objective-card'>
                    <h2>Vision</h2>
                    <p> At greenEarth, our vision is to 
                    cultivate a global community dedicated to
                     environmental stewardship. We envision a world
                      where individuals and corporations unite
                       to create a sustainable future, 
                       one tree at a time. Our dream is to 
                       be at the forefront of the green revolution, 
                       inspiring positive change and fostering a
                        deep sense of responsibility towards the planet.
                    </p>
                    
                </div>
              <div className='objective-card'>
                  <h2>Mission</h2>
                  <p>Our mission at greenEarth is to empower individuals and businesses to make a tangible impact on the environment through conscious consumerism. We are committed to providing a seamless platform where every purchase translates into the planting of trees. By fostering a sense of environmental responsibility, we strive to contribute significantly to reforestation efforts globally. Our mission extends beyond commerce; it is about creating a movement that transcends borders and backgrounds, connecting people through a shared commitment to the planet.
                  </p>
                  
              </div>
              <div className='objective-card'>
                  <h2>Objective</h2>
                  <p> 
                  1. Reforestation Impact: We aim to plant a specified number of trees each year, contributing actively to reforestation projects and biodiversity conservation. <br />

2.Customer Engagement: Foster a strong sense of environmental awareness and responsibility among our customers through informative content, updates on tree-planting initiatives, and engagement opportunities. <br />

3. Innovation in Sustainability: Continuously explore and implement innovative solutions that minimize our ecological footprint, from sustainable packaging to eco-friendly practices in our operations. <br />

4. Community Building: Establish a vibrant greenEarth community that actively participates in and advocates for environmental conservation, fostering a sense of belonging and shared purpose. <br />

5. Global Reach: Expand our reach to different regions, collaborating with local communities, governments, and organizations to maximize our impact and contribute to a sustainable global ecosystem.
                  </p>
              </div>
            </div>
            <div className="about-slider-container">
      <div className="about-card">
        <span className="about-span-card-member"><h1>Objective</h1></span>
        <span className="about-span-card-member">
          <p> 
          <h1>1.</h1> Reforestation Impact: We aim to plant a specified number of trees each year, contributing actively to reforestation projects and biodiversity conservation. <br />

<h1>2.</h1>Customer Engagement: Foster a strong sense of environmental awareness and responsibility among our customers through informative content, updates on tree-planting initiatives, and engagement opportunities. <br />

<h1>3.</h1> Innovation in Sustainability: Continuously explore and implement innovative solutions that minimize our ecological footprint, from sustainable packaging to eco-friendly practices in our operations. <br />

<h1>4.</h1> Global Reach: Expand our reach to different regions, collaborating with local communities, governments, and organizations to maximize our impact and contribute to a sustainable global ecosystem.
          </p>
        </span>
      </div>
      <div className="about-card">
        <span className="about-span-card-member"><h1>Mission</h1></span>
        <span className="about-span-card-member">
          <p> Our mission at greenEarth is to empower individuals and businesses to make a tangible impact on the environment through conscious consumerism. We are committed to providing a seamless platform where every purchase translates into the planting of trees. By fostering a sense of environmental responsibility, we strive to contribute significantly to reforestation efforts globally. Our mission extends beyond commerce; it is about creating a movement that transcends borders and backgrounds, connecting people through a shared commitment to the planet.
          </p>
        </span>

      </div>
      <div className="about-card">
        <span className="about-span-card-member"><h1>Vision</h1></span>
        <span className="about-about-span-card-member">
          <p> 
          At greenEarth, our vision is to 
                    cultivate a global community dedicated to
                     environmental stewardship. We envision a world
                      where individuals and corporations unite
                       to create a sustainable future, 
                       one tree at a time. Our dream is to 
                       be at the forefront of the green revolution, 
                       inspiring positive change and fostering a
                        deep sense of responsibility towards the planet.
          </p>
        </span>
      </div>

      
    </div>
         </div>
         <div className='aboutus-team'>
          <h1>Our Team</h1>
          <div className='members-team'>

            <div className='teamCard-1'>
              <div className='team-member-img'>
                <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/r.png?raw=true" alt="" />
              </div>
              <div className='team-member-details'>
                  <span>Name: <p>Ravi Gangwar</p></span>
                  <span>Role: <p>Backend, Frontend Developer</p></span>
                  <span><i>Team Leader</i></span>
              </div>
            </div>
            <div className='teamCard-1'>
              <div className='team-member-img'>
                <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/v.png?raw=true" alt="" />
              </div>
              <div className='team-member-details'>
                  <span>Name: <p>Vaishnavi Katiyar</p></span>
                  <span>Role: <p>Frontend and UX,UI Developer </p></span>
              </div>
            </div>
            <div className='teamCard-1'>
              <div className='team-member-img'>
                <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/k.png?raw=true" alt="" />
              </div>
              <div className='team-member-details'>
                  <span>Name: <p>Kaushiki Tripathi</p></span>
                  <span>Role: <p>Frontend and UX,UI Developer </p></span>
              </div>
            </div>
            <div className='teamCard-1'>
              <div className='team-member-img'>
                <img src="https://github.com/ravi-gangwar/greenEarth/blob/main/frontend/src/assets/a.png?raw=true" alt="" />
              </div>
              <div className='team-member-details'>
                  <span>Name: <p>Anand Kumar</p></span>
                  <span>Role: <p>Frontend and UX,UI Developer</p></span>
              </div>
            </div>
          </div>
         </div>
    </div>
  );
}

export default About;
