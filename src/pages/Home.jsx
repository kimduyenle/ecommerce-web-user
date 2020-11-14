import React from 'react';
import Banner from 'components/banner';
import Product from 'components/product/index';
import ProductList from 'components/modules/ProductList';

const Home = () => {
  return (
    <div className="page page_home">
      {/* <Banner /> */}
      <ProductList />
    </div>
  )
}

export default Home
