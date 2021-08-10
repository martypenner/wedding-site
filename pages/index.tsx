import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div id="root">
      <Head>
        <title>Home — Marty Penner and Meaghan Jones</title>
      </Head>

      <div id="zola-wedding-container">
        <div>
          <div id="public-wrapper" className="p-0">
            <div className="website-title__cart noMobile"></div>
            <div>
              <div
                className="sticky-nav"
                style={{ transform: 'translateZ(0px)' }}
              >
                <header id="public-page-header" className="clearfix">
                  <div id="public-page-details" className="hidden md:flex mb-6">
                    <h5 className="text-2xl ml-8 lg:ml-0 mr-10 wedding-date">
                      October 15, 2021
                    </h5>
                    <h5 className="text-2xl wedding-location">
                      Parry Sound, Ontario
                    </h5>
                  </div>

                  <div className="col-xs-12 website-title">
                    <h1 id="public-page-title" className="hidden md:block mb-4">
                      <Link href="/">
                        <a>Marty & Meaghan</a>
                      </Link>
                    </h1>

                    {/* <div className="visible-sm visible-xs">
                      <button
                        type="button"
                        className="nav-control zolaicon-public zolaicon-public-hamburger-menu"
                      ></button>
                    </div> */}

                    {/* <div className="pages-nav-container">
                      <div className="nav-container clearfix">
                        <ul className="list-inline">
                          <li>
                            <a href="/" className="active">
                              Home
                            </a>
                          </li>
                          <li>
                            <a href="/event">Schedule</a>
                          </li>
                          <li>
                            <a href="/travel">Travel</a>
                          </li>
                          <li>
                            <a href="/photo">Photos</a>
                          </li>
                          <li>
                            <a href="/poi">Things To Do</a>
                          </li>
                          <li>
                            <a href="/faq">FAQs</a>
                          </li>
                          <li>
                            <a href="/rsvp">RSVP</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                   */}

                    <h1 className="block md:hidden">
                      <Link href="/">
                        <a>Marty & Meaghan</a>
                      </Link>
                    </h1>
                    <div className="website-title__cart hidden-md hidden-lg"></div>
                  </div>
                </header>
              </div>
            </div>
            <div id="public-page-content-wrapper" className="show-page">
              <div>
                <div className="public-page">
                  <div>
                    <div className="hero-wrapper">
                      <div
                        className="jumbotron home-page-hero has-image"
                        style={{
                          backgroundImage:
                            "url('https://images.zola.com/38fcbdcf-4a82-4666-b0a2-7dc153ea0b58?h=700')",
                        }}
                      >
                        <div className="hero-accent-top-left"></div>
                        <div className="hero-accent-top-right"></div>
                        <div className="hero-accent-bottom-left"></div>
                        <div className="hero-accent-bottom-right"></div>

                        <div className="down-arrow">
                          <i
                            className="zolaicon-public zolaicon-public-chevron-down"
                            role="button"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="page-content has-entities has-image has-welcome-message">
                      <div className="page-accent-top-left"></div>
                      <div className="page-accent-top-right"></div>
                      <div className="page-accent-bottom-left"></div>
                      <div className="page-accent-bottom-right"></div>
                      <div className="homepage-seal top-seal">
                        <div className="seal-section">
                          <span className="name-1">
                            <span className="initial-1">M</span>
                            <span className="initial-2">P</span>
                          </span>
                          <span>
                            <span className="amp">&amp;</span>
                            <span className="and">and</span>
                            <span className="plus">+</span>
                          </span>
                          <span className="name-2">
                            <span className="initial-1">M</span>
                            <span className="initial-2">J</span>
                          </span>
                        </div>
                      </div>

                      {/* <div className="flex justify-center items-center overflow-hidden max-h-full"> */}
                      <div className="homepage-header-text">
                        <h2 className="font-cardo italic font-extrabold text-7xl md:text-9xl text-gray text-center normal-case mx-auto mt-16 p-8 max-w-xl md:max-w-6xl">
                          Celebrate with us!
                        </h2>
                      </div>

                      <div className="names-section">
                        <div className="names-accent-top-left"></div>
                        <div className="names-accent-top-right"></div>
                        <div className="names-accent-bottom-left"></div>
                        <div className="names-accent-bottom-right"></div>
                        <div className="name-section-left">
                          <h2 className="partner-1-name">
                            <span className="first-name">
                              <span className="first-initial">M</span>
                              <span className="full-first-name">arty</span>
                            </span>
                            <span className="last-name">
                              <span className="last-initial"> P</span>
                              <span className="full-last-name">enner</span>
                            </span>
                          </h2>
                        </div>
                        <div className="name-section-middle">
                          <div className="content">
                            <h1 className="name-1">
                              <span className="first-name">
                                <span className="first-initial">M</span>
                                <span className="full-first-name">arty</span>
                              </span>

                              <span className="last-name">
                                <span className="last-initial"> P</span>
                                <span className="full-last-name">enner</span>
                              </span>
                            </h1>

                            <span className="and text-5xl">and</span>

                            <h1 className="name-2">
                              <span className="first-name">
                                <span className="first-initial">M</span>
                                <span className="full-first-name">eaghan</span>
                              </span>
                              <span className="last-name">
                                <span className="last-initial"> J</span>
                                <span className="full-last-name">ones</span>
                              </span>
                            </h1>
                          </div>
                        </div>
                        <div className="name-section-right">
                          <h2 className="partner-2-name">
                            <span className="first-name">
                              <span className="first-initial">M</span>
                              <span className="full-first-name">eaghan</span>
                            </span>
                            <span className="last-name">
                              <span className="last-initial"> J</span>
                              <span className="full-last-name">ones</span>
                            </span>
                          </h2>
                        </div>
                      </div>

                      <div className="wedding-info-section">
                        <div className="horizontal">
                          <div className="content">
                            <div className="location">
                              <h4 className="in text-5xl">in</h4>
                              <h3>
                                <span className="city">Parry Sound</span>
                                <span className="comma">, </span>
                                <span className="state">Ontario</span>
                              </h3>
                            </div>
                            <div className="date">
                              <span>
                                <h4 className="on text-5xl">on</h4>
                                <h3>
                                  <span className="month">October</span>
                                  <span className="day">15</span>
                                  <span className="year">2021</span>
                                </h3>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="vertical-single">
                          <div className="name-1 hidden-xs">
                            <div className="initials">
                              <span className="initial-1">M</span>
                              <div className="accent"></div>
                              <span className="initial-2">P</span>
                            </div>
                          </div>
                          <div className="info-section">
                            <div className="content">
                              <div className="date-wrapper">
                                <h3 className="date">
                                  <div className="month">
                                    <span className="numeric">10</span>
                                    <span className="word">October</span>
                                  </div>
                                  <span className="day">15</span>
                                  <div className="year">
                                    <span className="full">2021</span>
                                    <span className="minimal">21</span>
                                  </div>
                                </h3>
                              </div>
                              <h4 className="location">Parry Sound, Ontario</h4>
                            </div>
                          </div>
                          <div className="name-2 hidden-xs">
                            <div className="initials">
                              <span className="initial-1">M</span>
                              <div className="accent"></div>
                              <span className="initial-2">J</span>
                            </div>
                          </div>
                        </div>

                        <div className="vertical-double">
                          <div className="wedding-info-column wedding-info-left">
                            <h4 className="location">Parry Sound, Ontario</h4>
                            <span className="big-initial">M</span>
                            <h4 className="and">and</h4>
                            <span className="big-initial">M</span>
                          </div>
                          <div className="wedding-info-column wedding-info-right">
                            <h4 className="day-month">Sunday</h4>
                            <span className="big-initial day">10</span>
                            <h4>/</h4>
                            <span className="big-initial month">4</span>
                            <h4>2020</h4>
                          </div>
                        </div>
                      </div>

                      <div className="mt-32 wedding-info-section">
                        <div className="horizontal">
                          <div className="content">
                            <h3 className="mx-8 text-7xl">
                              More info coming soon
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* <div className="entity-sections homepage-sections clearfix">
                        <div className="entity-section homepage-section clearfix">
                          <div className="entity-section-title homepage-section-title">
                            <h2 className="section-title">How we met</h2>
                            <h4 className="section-subtitle">
                              First comes school, then comes marriage
                            </h4>
                          </div>
                          <div className="entity-section-description homepage-section-description-v2">
                            <p>Babies, weddings, such and so on</p>
                          </div>
                          <div className="section-accent"></div>
                        </div>
                      </div>
                       */}

                      <div className="homepage-seal bottom-seal">
                        <div className="seal-section">
                          <span className="name-1">
                            <span className="initial-1">M</span>
                            <span className="initial-2">P</span>
                          </span>
                          <span>
                            <span className="amp">&amp;</span>
                            <span className="and">and</span>
                            <span className="plus">+</span>
                          </span>
                          <span className="name-2">
                            <span className="initial-1">M</span>
                            <span className="initial-2">J</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <span>
                      <div
                        className="bottom-section"
                        style={{
                          backgroundImage:
                            "url('https://images.zola.com/52657661-692c-4068-952f-f1213d683b43?h=700')",
                        }}
                      ></div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
