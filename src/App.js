import React, { Component } from 'react';
import './App.css';
import Button from './button/Button';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      rating: [],
      value_for_total: null,
      value_for_average: null
    };
  }

  calculateAverage = (i) => {
    const {items} = this.state;
    const filteredItems = items.filter(item => item.rating === i);
    const value_for_total = filteredItems.reduce((sum, a) => (sum + a.amount), 0);
    const value_for_average = value_for_total / filteredItems.length;
 
     this.setState({
       value_for_total: value_for_total,
       value_for_average: value_for_average
    });
  };

  handleRating = (items) => {
    const rating = items.reduce((a, b) => {
        if(a.indexOf(b.rating) === -1){
          return a.concat(b.rating)
        } else {
          return a;
        }
      }, []);
    return rating;
  };
  
  componentDidMount() {
    fetch("/zonkyAPI.json")
      .then(res => res.json())
      .then(result => {
        const rating = this.handleRating(result);
        this.setState({ 
            isLoaded: true,
            items: result,
            rating: rating,
          }); 
        },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      })
    }  

  render() {
    const { error, isLoaded, rating } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Button 
            rating={rating}
            calculateAverage={this.calculateAverage}  
          />
          <div>total: {this.state.value_for_total}</div>
          <div>average: {this.state.value_for_average}</div>
        </div>

      );
    }
  }
}

export default App;
