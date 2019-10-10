import React from 'react';
import PropTypes from 'prop-types';
import { PictureWrap, PictureContent, PictureImage } from './styled';

const PictureWidget = (props) => {
  const { pictures, sendPicture } = props;

  const renderPictures = () => {
    return pictures.map((value, index) => {
      return(
        <PictureContent key={index} onClick={()=>{sendPicture(value.picture)}}>
          <PictureImage src={value.picture} alt={value.title} />
        </PictureContent>
      )
    });
  };

  return(
    <PictureWrap>
      {pictures.length && renderPictures()}
    </PictureWrap>
  )
};

export default PictureWidget;

PictureWidget.propTypes = {
  pictures: PropTypes.array,
  sendPicture: PropTypes.func.isRequired
};