import React from 'react'
import { VictoryPie } from 'victory'
import { NBA_grey } from '../../styles/globalStyle.module.scss'
import { ChartContainer } from '../../styles/globalStyledComponents'
import { RobotoM400_italic } from './../../utils/fonts'

function Circular({ winP, record, height, color, content }) {
  const ConfigureRecords = () => {
    let winProc = record.slice(0, 3)
    let losProc = record.slice(3, record.length)
    return { win: winProc, loss: losProc }
  }
  const ConfigureData = () => {
    let winProc = parseInt(winP)
    return [
      { x: ConfigureRecords().win, y: winProc },
      { x: ConfigureRecords().loss, y: 100 - winProc },
    ]
  }
  return (
    <ChartContainer style={{ height: height }}>
      <RobotoM400_italic
        style={{
          textAlign: 'center',
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
        }}
      >
        {content}
      </RobotoM400_italic>
      <VictoryPie
        labelRadius={({ innerRadius }) => innerRadius + 5}
        colorScale={[color, NBA_grey]}
        data={ConfigureData()}
        style={{
          labels: { fill: 'white', fontSize: 17, fontWeight: 'bold' },
        }}
        animate={{ duration: 100 }}
      />
    </ChartContainer>
  )
}

export default Circular
