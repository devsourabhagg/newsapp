import React, { Component } from 'react'

export default class Newsitems extends Component {
    render() {
        let { title, descripiton, imageUrl, urlPath, author, publishedDate,source } = this.props; // this is called destructuring here this.props is an object from which respective values will be fetched
        return (
            <div className='my-3'>
                <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source} </span>
                    <img src={imageUrl ? imageUrl : 'https://i.ytimg.com/vi/T9PxZzRnYc8/maxresdefault.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{descripiton}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {publishedDate}</small></p>
                        <a href={urlPath} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
