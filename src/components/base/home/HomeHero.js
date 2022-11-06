import React from "react";

const HomeHero = () => {

    return(
        <>
        <section className="hero is-fullheight video">
    <div className="hero-video">
        <video poster="/piccies/WaybackHero.jpg" id="bgvid" playsInline autoPlay muted loop>
            <source src="public/video/WaybackHero.webm" type="video/webm"/>
            <source src="public/video/WaybackHero.mp4" type="video/mp4"/>
        </video>
    </div>
    <div className="hero-body">
        <div className="container">
            // Text content goes here (h1 and call to action etc...)
        </div>
    </div>
    <div className="hero-foot">
        <div className="has-text-centered">
            // Scroll down arrow here?
        </div>
    </div>
</section>
        </>
    )
}

export default HomeHero;