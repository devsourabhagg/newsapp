import React, { Component } from 'react'
import Newsitems from './Newsitems'

export default class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading : false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=22";
        try {
            let response = await fetch(url); // Await the fetch call
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let data = await response.json(); // Await parsing the JSON response
            this.setState({
                articles: data.articles,
                loading: false
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error state here if needed
            this.setState({ loading: false });
        }
    }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsApp -Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitems title={element.title?element.title: ""} description={element.description?element.description:""} imageUrl={element.urlToImage} urlPath={element.url}/>
          </div>

        })}
        
        </div>
        </div>
    )
  }
}
