import React, { Component } from 'react';

class ProductCard extends Component {
  render() {
    return (
      <div className='card-product' key={this.props.id} >
        <img src={this.props.image} width='300px' height='300px'/>
        <div className='card-detail'>
          <h3 className='card-name'>{this.props.name} {this.props.kind}</h3>
          <div className='card-color'>{this.props.color}</div>
          <div className='card-price'>{this.props.price}$</div>
        </div>
      </div>
    )
  }
}

export default ProductCard;
