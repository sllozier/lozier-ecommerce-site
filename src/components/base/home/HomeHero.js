import React from "react";

const HomeHero = () => {

    return(
        <>
        <section className="hero is-fullheight video">
    <div className="hero-video">
        <video poster="/piccies/WaybackHero.jpg" id="bgvid" playsInline autoPlay muted loop>
            <source src="/video/WaybackHero.webm" type="video/webm"/>
            <source src="/video/WaybackHero.mp4" type="video/mp4"/>
        </video>
    </div>
</section>
        </>
    )
}

export default HomeHero;