import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';

export default function BarChartComponent() {
  const [key, animate] = React.useReducer((v) => v + 1, 0);

  return (
    <Stack>
      <BarChart
        key={key}
        xAxis={[{ data: ['Jun', 'Jul', 'Ago','Sep','Oct','Nov'],
            scaleType: 'band'
         }]}
        series={[
            {
                data: [120,140,130,160,180,210],
                label:'Paseos',
                valueFormatter: (value) => `${value} servicios`,
            },
            {
                data:[40,55,60,50,65,70],
                label:'Peluquería',
                valueFormatter: (value) => `${value} servicios`,
            },
            {
                data:[30,70,80,40,45,50],
                label:'Hoteles',
                valueFormatter: (value) => `${value} servicios`,
            },
            {
                data:[60,65,62,68,70,75],
                label:'Veterinaria',
                valueFormatter: (value) => `${value} servicios`,
            }
        ]}
        width={750}
        height={300}
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