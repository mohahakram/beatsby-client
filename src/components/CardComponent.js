import React from 'react'


const Card = (props) => {
    
    const {title, text} = props
    
    return(
        <div className="cardWrap">
            <div className="card">
                <div className="cardImage">
                        <img src="https://images.unsplash.com/photo-1574169411236-be48f751eb90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60" alt=""/>
                </div>
                <div className="cardContent">
                        <h3> {title} </h3>
                        <p> {text} </p>
                </div>
            </div>
        </div>
    )
}

export default Card