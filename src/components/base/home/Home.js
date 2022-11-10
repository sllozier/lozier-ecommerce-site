import React from 'react';
import AdCarousel from './AdCarousel';
import HomeHero from './HomeHero';
import ViewAllAlbums from '../../albumPages/ViewAllAlbums';
import CallToAction from './CallToAction';


const Home = () => {
    return (
        <>
        <div className='container is-family-monospace'>
        <div className='divider is-link is-family-monospace'>NavBar Component</div>
        <h1 className='has-background-link is-family-monospace'>Main NavBar includes:
        <p>Home Button, Dropdown filters, Search Bar, LogIn, Cart, Sale Ribbon Placeholders</p>
        </h1>
        
        
        </div>
        <div className='container is-fluid'>
        <HomeHero />
        </div>

                <div className='divider is-warning is-family-monospace'>Featured Albums Pagination</div>
                <h1 className='has-background-warning'>Featured Albums comp here?</h1>
        
                <div className='divider is-link is-family-monospace'>Ad Carousel Component</div>
                <h1 className='has-background-link is-family-monospace'>Carousel Ads? comp</h1>
                <div className='container is-fluid'><AdCarousel/></div>
                
                <div className='divider is-link is-family-monospace'>All Albums Component</div>
                <h1 className='has-background-link is-family-monospace'>View All Albums Comp</h1>
                <div className='container is-family-monospace'><ViewAllAlbums/></div>
                
                <div className='divider is-warning is-family-monospace'>Call To Action Component</div>
                <h1 className='has-background-warning is-family-monospace'>Newsletter SignUp & Follow on Social CallToAction comp</h1>
                <CallToAction/>
                
            
           
                <div className='divider is-warning is-family-monospace'>Footer Component</div>
                <h1 className='has-background-warning is-family-monospace'>Footer includes: comps
                <p>Help & FAQ: rewards prog, about, contact us, FAQ, Privacy Pol, Terms, Return Pol;
                    My Acct: Login, Wish List, OrderHistory, Cart; Follow SM: IG, FB, Tw, Em, YouTube
                </p>
                </h1>
            
        
        </>
    )
}

export default Home;