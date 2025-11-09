import { useState } from 'react';

// MUI Components
import { Button, Snackbar, Alert } from '@mui/material';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Calendar } from 'lucide-react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Routers...
import { Link, NavLink } from 'react-router-dom';

// Componentes
import StatsCard from '../../Components/StatsCard.jsx';
import BookingCard  from '../../Components/BookingCard.jsx';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MovingIcon from '@mui/icons-material/Moving';
import ReviewCard from '../../Components/ReviewCard.jsx';
// import BarChartComponent from '../../Components/BarChart.jsx';


//IMPORTACIONES DE LAS GRÁFICAS 

import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { pieArcClasses, pieClasses } from '@mui/x-charts/PieChart';
import { rainbowSurgePalette } from '@mui/x-charts/colorPalettes';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';

export default function DashboardHomeProvider() {
const [detailModalOpen, setDetailModalOpen] = useState(false)
const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)


  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success', // 'success', 'error', 'warning', 'info'
  });


  // const stats = {
  //   totalEarnings: 2450,
  //   pendingBookings: 5,
  //   rating: 4.9,
  //   completedServices: 127,
  // }

  const upcomingBookings = [
    {
      id: "1",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Max (Golden Retriever)",
      date: "Marzo 15, 2025",
      time: "10:00 AM - 11:00 AM",
      location: "Área de Central Park",
      price: 25,
      status: "confirmado",
    },
    {
      id: "2",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Buddy (Labrador)",
      date: "Marzo 15, 2025",
      time: "2:00 PM - 3:00 PM",
      location: "Riverside Park",
      price: 25,
      status: "confirmado" ,
    },
    {
      id: "3",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Charlie (Beagle)",
      date: "Marzo 16, 2025",
      time: "9:00 AM - 10:00 AM",
      location: "Downtown Area",
      price: 25,
      status: "pendiente",
    },
  ]


const recentReviews = [
  {
    id: 1,
    client: "John Smith",
    rating: 5,
    comment: "¡Sarah fue increíble con Max! Muy profesional y a mi perro le encantó el paseo.",
    date: "Hace 2 días",
  },
  {
    id: 2,
    client: "Emily Davis",
    rating: 5,
    comment: "¡Gran servicio, muy puntuales y atentos. ¡Los recomiendo ampliamente!",
    date: "Hace 5 días",
  },
  {
    id: 3,
    client: "Michael Brown",
    rating: 4,
    comment: "Buena experiencia en general. Volvería a reservar.",
    date: "Hace 1 semana",
  },
]

  const handleViewDetails = (booking) => {
    const detailedBooking = {
      ...booking,
      providerImage: "/placeholder.svg",
      providerRating: 4.9,
      providerPhone: "+1 (555) 987-6543",
      providerEmail: "sarah.j@petcare.com",
      bookingId: `BK-${booking.id.padStart(6, "0")}`,
      notes: "Please bring water and treats. Max loves to play fetch!",
    }
    setSelectedBooking(detailedBooking)
    setDetailModalOpen(true)
  }

  const handleReschedule = (booking) => {
    setSelectedBooking(booking)
    setRescheduleModalOpen(true)
  }



  const handleMessageSent = () => {
    setDetailModalOpen(false);
    setSnackbar({
      open: true,
      message: 'Message sent successfully. They will respond shortly.',
      severity: 'success',
    });
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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

  // --- 4. Gráfica 4 (Fila 1, Col 4 - LineChart Area Conductores) ---
  const conductoresHoras = [0, 2, 3, 4, 5, 8, 10];
  const conductoresActivos = [2, 5.5, 2, 8.5, 1.5, 5, 9];

  // --- 5. Gráfica 5 (Fila 2, Col 1 - PieChart Animado) ---
  const pieChartData = [
    { id: 0, value: 120, label: 'Paseos' },
    { id: 1, value: 75, label: 'Peluquería' },
    { id: 2, value: 90, label: 'Hoteles' },
    { id: 3, value: 65, label: 'Veterinaria' },
  ];
  const AnimatedPieChart = animated(PieChart);
  const { angle } = useSpring({ 
    from: { angle: 0 },
    to: { angle: 360 },
    config: { duration: 1000, tension: 170, friction: 26 },
  });

  // --- 6. Gráfica 6 (Fila 2, Col 2 - BarChart Vertical Servicios/Mes) ---
  const [key, animate] = React.useReducer((v) => v + 1, 0);


  return (
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>

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

            {/* <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <StatsCard title="Ganancias totales" value={`$ ${stats.totalEarnings}`} icon={AttachMoneyIcon} />
              <StatsCard title="Reservas pendientes" value={stats.pendingBookings} icon={CalendarTodayIcon} />
              <StatsCard title="Calificación" value={stats.rating} icon={StarBorderIcon} />
              <StatsCard title="Completados" value={stats.completedServices} icon={MovingIcon} />
            </div> */}


            {/* Segunda sección */}
            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              {/* Sección PRÓXIMAS RESERVAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white  justify-between col-span-12  xl:col-span-8'>
                <div className='flex flex-row justify-between items-center w-full'>
                  <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
                  <NavLink to='' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
                </div>
                {/* CARDS */}
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  {...booking}
                  onViewDetails={() => handleViewDetails(booking)}
                  onReschedule={() => handleReschedule(booking)}
                />
                ))
               ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-xl border-2 border-dashed">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No hay reservas próximas</p>
                    <Link href="/client/search">
                      <Button variant="outlined" size="small" sx={{textTransform: 'none' , height: 40, fontFamily:'Poppins, sans-serif',borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556' } }}>Buscar Servicios</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sección MIS MASCOTAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12  xl:col-span-4'>

                  <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl font-semibold'> RESEÑAS RECIENTES</h1>
                  </div>
                  <div className='space-y-4'>
                    {recentReviews.map((review) => (
                      <div key={review.id} className='border-1 border-gray-200 rounded-3xl shadow-sm'>
                        <ReviewCard {...review} />
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {selectedBooking && (
              <>
                <ClientBookingDetailModal
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                booking={selectedBooking}
                onMessage={handleMessageSent}
                />
                <ClientRescheduleModal
                open={rescheduleModalOpen}
                onOpenChange={setRescheduleModalOpen}
                booking={selectedBooking}
                />
              </>
            )}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                sx={{ width: '100%' }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
        </main>
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