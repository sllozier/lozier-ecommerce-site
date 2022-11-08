import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {

    return(
        <>
        <section className="section call-to-action is-primary has-text-centered">
            <div className="container ">
                <div className="box is-danger has-background-danger">
                    <div className="columns level has-text-white">
                        <div className="column level-item">
                            <h1 className="title has-text-white">Join in!</h1>
                        </div>
                        <div className="column level-item">
                            <p>Want the latest updates and promotions? Join our mailing list.</p>
                        </div>
                        <div className="column level-item">
                            <Link className="button is-white is-outlined is-medium has-text-weight-normal" to='/contactForm'>
                                <span className="icon">
                                    <i className="fa-regular fa-hand-spock"></i>
                                </span>
                                <span>Join</span>
                            </Link>
                        </div>
                    </div>
                    <div className="columns level has-text-white">
                        <div className="column level-item">
                            <h1 className="title has-text-white">Follow us!</h1>
                        </div>
                    <div className="column level-item">
                        <p className="buttons">
                        <a className="button is-white has-text-weight-normal" href='#'>
                            <span className="icon">
                                <i className="fa-brands fa-twitter"></i>
                            </span>
                        </a>
                        <a className="button is-white has-text-weight-normal" href='#'>
                            <span className="icon">
                                <i className="fa-brands fa-facebook"></i>
                            </span>
                        </a>
                        <a className="button is-white has-text-weight-normal" href='#'>
                            <span className="icon">
                                <i className="fa-brands fa-square-instagram"></i>
                            </span>
                        </a>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default CallToAction;