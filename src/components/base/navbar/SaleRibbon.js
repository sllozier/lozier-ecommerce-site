import React from "react";
import Marquee from "react-fast-marquee";

const SaleRibbon = () => {

    return(
        <>
        <section className="hero is-small is-success">
            <div className="hero-body has-text-centered">
                <Marquee
                pauseOnHover={true}
                direction="left"
                speed={50}
                delay={1}
                gradient={false}>
                   
                    <p className="subtitle is-family-monospace has-text-weight-semibold">
                    <strong> 20% OFF</strong> select albums through December 1st! Vintage is always in style! Order today and have it shipped in time for the Holidays!  
                    </p>
                    
                </Marquee>
                
                
                
            </div>
        </section>
        </>
    )
}

export default SaleRibbon;