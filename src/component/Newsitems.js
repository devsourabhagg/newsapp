import React, { Component } from 'react'

export default class Newsitems extends Component {
    render() {
        let { title, descripiton, imageUrl, urlPath } = this.props; // this is called destructuring here this.props is an object from which respective values will be fetched
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl?imageUrl:'https://i.ytimg.com/vi/T9PxZzRnYc8/maxresdefault.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{descripiton}</p>
                        <a href={urlPath} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
