import React, { useEffect, useState } from 'react';
import StatsCard from '../../Components/StatsCard';

// Iconos
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MovingIcon from '@mui/icons-material/Moving';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// IMPORTACIONES DE LAS GRÁFICAS
import { BarChart } from '@mui/x-charts/BarChart';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { pieArcClasses, pieClasses } from '@mui/x-charts/PieChart';
import { rainbowSurgePalette } from '@mui/x-charts/colorPalettes';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';

// SERVICIO
import { getProviderStats } from '../../services/bookingService';

// --- CONFIGURACIÓN DE MESES ---
const spanishMonths = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const shortSpanishMonths = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

// Mapa de respaldo
const englishToSpanish = {
  'Jan': 'Ene', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Abr', 
  'May': 'May', 'Jun': 'Jun', 'Jul': 'Jul', 'Aug': 'Ago', 
  'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Dec': 'Dic'
};

export default function DashboardEarnings() {
  const theme = useTheme();
  const palette = rainbowSurgePalette(theme.palette.mode);
  const [key, animate] = React.useReducer((v) => v + 1, 0);

  // ESTADO PARA DATOS REALES
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    kpis: {
      total_earnings: 0,
      pending_bookings: 0,
      completed_services: 0,
      rating: 0
    },
    charts: {
      pets: [],
      monthly: [],
      services: []
    }
  });

  // CARGAR DATOS DEL BACKEND
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getProviderStats();
        setStats(data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // --- TRANSFORMACIÓN DE DATOS PARA LAS GRÁFICAS ---

  // 1. Datos para PieChart (Mascotas)
  const petsData = stats.charts.pets.map((item, index) => ({
    id: index,
    label: item.species,
    value: parseInt(item.count, 10),
    color: palette[index % palette.length]
  }));

  const petsSettings = {
    series: [
      {
        innerRadius: 0,
        outerRadius: 80,
        data: petsData.length > 0 ? petsData : [{ label: 'Sin datos', value: 1, color: '#e0e0e0' }],
        highlightScope: { fade: 'global', highlight: 'item' },
      },
      {
        id: 'outer',
        innerRadius: 100,
        outerRadius: 120,
        data: petsData.length > 0 ? petsData : [{ label: 'Sin datos', value: 1, color: '#e0e0e0' }],
        highlightScope: { fade: 'global', highlight: 'item' },
      },
    ],
    height: 300,
    hideLegend: false,
    slotProps: { legend: { hidden: true } }
  };

  // 2. Datos para BarChart Horizontal (Servicios Populares)
  const servicesDataset = stats.charts.services.map((s) => ({
    service: s.name,
    count: parseInt(s.value, 10)
  }));

  // AJUSTE CLAVE 1: Margen izquierdo aumentado para leer los nombres de servicios
  const barChartSetting = {
    xAxis: [
      { label: 'Total', tickMinStep: 1 }
    ],
    height: 250,
    // Aumentamos left a 120px para que "Peluquería" quepa bien
    margin: { left: 120, right: 20, bottom: 40 } 
  };

  // 3. Datos para LineCharts (Mensuales) - Etiquetas Cortas vs Largas
  const getMonthLabel = (m, useShort = true) => {
    const monthsArray = useShort ? shortSpanishMonths : spanishMonths;
    
    if (m.month_num) {
      return monthsArray[parseInt(m.month_num) - 1]; 
    }
    if (m.month_name && englishToSpanish[m.month_name]) {
      return englishToSpanish[m.month_name];
    }
    return m.month_name || '';
  };

  const shortMonthLabels = stats.charts.monthly.map(m => getMonthLabel(m, true));
  const fullMonthLabels = stats.charts.monthly.map(m => getMonthLabel(m, false));

  const bookingsData = stats.charts.monthly.map(m => parseInt(m.total_bookings, 10));
  const earningsData = stats.charts.monthly.map(m => parseFloat(m.monthly_earnings));

  const AnimatedPieChart = animated(PieChart);

  // AJUSTE CLAVE 2: Configuración común para gráficas de línea pequeñas
  const smallLineChartConfig = {
    height: 200,
    margin: { left: 40, right: 10, top: 10, bottom: 30 }, // Margen inferior para las fechas
    grid: { horizontal: true },
    slotProps: { legend: { hidden: true } },
    xAxis: [{ 
      data: shortMonthLabels, 
      scaleType: 'point',
      tickLabelStyle: { 
        fontSize: 10, // Fuente más pequeña
        angle: 0      // Sin rotación, pero con fuente pequeña
      } 
    }]
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-xl text-gray-500">Cargando estadísticas...</p>
        </div>
    );
  }

  return (
    <div>
        <main className='flex py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
              
              <div className='flex flex-col h-full gap-4 p-0 align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Ganancias</h1>
                  <p className="text-gray-400">Resumen financiero y operativo en tiempo real</p>
              </div>

              {/* KPIS (CARDS) */}
              <div className='w-full h-auto grid grid-cols-12 gap-6'>
                <StatsCard title="Ganancias totales" value={`$ ${stats.kpis.total_earnings}`} icon={AttachMoneyIcon} />
                <StatsCard title="Reservas pendientes" value={stats.kpis.pending_bookings} icon={CalendarTodayIcon} />
                <StatsCard title="Calificación" value={stats.kpis.rating || 'N/A'} icon={StarBorderIcon} />
                <StatsCard title="Completados" value={stats.kpis.completed_services} icon={MovingIcon} />
              </div>

              <div className='flex flex-col h-full gap-4 p-0 align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Gráficos</h1>
              </div>

              {/* FILA 1 DE GRÁFICOS */}
              <div className='grid grid-cols-12 gap-6'>
                
                {/* 1. PieChart (Mascotas) */}
                <div className='flex flex-col col-span-12 md:col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Mascotas</h3>
                  <PieChart
                    {...petsSettings}
                    sx={{
                        [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]: {
                        opacity: 0.6,
                        },
                    }}
                  />
                </div>

                {/* 2. BarChart Horizontal (Top Servicios) */}
                <div className='flex flex-col col-span-12 md:col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2 overflow-hidden'>
                   <h3 className="text-sm font-semibold text-gray-500 mb-2">Servicios Populares</h3>
                   {servicesDataset.length > 0 ? (
                      <BarChart
                        dataset={servicesDataset}
                        layout='horizontal'
                        yAxis={[{ 
                            dataKey:'service', 
                            scaleType:'band', 
                            tickLabelStyle: { fontSize: 11, fontWeight: 'bold' } 
                        }]}
                        series={[{ dataKey:'count', label:'Cantidad', color: '#1976d2' }]}
                        {...barChartSetting}
                      />
                   ) : <p className="text-gray-400 text-sm">Sin datos</p>}
                </div>

                {/* 3. LineChart (Reservas) */}
                <div className='flex flex-col col-span-12 md:col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg px-2 py-2'>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Reservas (Tendencia)</h3>
                  {shortMonthLabels.length > 0 ? (
                      <LineChart
                        {...smallLineChartConfig}
                        series={[{ data: bookingsData, label: 'Reservas', color: '#2e7d32' }]}
                        // Quitamos width fijo para que se adapte mejor, o usamos width 100% en estilo
                        width={undefined}
                        sx={{ width: '100%' }}
                      />
                  ) : <p className="text-gray-400 text-sm">Sin historial</p>}
                </div>

                {/* 4. LineChart (Ingresos) */}
                <div className='flex flex-col col-span-12 md:col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Ingresos ($)</h3>
                  {shortMonthLabels.length > 0 ? (
                      <LineChart
                        {...smallLineChartConfig}
                        series={[{ 
                            data: earningsData, 
                            area: true, 
                            label: 'Ingresos',
                            color: '#ed6c02'
                        }]}
                        width={undefined}
                        sx={{ width: '100%' }}
                      />
                  ) : <p className="text-gray-400 text-sm">Sin historial</p>}
                </div>
              </div>

            {/* FILA 2 DE GRÁFICOS */}
            <div className='grid grid-cols-12 gap-6'>
            
            {/* 5. PieChart Pequeño */}
            <div className='flex flex-col col-span-12 md:col-span-3 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-2'>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Distribución</h3>
              <Stack>
                <PieChart
                    series={[
                    {
                        arcLabel: (item) => `${item.value}`,
                        data : servicesDataset.map((s, i) => ({ id: i, value: s.count, label: s.service })),
                    }
                    ]}
                    width={200}
                    height={200}
                    slots={{ barLabel: AnimatedPieChart }}
                    slotProps={{ legend: { hidden: true } }}
                />
              </Stack>
            </div>

            {/* 6. BarChart Grande */}
            <div className='flex flex-col col-span-12 md:col-span-9 border-2 border-gray-200 bg-white items-center justify-center rounded-lg p-4'>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Actividad Mensual Detallada</h3>
                  <Stack sx={{ width: '100%' }}>
                    {fullMonthLabels.length > 0 ? (
                        <BarChart
                        key={key}
                        xAxis={[{ 
                            data: fullMonthLabels,
                            scaleType: 'band',
                            tickLabelStyle: { fontSize: 12 }
                        }]}
                        series={[
                            {
                                data: bookingsData,
                                label: 'Total Reservas',
                                color: '#9c27b0',
                                valueFormatter: (value) => `${value} citas`,
                            },
                        ]}
                        height={300}
                        margin={{ left: 50, right: 20, bottom: 30 }} // Margen seguro para gráfica grande
                        barLabel="value"
                        slots={{ barLabel: AnimatedBarLabel }}
                        />
                    ) : <p className="text-gray-400 py-10">Realiza tu primera reserva para ver datos aquí.</p>}
                  </Stack>
            </div>
          </div>
        </main>
    </div>
  );
}

// Animación de etiquetas (BarLabel)
function AnimatedBarLabel(props) {
  const {
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    color,
    ...otherProps
  } = props;

  const style = useSpring({
    from: { y: yOrigin },
    to: { y: y - 10 },
    config: { tension: 100, friction: 10 },
  });

  return (
    <animated.text
      {...otherProps}
      fill={color}
      x={xOrigin + x + width / 2}
      y={y}
      style={style}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight="bold"
    />
  );
}