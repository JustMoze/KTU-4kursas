import React from 'react';
import styled from 'styled-components';


const SliderCard = ({url}) => {
    const Image = styled.div`
        width: '100%';
        height: '100%';
        min-height: '50vh';
        border-radius: '50%';
        background-image: url(${url})
        
    `;
    return (
        <SliderCard />
    );
};

export default SliderCard;