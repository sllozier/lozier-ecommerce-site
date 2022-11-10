import React from "react";

const CallToAction = () => {

    return(
        <>
        <section className="section call-to-action is-primary has-background-danger has-text-centered is-family-monospace">
            <div className="container is-narrow">
                <div className="box is-danger has-background-primary">
                    <div className="level has-text-black">
                        <div className="level-left">
                        <div className=" level-item has-text-centered">
                            <h1 className="title is-4 is-uppercase">Join in!</h1>
                        </div>
                        <div className="level-item has-text-centered">
                            <p className="subtitle is-5">Want updates? Join our mailing list.</p>
                        </div>
                        <div className="level-item has-text-centered">
                            <a className="button is-black is-outlined is-medium has-text-weight-normal" href='/contactForm'>
                                <span className="icon">
                                    <i className="fa-regular fa-hand-spock"></i>
                                </span>
                                <span>Join</span>
                            </a>
                        </div>
                        </div>
                   
                   <div className="level-right">
                        <div className="level-item has-text-centered">
                            <h1 className="title is-4 is-uppercase">Follow us!</h1>
                        </div>
                    <div className="level-item has-text-centered">
                        <p className="buttons">
                        <a className="button is-black is-outlined has-text-weight-normal" href='https://twitter.com/waybackvinyl' target="_blank">
                            <span className="icon">
                                <i className="fa-brands fa-twitter"></i>
                            </span>
                        </a>
                        <a className="button is-black is-outlined has-text-weight-normal" href='https://www.facebook.com/waybackvinyl/' target="_blank">
                            <span className="icon">
                                <i className="fa-brands fa-facebook"></i>
                            </span>
                        </a>
                        <a className="button is-black is-outlined has-text-weight-normal" href='https://www.instagram.com/WayBack_vinyl/' target="_blank">
                            <span className="icon">
                                <i className="fa-brands fa-instagram"></i>
                            </span>
                        </a>
                        </p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default CallToAction;