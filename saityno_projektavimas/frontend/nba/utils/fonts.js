import styled from 'styled-components';
import { NBA_white, NBA_dark } from '../styles/globalStyle.module.scss';

export const RobotoM500 = styled.h2`
    font-family: 'Roboto';
    text-shadow: 2px 2px 2px #000000;
    font-size: 25px;
    color: ${NBA_white};
    margin-bottom: 5px;
`;

export const RobotoM400_underline = styled.h2`
    font-family: 'Roboto';
    font-size: 20px;
    font-style: italic;
    text-decoration: underline;
    color: ${NBA_white};
`;
export const RobotoM400 = styled.p`
    font-family: 'Roboto';
    margin: 0;
    text-shadow: 2px 1px 2px #000000;
    font-size: 20px;
    color: ${NBA_white};
`;
export const RobotoM400_italic = styled.p`
    font-family: 'Roboto';
    margin: 0;
    font-size: 25px;
    color: ${NBA_dark};
    font-style: italic;
`;
export const RobotoM500_Details = styled.h2`
    font-family: 'Roboto';
    text-shadow: 2px 2px 2px #000000;
    margin-top: 17px;
    font-size: 55px;
    color: ${NBA_white};
`;
