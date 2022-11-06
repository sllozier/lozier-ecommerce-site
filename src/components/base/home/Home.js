import React from 'react';
import HomeHero from './HomeHero';

const Home = () => {
    return (
        <>
        <HomeHero />
        <div className='container is-family-monospace'>
        <div className='divider is-link'>NavBar Component</div>
        <h1 className='has-background-link'>Main NavBar includes:
        <p>Home Button, Dropdown filters, Search Bar, LogIn, Cart, Sale Ribbon Placeholders</p>
        </h1>
        
        <div className='divider is-warning'>Main Hero Component</div>
        <h1 className='has-background-warning'>Hero With Logo MP4 comp</h1>
        <div className='divider is-warning'>Carousel Component</div>
        <h1 className='has-background-warning'>Carousel Ads? comp</h1>
        <div className='divider is-warning'>Display Albums Component</div>
        <h1 className='has-background-warning'>View All Albums Comp</h1>
        <div className='divider is-warning'>Call to Action Component</div>
        <h1 className='has-background-warning'>Newsletter SignUp & Follow on Social CallToAction comp</h1>
        <div className='divider is-warning'>Footer Component</div>
        <h1 className='has-background-warning'>Footer includes: comps
        <p>Help & FAQ: rewards prog, about, contact us, FAQ, Privacy Pol, Terms, Return Pol;
            My Acct: Login, Wish List, OrderHistory, Cart; Follow SM: IG, FB, Tw, Em, YouTube
        </p>
        </h1>
        </div>
        </>
    )
}

export default Home;