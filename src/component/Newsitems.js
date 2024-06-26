import React from 'react'

const Newsitems = (props) =>{
        let { title, descripiton, imageUrl, urlPath, author, publishedDate,source } = props; // this is called destructuring here this.props is an object from which respective values will be fetched
        return (
            <div className='my-3'>
                <div className="card">
                <div
                style={
                    {
                        display : 'flex',
                        justifyContent : 'flex-end',
                        position : 'absolute',
                        right : 0
                    }
                }

                />
                <span className="badge rounded-pill bg-danger">{source} </span>
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

export default Newsitems
