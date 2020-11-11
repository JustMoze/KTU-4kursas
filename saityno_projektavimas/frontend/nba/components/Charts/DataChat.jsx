import React from 'react'
import { CustomTable } from '../../utils/Chart'

function DataChat(props) {
  return (
    <CustomTable style={{ marginTop: 25, marginBottom: 25 }}>
      <CustomTr color={color}>
        <Th></Th>
        <CasualTh>Position</CasualTh>
        <CasualTh>Number</CasualTh>
      </CustomTr>
    </CustomTable>
  )
}

export default DataChat
