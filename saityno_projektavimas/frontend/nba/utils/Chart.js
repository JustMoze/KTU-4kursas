import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { NBA_white } from '../styles/globalStyle.module.scss'

export const CustomTr = styled(Tr)`
  position: relative;
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.color};
  color: ${NBA_white};
`
export const CustomTable = styled(Table)`
  position: relative;
  width: 94%;
  margin-left: 3%;
  @media (max-width: 768px) {
    padding-bottom: 200px;
  }
  
`
export const CustomTd = styled(Td)`
  height: 40px;
  border: 1px solid #000000;
  padding-left: 10;
  width: 100% !important;
  text-align: center;
`
export const CasualTh = styled(Th)`
  padding-left: 10px;
  padding-right: 10px;
`
export const CustomTdPlayer = styled(Td)`
  height: 40px;
  border: 1px solid #000000;
  padding-left: 10px;
  width: 100%;
`
