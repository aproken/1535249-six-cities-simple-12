import {Helmet} from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import LocationsList from '../../components/locations-list/locations-list';
import MainPageEmpty from '../main-page-empty/main-page-empty';
import OfferListContainer from '../../components/offer-list-container/offer-list-container';
import { Offers } from '../../types/offer';

type MainPageProps = {
  offers: Offers;
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>
          Шесть городов - сервис для путешественников, не желающих переплачивать за аренду жилья
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList currentLocation={offers[0].city.name}/>
          </section>
        </div>
        <div className="cities">
          {
            offers ?
              <OfferListContainer offers={offers} /> :
              <MainPageEmpty />
          }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
