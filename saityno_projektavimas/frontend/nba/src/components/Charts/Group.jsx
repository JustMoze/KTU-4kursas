import React from 'react'
import { VictoryStack, VictoryArea } from 'victory'
import { ChartContainer } from '../../../styles/globalStyledComponents'
import { RobotoM400_italic } from '../../../utils/fonts'

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
              key={stat.title}
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
      </VictoryStack>
    </ChartContainer>
  )
}

export default Histogram
