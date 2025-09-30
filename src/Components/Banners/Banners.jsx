import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './Banners.css';   // حالا از SCSS استفاده می‌کنیم
import { Link } from 'react-router-dom';

// یک بنر تکی
const Banner = ({ banner }) => {
  const isLarge = banner.category === 'large';

  return (
    <Card
      className={`banner-card ${isLarge ? 'banner-card--large' : 'banner-card--small'}`}
      style={{
        backgroundImage: `url(${banner.image})`,
        backgroundSize: 'cover',
      }}
    >
      <Card.Body className="banner-card__body">
        {banner.discount && (
          <div className="banner-card__discount">
            <p className="banner-card__discount-text">
              {banner.discount}% تخفیف
            </p>
          </div>
        )}

        <Card.Title as="h6" className="banner-card__title">
          {banner.title}
        </Card.Title>

        <Button className="banner-card__button">
          <Link to={`/category/${banner.productCategory}`} className="banner-card__link">
            خرید
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
};

// بنر بزرگ
const LargeBanner = ({ banners }) => {
  const largeBanner = banners.find(b => b.category === 'large');
  if (!largeBanner) return null;

  return (
    <Container className="banners banners--large">
      <Row className="banners__row">
        <Col xs={12} className="banners__col">
          <Banner banner={largeBanner} />
        </Col>
      </Row>
    </Container>
  );
};

// بنرهای کوچک
const SmallBannerList = ({ banners }) => {
  const smallBanners = banners.filter(b => b.category !== 'large');
  const firstRow = smallBanners.slice(0, 2);
  const secondRow = smallBanners.slice(2, 6);

  return (
    <Container className="banners banners--small">
      <Row className="banners__row">
        {firstRow.map(b => (
          <Col xs={12} sm={6} key={b.id} className="banners__col">
            <Banner banner={b} />
          </Col>
        ))}
      </Row>

      <Row className="banners__row banners__row--second">
        {secondRow.map(b => (
          <Col xs={12} sm={6} md={3} key={b.id} className="banners__col">
            <Banner banner={b} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

Banner.propTypes = {
  banner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    productCategory: PropTypes.string,
  }).isRequired,
};

LargeBanner.propTypes = {
  banners: PropTypes.array.isRequired,
};
SmallBannerList.propTypes = {
  banners: PropTypes.array.isRequired,
};

export { LargeBanner, SmallBannerList };
