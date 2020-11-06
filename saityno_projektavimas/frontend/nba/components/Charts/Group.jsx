import React from 'react'
import { VictoryStack, VictoryArea } from 'victory'
import { ChartContainer } from '../../styles/globalStyledComponents'
import { RobotoM400_italic } from '../../utils/fonts'
import { NBA_red } from '../../styles/globalStyle.module.scss'

function Histogram({ content, stats, color, height }) {
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
      <VictoryStack>
        {stats.map((stat) => {
          return (
            <VictoryArea
              style={{
                data: { fill: stat.color },
                labels: {
                  fontSize: 10,
                  fontWeight: 'bold',
                  fill: '#3f3f3f',
                },
              }}
              labels={({ datum }) => datum.title}
              data={[
                { x: 'a', y: stat.value / 3 },
                { x: 'b', y: stat.value / 2 },
                {
                  x: 'c',
                  y: stat.value,
                  title: `${stat.title} - ${stat.value}`,
                },
              ]}
            />
          )
        })}
        {/* <VictoryArea
        labels={({ datum }) => datum.title}
          data={[
            { x: 'a', y: 1 },
            { x: 'b', y: 4 },
            { x: 'c', y: 5,  title: apg_name },
          ]}
        />
        <VictoryArea
            labels={({ datum }) => datum.title}
          data={[
            { x: 'a', y: 1 },
            { x: 'b', y: 4 },
            { x: 'c', y: 5,  title: rpg_name },
          ]}
        />
        <VictoryArea
        style={{
            data: { fill: color },
          }}
          labels={({ datum }) => datum.title}
          data={[
            { x: 'a', y: oppg / 3 },
            { x: 'b', y: oppg / 2 },
            { x: 'c', y: oppg, title: ppg_name },
          ]}
        />
        <VictoryArea
          style={{
            data: { fill: color },
          }}
          labels={({ datum }) => datum.title}
          data={[
            { x: 'a', y: ppg / 3 },
            { x: 'b', y: ppg / 2 },
            { x: 'c', y: ppg, title: oppg_name },
          ]}
        /> */}
      </VictoryStack>
    </ChartContainer>
  )
}

export default Histogram
