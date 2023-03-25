import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { getStarRating } from '../../components/place-card/place-card';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import Comment from '../../components/comment/comment';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';

import { Offers, Offer } from '../../types/offer';
import { Reviews } from '../../types/review';

import { MapLocation } from '../../const';

type OfferPageProps = {
  offers: Offers;
  reviews: Reviews;
}

function OfferPage({offers, reviews}: OfferPageProps): JSX.Element {
  const {id} = useParams();

  const offer: Offer | undefined = offers.find((room) => room.id === Number(id));
  if (!offer) {
    throw new Error('Url не существует');
  }

  const {images, isPremium, type, title, rating, bedrooms, maxAdults, price, goods, host, description,} = offer;

  return (
    <div className="page">
      <Helmet>
        <title>
          Шесть городов. Страница предложения
        </title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#todo">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.map((image) => (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt=""/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                {isPremium ? <span>Premium</span> : ''}
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getStarRating(rating)}`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good) => (
                      <li className="property__inside-item" key={good}>
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((comment) => <Comment review={comment} key={comment.id}/>)}
                </ul>
                <ReviewsForm />
              </section>
            </div>
            <Map city={offer.city} offers={offers} selectedOffer={offer} mapLocation={MapLocation.property}/>
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList offers={offers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
