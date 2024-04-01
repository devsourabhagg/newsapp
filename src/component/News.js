import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category: 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:0,
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93365dd331034e5ebb10b7c69321838e&page=1&pageSize=${this.props.pageSize}`;
        try {
            let response = await fetch(url);
            this.setState({loading: true}) ; // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error state here if needed
            this.setState({ loading: false });
        }
    }

    handlePreClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93365dd331034e5ebb10b7c69321838e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        try {
            let response = await fetch(url);
            this.setState({loading: true}) ; // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                page: this.state.page-1,
                articles: data.articles,
                loading: false
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error state here if needed
            this.setState({ loading: false });
        }

    }

    handleNextClick = async() => {
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93365dd331034e5ebb10b7c69321838e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        try {
            let response = await fetch(url);
            this.setState({loading: true}) ; // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                page: this.state.page+1,
                articles: data.articles,
                loading: false
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error state here if needed
            this.setState({ loading: false });
        }

        }    
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center"> </h1>
                <h1>NewsApp -Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} 
                            imageUrl={element.urlToImage} urlPath={element.url} author={element.author?element.author:"unknown"} 
                            publishedDate={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    
                </div>
            </div>
        )
    }
}
