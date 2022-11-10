import React from "react";

const HomeHero = () => {

    return(
        <>
        <section className="hero is-halfheight video is-hidden-touch">
    <div className="hero-video">
        <video poster="/piccies/WaybackHeroHalf.jpg" id="bgvid" playsInline autoPlay muted loop>
            <source src="/video/WaybackHeroHalf.webm" type="video/webm"/>
            <source src="/video/WaybackHeroHalf.mp4" type="video/mp4"/>
        </video>
    </div>
</section>
        </>
    )
}

export default HomeHero;