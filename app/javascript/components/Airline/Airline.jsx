import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components'

import ReviewForm from './ReviewForm';
import Header from './Header';
import { Wrapper, Column, Main } from './airlineStyles';

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;

    axios.get(url)
    .then(res => {
      setAirline(res.data);
      setLoaded(true);
    })
    .catch(res => console.log(res));
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setReview({...review, [e.target.name]: e.target.value});
    console.log(review);
  }

  const handleSubmit = e => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    const airline_id = airline.data.id;

    axios.post('/api/v1/reviews', { review, airline_id })
    .then(res => {
      const included = [...airline.included, res.data.data];
      setAirline({...airline, included})
      setReview({ title: '', description: '', score: 0 })
    })
    .catch(res => {})
  }

  const setRating = (score, e) => {
    e.preventDefault();
    setReview({ ...review, score });
  }

  return (
    <Wrapper>
      {
        loaded &&
          <Fragment>
            <Column>
              <Main>
                <Header
                  attributes={airline.data.attributes}
                  reviews={airline.included}
                />
                <div className="reviews"></div>
              </Main>
            </Column>
            <Column className="column">
              <ReviewForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setRating={setRating}
                attributes={airline.data.attributes}
                review={review}
              />
            </Column>
          </Fragment>
      }
    </Wrapper>
  );
}

export default Airline;
