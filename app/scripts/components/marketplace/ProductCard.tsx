import * as React from 'react';

import { ProductButton } from './ProductButton';
import './ProductCard.scss';
import { RatingStars } from './RatingStars';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = (props: ProductCardProps) => (
  <div className="product-card">
    <a className="product-thumb">
      <img src={props.product.thumb}/>
    </a>
    <div className="product-card-body">
      <h3 className="product-title">
        <a>{props.product.title}</a>
      </h3>
      <div className="product-subtitle elipsis">
        {props.product.subtitle}
      </div>
      <RatingStars rating={props.product.rating}/>
      <span className="product-installs">
        {props.product.installs} installs
      </span>
    </div>
    <div className="product-button-group">
      <ProductButton icon="fa fa-comments" title="Write review"/>
      <ProductButton icon="fa fa-balance-scale" title="Add to comparison"/>
      <ProductButton icon="fa fa-shopping-cart" title="Add to cart"/>
    </div>
  </div>
);