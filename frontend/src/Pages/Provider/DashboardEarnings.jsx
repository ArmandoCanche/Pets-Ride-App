import React from 'react';
import StatsCard from '../../Components/StatsCard';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import MovingIcon from '@mui/icons-material/Moving';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


//IMPORTACIONES DE LAS GRÁFICAS 

import { BarChart } from '@mui/x-charts/BarChart';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { pieArcClasses, pieClasses } from '@mui/x-charts/PieChart';
import { rainbowSurgePalette } from '@mui/x-charts/colorPalettes';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';

export default function DashboardEarnings() {
    // DEFINICIÓN DE GRÁFICAS

  // --- 1. Gráfica 1 (Fila 1, Col 1 - PieChart Sunburst Mascotas) ---

  const theme = useTheme();
  const palette = rainbowSurgePalette(theme.palette.mode);
  const data1 = [
    { label: 'Perros', value: 400 },
    { label: 'Gatos', value: 300 },
    { label: 'Roedores', value: 300 },
    { label: 'Otros', value: 200 },
  ];
  const data2 = [
    { label: 'Labradores', value: 100, color: palette[0] },
    { label: 'Razas Pequeñas', value: 300, color: palette[0] },
    { label: 'Siamés', value: 100, color: palette[1] },
    { label: 'Persa', value: 80, color: palette[1] },
    { label: 'Doméstico', value: 40, color: palette[1] },
    { label: 'Bengalí', value: 30, color: palette[1] },
    { label: 'Maine Coon', value: 50, color: palette[1] },
    { label: 'Hámsters', value: 100, color: palette[2] },
    { label: 'Conejos', value: 200, color: palette[2] },
    { label: 'Peces', value: 150, color: palette[3] },
    { label: 'Reptiles', value: 50, color: palette[3] },
  ];
  const settingsChart = {
    series: [
      {
        innerRadius: 0,
        outerRadius: 80,
        data: data1,
        highlightScope: { fade: 'global', highlight: 'item' },
      },
      {
        id: 'outer',
        innerRadius: 100,
        outerRadius: 120,
        data: data2,
        highlightScope: { fade: 'global', highlight: 'item' },
      },
    ],
    height: 300,
    hideLegend: true,
  };

  // --- 2. Gráfica 2 (Fila 1, Col 2 - BarChart Horizontal Calificaciones) ---
  const ratingsDataset = [
    { rating: 4.9, service: 'Paseos' },
    { rating: 4.8, service: 'Veterinaria' },
    { rating: 4.7, service: 'Hoteles' },
    { rating: 4.9, service: 'Peluquería' },
    { rating: 4.6, service: 'Transporte' },
  ];
  const barChartSetting = {
    xAxis: [
      { label: 'Calificación Promedio (de 5)' }
    ],
    height: 230,
    margin: { left:0 }
  };

  // --- 3. Gráfica 3 (Fila 1, Col 3 - LineChart Reservas Totales) ---
  const meses = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'];
  const totalReservas = [45, 52, 60, 58, 70, 85];


  
  const AnimatedPieChart = animated(PieChart);
  const { angle } = useSpring({ 
    from: { angle: 0 },
    to: { angle: 360 },
    config: { duration: 1000, tension: 170, friction: 26 },
  });

  // --- 6. Gráfica 6 (Fila 2, Col 2 - BarChart Vertical Servicios/Mes) ---
  const [key, animate] = React.useReducer((v) => v + 1, 0); 



  const stats = {
    totalEarnings: 2450,
    pendingBookings: 5,
    rating: 4.9,
    completedServices: 127,
  }

  return (
    <div>
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Ganancias</h1>
                  <p className="text-gray-400">Administra tus ganancias de servicios y citas</p>
              </div>
              <div className='w-full h-auto grid grid-cols-12 gap-6'>
                <StatsCard title="Ganancias totales" value={`$ ${stats.totalEarnings}`} icon={AttachMoneyIcon} />
                <StatsCard title="Reservas pendientes" value={stats.pendingBookings} icon={CalendarTodayIcon} />
                <StatsCard title="Calificación" value={stats.rating} icon={StarBorderIcon} />
                <StatsCard title="Completados" value={stats.completedServices} icon={MovingIcon} />
              </div>

              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Gráficos</h1>
                    <p className="text-gray-400"></p>
                </div>
              <div className='grid grid-cols-12 gap-6'>
                {/* Primer gráfico */}
                <div className='flex flex-row col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
                  <PieChart
                  {...settingsChart}
                  sx={{
                    [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]: {
                      opacity: 0.6,
                    },
                  }}
                  />

                </div>
                {/* Segundo gráfico */}
                <div className='flex flex-row col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
                  <BarChart
                  dataset={ratingsDataset}
                  layout='horizontal'

                  yAxis={[{
                    dataKey:'service',
                    scaleType:'band'
                  }]}

                  series={[{
                    dataKey:'rating',
                    label:'Calificacion promedio'
                  }]}

                  {...barChartSetting}
                  />
                </div>
                {/* Tercer gráfico */}
                <div className='flex flex-row col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg px-4 py-2'>
                  <LineChart
                  width={250}
                  height={200}
                  xAxis={[{
                    data: meses,
                    scaleType: 'point'
                  }]}
                  series={[{
                    data: totalReservas,
                    label: 'Total Reservas'
                  }]}
                  grid={{ horizontal: true }}
                  />
                </div>
                {/* Cuarto gráfico */}
                <div className='flex flex-row col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
                  <LineChart
                  xAxis={[{
                    data:[0,2,3,4,5,8,10],
                    label:'Horas del día'
                  }]}

                  series={[
                    {
                      data:[2,5.5,2,8.5,1.5,5,9],
                      area: true,
                      label:'Conductores activos'
                    }
                  ]}
                  height={300}
                  width={310}
                  />
                </div>
              </div>
                        <div className='grid grid-cols-12 gap-6'>
            {/* Primer grafico segunda fila */}
            <div className='flex flex-row col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
              <Stack>
                <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
                    data : [
                      { id: 0, value: 120, label: 'Paseos' },
                      { id: 1, value: 75, label: 'Peluquería' },
                      { id: 2, value: 90, label: 'Hoteles' },
                      { id: 3, value: 65, label: 'Veterinaria' },
                    ]
                  }
                ]}
                width={150}
                height={150}

                slots={{ barLabel: AnimatedPieChart }}
                />
              </Stack>
            </div>
            {/* Segundo grafico segunda fila */}
            <div className='flex flex-row col-span-9 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
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
            </div>
          </div>
        </main>
    </div>
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