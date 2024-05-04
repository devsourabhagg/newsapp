import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        console.log('at second this runs');
        super(props);
        this.state = {
            articles: [],
            loading:false,
            page: 1,
            totalResults:0,
            
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewApp`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        try {
            let response = await fetch(url);
            this.props.setProgress(30);
            this.setState({ loading: true }); // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                articles: data.articles,
                totalResults : data.totalResults,
                loading: false
            });
            this.props.setProgress(100);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ loading: false });
        }
    }

    async componentDidMount() {
        console.log('at last this runs');
        this.updateNews();
    }

    fetchMoreData = async() => {
        this.setState({
           page: this.state.page + 1 
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        try {
            let response = await fetch(url);// Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                articles: this.state.articles.concat(data.articles),
                totalResults : data.totalResults,
                loading : false
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        
        }

       
      };
    

    render() {
        console.log('at first this runs');
        return (
            <div className="container my-3">
                <h1 className="text-center"> </h1>
                <h1>NewsApp -Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="row">
                        {this.state.articles.map((element) => {
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
}
