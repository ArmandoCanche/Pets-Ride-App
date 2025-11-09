import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function LineChardComponent() {
  const [key, animate] = React.useReducer((v) => v + 1, 0);



  return (
    <Stack>
      <LineChart
        key={key}
        xAxis={[{ data: ['Jun', 'Jul', 'Ago','Sep','Oct','Nov'],
            scaleType:'point'
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
        slots={{
          line: AnimatedLine,
          mark: AnimatedMark,
        }}
      />
      {/* <Button onClick={() => animate()}>Run Animation</Button> */}
    </Stack>
  );
}

function AnimatedLine({ d, ownerState, skipAnimation }) {
  return (
    <motion.path
      d={d}
      fill="transparent"
      stroke={ownerState.color}
      initial={{
        opacity: skipAnimation ? 1 : 0,
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  );
}

function AnimatedMark({ x, y, color, skipAnimation }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={5}
      fill={color}
      initial={{
        scale: skipAnimation ? 1 : 0,
        opacity: skipAnimation ? 1 : 0,
      }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: 'backOut' }}
    />
  );
}