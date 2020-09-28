import React from "react";

// component called from beats page
const Card = (props) => {
    const { title, text, image } = props;

    return (
        <div className="card-wrap">
            <div className="card">
                <div className="card-image">
                    <img
                        src={image}
                        alt=""
                    />
                </div>
                <div className="card-content">
                    <h3> {title} </h3>
                    <p> {text} </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
