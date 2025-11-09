import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BarChartComponent() {
  const [key, animate] = React.useReducer((v) => v + 1, 0);

  return (
    <Stack>
      <BarChart
        key={key}
        xAxis={[{ data: ['Paseos', 'Hoteles', 'Veterinaria'],
            scaleType: 'band'
         }]}
        series={[
            {
            type: 'bar',
            label: 'Q1',
            data: [25, 40, 30],
                        valueFormatter: (value) => `${value} servicios`,
            },
            {
            type: 'bar',
            label: 'Q2',
            data: [30, 42, 35],
                        valueFormatter: (value) => `${value} servicios`,
            },
            {
            type: 'bar',
            label: 'Q3',
            data: [38, 50, 40],
                        valueFormatter: (value) => `${value} servicios`,
            },
        ]}
        width={300}
        height={400}
        barLabel="value"
        slots={{ barLabel: AnimatedBarLabel }}
      />
      {/* <Button onClick={() => animate()}>Run Animation</Button> */}
    </Stack>
  );
}

function AnimatedBarLabel(props) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const style = useSpring({
    from: { y: yOrigin },
    to: { y: y - 4 },
    config: { tension: 100, friction: 10 },
  });

  return (
    <animated.text
      {...otherProps}
      // @ts-ignore
      fill={color}
      x={xOrigin + x + width / 2}
      width={width}
      height={height}
      style={style}
      textAnchor="middle"
    />
  );
}