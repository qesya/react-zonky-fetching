import React, { Component } from 'react';
import './App.css';
import RatingList from './ratingList';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      rating: [],
      selectedRating: null
    };
  }

  selectRating = (rating) => {
    this.setState(
      {selectedRating: rating}
    );
  };

  calculateAverage = () => {
    const {items, selectedRating} = this.state;
    const filteredItems = items.filter(item => selectedRating ? item.rating === selectedRating : true);
    const value_for_total = filteredItems.reduce((sum, a) => (sum + a.amount), 0);
    const value_for_average = value_for_total / filteredItems.length;
 
    return {
      total: value_for_total,
      average: value_for_average
    };
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
    const { error, isLoaded, rating, selectedRating } = this.state;
    const {total, average} = this.calculateAverage();
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <RatingList 
            selectedRating={selectedRating}
            rating={rating}
            selectRating={this.selectRating}  
          />
          <p>Total: {total}</p>
          <p>Average: {average}</p>
        </div>

      );
    }
  }
}

export default App;
