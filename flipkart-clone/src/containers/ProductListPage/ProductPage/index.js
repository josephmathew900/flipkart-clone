import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '../../../components/UI/Card';
import './style.css';

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: '0 10px' }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: 'block' }}
              href={banner.navigateTo}
            >
              <img
                style={{ height: '500px', width: '100%' }}
                src={banner.img}
                alt=""
              />
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '20px 0',
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              style={{
                width: '400px',
                height: '200px',
                margin: '0 5px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                style={{ width: '100%', height: '100%' }}
                key={index}
                src={product.img}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
