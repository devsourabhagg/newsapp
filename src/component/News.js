import React, { useState,useEffect } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {

    const [articles, setArticles] = useState([]);
    const [loading,setLoading]  = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const  capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   
    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewApp`

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        try {
            let response = await fetch(url);
            props.setProgress(30);
            setLoading(true); // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            setArticles(data.articles);
            setTotalResults(data.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setLoading(false)
        }
    }

    // async componentDidMount() {
    //     console.log('at last this runs');
    //     this.updateNews();
    // }

    useEffect(() => {
      updateNews();
    }, [])
    

    const fetchMoreData = async() => {
        setPage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        try {
            let response = await fetch(url);// Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            setArticles(articles.concat(data.articles))
            setTotalResults(data.totalResults);
            setLoading(false);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        
        }

       
      };
        return (
            <div className="container my-3">
                <h1 className="text-center"> </h1>
                <h1>NewsApp -Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage} urlPath={element.url} author={element.author ? element.author : "unknown"}
                                    publishedDate={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
 }


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;

