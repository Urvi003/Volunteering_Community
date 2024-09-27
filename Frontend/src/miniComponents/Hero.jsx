import React from 'react'
import{Link} from 'react-router-dom'

const Hero = () => {
  return (
    <section className="hero">
      <div className="banner">
        <h1>Volunteers</h1>
        <h3>Needed !</h3>
        <p>Join us in making a difference! We are in need of enthusiastic and dedicated
           volunteers to support our cause. Your time and effort can help bring about
            positive change in our community, offering you a rewarding experience, new 
            skills, and the opportunity to meet new people. Whether you have a few hours 
            to spare or can commit to a regular schedule, we have opportunities for you 
            to get involved. Additionally, donations are crucial in helping us sustain
             and expand our efforts. Every contribution, no matter how small, goes a
              long way in helping us achieve our mission. Click the button below to 
              donate now and make an even bigger impact.
        </p>
        <Link to = {'/donate'} className='btn'>Donate Now</Link>
      </div>  
      <div className='banner'>
        <img src='/hero.png' alt='hero'/>
      </div>
    </section>
  )
}

export default Hero
