import React from "react";
import AdCarousel from "./AdCarousel";
import HomeHero from "./HomeHero";
import ViewAllAlbums from "../../albumPages/ViewAllAlbums";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <>
      <div className="container has-background-cream is-family-monospace"></div>
      <div className="container is-fluid">
        <HomeHero />
      </div>

      <div className="container is-fluid ">
        <AdCarousel />
      </div>

      <div className="container is-family-monospace">
        <ViewAllAlbums />
      </div>

      <CallToAction />

      <div className="divider is-warning is-family-monospace">
        Footer Component
      </div>
      <h1 className="has-background-warning is-family-monospace">
        Footer includes: comps
        <p>
          Help & FAQ: rewards prog, about, contact us, FAQ, Privacy Pol, Terms,
          Return Pol; My Acct: Login, Wish List, OrderHistory, Cart; Follow SM:
          IG, FB, Tw, Em, YouTube
        </p>
      </h1>
    </>
  );
};

export default Home;
