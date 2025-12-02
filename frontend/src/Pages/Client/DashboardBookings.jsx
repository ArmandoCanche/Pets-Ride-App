import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Tab, Tabs, CircularProgress } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { format, isPast, isFuture, parseISO } from "date-fns";
import { es } from "date-fns/locale";

// Servicios e Imports Propios
import { bookingService } from "../../services/bookingService";
import { reviewsService } from "../../services/reviewsService";
import BookingCard from "../../Components/BookingCard";
import ClientBookingDetailModal from "../../Components/ClientBookingDetailModal";
import ClientRescheduleModal from "../../Components/ClientRescheduleModal";
import ClientRateModal from "../../Components/ClientRateModal";

export default function DashboardBookings() {
    // 1. ESTADOS DE DATOS
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. ESTADOS DE UI (Modales y Tabs)
    const [currentTab, setCurrentTab] = useState('upcoming');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // --- CARGA DE DATOS ---
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getAll();
            setAllBookings(data);
        } catch (error) {
            console.error("Error cargando reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // --- MAPEO DE DATOS (Backend -> Frontend UI) ---
    // Esta función transforma la data cruda de la DB a lo que tus tarjetas esperan
    const mapBookingToUI = (b) => {
        const dateObj = new Date(b.booking_datetime);
        
        return {
            // IDs
            id: b.booking_id,
            bookingId: `BK-${b.booking_id.toString().padStart(4, '0')}`, // Genera IDs bonitos BK-0005
            
            // Datos Visuales
            serviceType: b.service_name_snapshot,
            providerName: b.other_party_name || "Proveedor",
            providerImage: b.other_party_photo, // Asegúrate que tu backend envíe esto
            providerRating: 5.0, // Dato pendiente en backend, hardcodeado por estética visual
            providerPhone: b.phone_number,
            providerEmail: b.email,
            
            petName: b.pet_name,
            
            // Fecha y Hora
            date: format(dateObj, "MMMM d, yyyy", { locale: es }), // "Marzo 15, 2025"
            time: format(dateObj, "h:mm a"), // "10:00 AM"
            rawDate: dateObj, // Guardamos objeto fecha real para filtrar lógica
            
            location: b.service_location || b.address || "Ubicación a definir",
            price: Number(b.price_at_booking),
            status: b.status, // 'confirmed', 'pending', 'completed', 'cancelled'
            notes: b.notes,
        };
    };

    // --- FILTRADO INTELIGENTE (MEMOIZED) ---
    // Dividimos las reservas en los 3 grupos automáticamente
    const { upcomingBookings, pastBookings, cancelledBookings } = useMemo(() => {
        const mapped = allBookings.map(mapBookingToUI);

        const upcoming = [];
        const past = [];
        const cancelled = [];

        mapped.forEach(booking => {
            const isCancelled = booking.status === 'cancelled' || booking.status === 'rejected';
            const isCompleted = booking.status === 'completed';
            
            if (isCancelled) {
                cancelled.push(booking);
            } else if (isCompleted || isPast(booking.rawDate)) {
                // Si ya pasó la fecha o está marcado como completado
                past.push({ ...booking, status: 'completado' }); 
            } else {
                // Si es futuro y no está cancelado
                upcoming.push(booking);
            }
        });

        return { upcomingBookings: upcoming, pastBookings: past, cancelledBookings: cancelled };
    }, [allBookings]);


    // --- MANEJADORES DE ACCIONES ---

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setDetailModalOpen(true);
    };

    const handleReschedule = (booking) => {
        setSelectedBooking(booking);
        setRescheduleModalOpen(true);
    };

    const handleMessage = () => {
        setMessageModalOpen(true);
        // Aquí iría la lógica de redirección al chat
    };

    const handleCancel = async (bookingId) => {
        if(!confirm("¿Estás seguro de cancelar esta reserva?")) return;
        try {
            await bookingService.updateStatus(bookingId, 'cancelled');
            fetchBookings(); // Recargar datos
            setDetailModalOpen(false);
        } catch (error) {
            alert("No se pudo cancelar la reserva");
        }
    };

    const handleRate = (booking) => {
        setSelectedBooking(booking);
        setRateModalOpen(true);
    };

    const handleSubmitRating = async (data) => {
        try {
            // Llamamos al servicio real
            await reviewsService.create({ 
                bookingId: selectedBooking.id, // Aseguramos enviar el ID de la reserva
                rating: data.rating,
                comment: data.comment 
            });
            
            // console.log("Calificación enviada:", data); <--- Ya no es necesario el log
            
            setRateModalOpen(false);
            setSnackbar({
                open: true,
                message: `¡Gracias por calificar a ${selectedBooking.providerName}!`,
                severity: 'success'
            });
            
            // Opcional: Recargar las reservas para actualizar el estado o UI si fuera necesario
            // fetchBookings(); 

        } catch (error) {
            console.error("Error al enviar reseña:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Error al guardar la calificación',
                severity: 'error'
            });
        }
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // --- RENDER ---

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <CircularProgress sx={{ color: '#005c71' }} />
            </div>
        );
    }

    return (
        <>
            <main className='flex py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
                <div className='w-full h-auto flex flex-col gap-6'>
                    {/* Header */}
                    <div className='flex flex-col h-full gap-4 p-0 align-items-center justify-center col-span-12 '>
                        <h1 className='text-4xl font-bold text-gray-800'>Mis reservas</h1>
                        <p className="text-gray-500">Observa y administra todas tus reservas</p>
                    </div>

                    {/* Tabs y Contenido */}
                    <div className='flex flex-col gap-6 h-full rounded-lg p-0 align-items-center justify-center col-span-12'>
                        <Box sx={{ width: 'fit-content', bgcolor: '#ebebebff', borderRadius: 3, padding: 0.5 }}>
                            <Tabs
                                value={currentTab}
                                onChange={handleTabChange}
                                aria-label="Booking Tabs"
                                slotProps={{ indicator: { style: { display: "none" } } }}
                                sx={{ minHeight: 'auto' }}
                            >
                                <Tab label={`Próxima (${upcomingBookings.length})`} value={"upcoming"} sx={tabStyles} />
                                <Tab label={`Pasada (${pastBookings.length})`} value={"past"} sx={tabStyles} />
                                <Tab label={`Cancelada (${cancelledBookings.length})`} value={"cancelled"} sx={tabStyles} />
                            </Tabs>
                        </Box>

                        {/* TAB: PRÓXIMAS */}
                        {currentTab === 'upcoming' && (
                            <Box sx={{ width: '100%', pt: 0 }}>
                                {upcomingBookings.length > 0 ? (
                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {upcomingBookings.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                {...booking}
                                                onViewDetails={() => handleViewDetails(booking)}
                                                onReschedule={() => handleReschedule(booking)}
                                                onCancel={() => handleCancel(booking.id)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState message="Sin reservas próximas" />
                                )}
                            </Box>
                        )}

                        {/* TAB: PASADAS */}
                        {currentTab === 'past' && (
                            <Box sx={{ width: '100%', pt: 0 }}>
                                {pastBookings.length > 0 ? (
                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {pastBookings.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                {...booking}
                                                onViewDetails={() => handleViewDetails(booking)}
                                                onRate={() => handleRate(booking)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState message="Sin reservas anteriores" />
                                )}
                            </Box>
                        )}

                        {/* TAB: CANCELADAS */}
                        {currentTab === 'cancelled' && (
                            <Box sx={{ width: '100%', pt: 0 }}>
                                {cancelledBookings.length > 0 ? (
                                    <div className="grid lg:grid-cols-2 gap-6">
                                        {cancelledBookings.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                {...booking}
                                                onViewDetails={() => handleViewDetails(booking)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState message="Sin reservas canceladas" />
                                )}
                            </Box>
                        )}
                    </div>
                </div>

                {/* MODALES */}
                {selectedBooking && (
                    <>
                        <ClientBookingDetailModal
                            open={detailModalOpen}
                            onOpenChange={setDetailModalOpen}
                            booking={selectedBooking}
                            onMessage={handleMessage}
                        />
                        <ClientRescheduleModal
                            open={rescheduleModalOpen}
                            onOpenChange={setRescheduleModalOpen}
                            booking={selectedBooking}
                        />
                        <ClientRateModal
                            open={rateModalOpen}
                            onOpenChange={setRateModalOpen}
                            booking={selectedBooking}
                            onSubmit={handleSubmitRating}
                        />
                    </>
                )}
            </main>
        </>
    );
}

// --- Componentes Auxiliares y Estilos ---

const EmptyState = ({ message }) => (
    <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <CalendarToday sx={{ fontSize: 40, marginX: 'auto', marginBottom: 2, color: 'text.disabled' }} />
        <p className="text-gray-500 mb-4">{message}</p>
        <Link to="/client/search">
            <Button variant="contained" sx={{ textTransform: 'none', bgcolor: '#005c71' }}>
                Buscar servicios
            </Button>
        </Link>
    </div>
);

const tabStyles = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    width: '10rem',
    textTransform: 'none',
    borderRadius: 3,
    minHeight: 'auto',
    paddingY: 1,
    '&.Mui-selected': {
        bgcolor: '#fff',
        color: 'text.primary',
    },
    '&:not(.Mui-selected)': {
        color: 'text.secondary',
    }
};