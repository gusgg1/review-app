import React, { Fragment } from 'react';
import styled from 'styled-components'
import {
  RatingContainer,
  RatingBox,
  Field,
  SubmitBtn,
  ReviewWrapper,
  ReviewHeadline,
  RatingBoxTitle,
  Error,
  Headline,
  RatingTitle
} from './airlineStyles';


const ReviewForm = (props) => {
  const ratingOptions = [5,4,3,2,1].map((score, index) => {
    return (
      <Fragment key={index}>
        <input
          type="radio"
          value={score}
          checked={props.review.score === score}
          onChange={()=>console.log('selected', score)} 
          name="rating" id={`rating-${score}`}
        />
        <label
          onClick={props.setRating.bind(this, score)}
        ></label>
      </Fragment>
    )
  })

  return (
    <ReviewWrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>Have an experience with {props.attributes.name}? Share your review</Headline>
        <Field>
          <input onChange={props.handleChange} value={props.review.title} type="text" name="title" placeholder="Review Title" />
        </Field>
        <Field>
          <input onChange={props.handleChange} value={props.review.description} type="text" name="description" placeholder="Review Description" />
        </Field>
        <Field>
          <RatingContainer>
            <RatingTitle className="rating-title-text">Rate this Airline</RatingTitle>
            <RatingBox>
              {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>
        <SubmitBtn type="submit">Submit Your Review</SubmitBtn>
      </form>
    </ReviewWrapper>
  )
}

export default ReviewForm;
