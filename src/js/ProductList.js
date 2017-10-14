import React, { Component } from 'react';
import FilterProduct from './FilterProduct';
import ProductCard from './ProductCard';
import cards from  '../cards.json';


class ProductList extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter: el => true
    }

    this.setFilter = this.setFilter.bind(this);
  }
  setFilter(fn) {
    this.setState({filter: fn});
  }

  render() {
    return (
      <div className='product-list'>
        <FilterProduct callback={this.setFilter} />
        <div className='row-container'>
          {
            cards.reduce((acc, el, i, a) => {
              if (acc.length < 20 && this.state.filter(el)) {
                acc.push(<ProductCard key={el.id} name={el.name} kind={el.kind} price={el.price} color={el.color} image={el.image}/>)
              }else if(a.length-1 === i && acc.length === 0){
                acc.push(<div key='products-empty'>Товары не найдены </div>)
              }
              return acc;
            }, [])

          }
        </div>
      </div>
    )
  }
}

export default ProductList;
