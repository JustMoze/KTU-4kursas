import styled from 'styled-components'
import { NBA_white, NBA_dark } from '../styles/globalStyle.module.scss'

export const RobotoM500 = styled.h2`
  font-family: 'Roboto';
  font-size: 25px;
  color: ${NBA_white};
  margin-bottom: 5px;
`

export const RobotoM400_underline = styled.h2`
  font-family: 'Roboto';
  font-size: 20px;
  font-style: italic;
  text-decoration: underline;
  color: ${NBA_white};
`
export const RobotoM400 = styled.p`
  font-family: 'Roboto';
  margin: 0;
  font-size: 20px;
  color: ${NBA_white};
`
export const RobotoM400_italic = styled.p`
  font-family: 'Roboto';
  margin: 0;
  font-size: 25px;
  color: ${NBA_dark};
  font-style: italic;
`