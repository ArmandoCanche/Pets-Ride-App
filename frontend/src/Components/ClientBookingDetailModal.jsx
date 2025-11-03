import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Avatar,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
// CAMBIO: Import 'useNavigate' de 'react-router-dom' en lugar de 'useRouter' de Next.js
import { useNavigate } from "react-router-dom";

// CAMBIO: Se eliminó la 'interface' de TypeScript
export default function ClientBookingDetailModal({
  open,
  onOpenChange,
  booking,
  onMessage,
}) {
  // CAMBIO: Se usa 'useNavigate'
  const navigate = useNavigate();

  const handleMessage = () => {
    if (onMessage) {
      onMessage();
    } else {
      onOpenChange(false);
      navigate("/client/messages");
    }
  };

  const getStatusChipProps = (status) => {
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    switch (status) {
      case "confirmado":
        return { label: "Confirmado", color: "success" };
      case "pendiente":
        return { label: "Pendiente", color: "warning" };
      case "completado":
        return { label: "Completado", color: "primary" };
      case "cancelado":
        return { label: "Cancelado", color: "error" };
      default:
        return { label: label, color: "default" };
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => onOpenChange(false)}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            maxWidth: "600px",
            padding: 3
          },
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <h1 className="text-2xl font-bold">Detalles de la reserva</h1>

        <div className="flex flex-col space-y-6 gap-0">
          <div>
            <h3 className="text-base font-semibold text-gray-500 mb-3">
              INFORMACIÓN DEL PROVEEDOR
            </h3>
            <div className="flex items-center flex-col gap-4 p-4 bg-gray-100 rounded-lg xs:flex-row md:flex-row lg:flex-row xl:flex-row">

              {/* seccion1 */}
              <Avatar
                sx={{ height: "4rem", width: "4rem" }}
                src={booking.providerImage || "/placeholder.svg"}
                alt={booking.providerName}
              >
                {booking.providerName.charAt(0)}
              </Avatar>

              {/* seccion2 */}

              <div className="flex flex-col justify-between ">
                <div className="flex flex-col justify-between items-center xs:flex-col  md:flex-row lg:flex-row xl:flex-row">
                  <h4 className="font-semibold text-lg">{booking.providerName}</h4>
                  <Chip
                  {...getStatusChipProps(booking.status)}
                  variant="outlined"
                  size="small"
                />
                </div>
                {booking.providerRating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{booking.providerRating}</span>
                    <span className="text-sm text-gray-500">
                      (128 reseñas)
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center md:gap-10 lg:gap-10 xl:gap-10  mt-2 text-sm text-gray-500">
                  {booking.providerPhone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{booking.providerPhone}</span>
                    </div>
                  )}
                  {booking.providerEmail && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{booking.providerEmail}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          <Divider />

          {/* Booking Info */}
          <div className="my-2">
            <h3 className="text-base font-semibold text-gray-500 mb-3">
              DETALLES
            </h3>
            <div className="space-y-3">
              {booking.bookingId && (
                <div className="flex items-center justify-between text-sm ">
                  <span className="text-gray-500">ID reserva</span>
                  <span className="font-mono">{booking.bookingId}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tipo de servicio</span>
                <span className="font-semibold">{booking.serviceType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Mascota</span>
                <span className="font-medium">{booking.petName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Fecha</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{booking.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Hora</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{booking.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Ubicación</span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{booking.location}</span>
                </div>
              </div>
              <Divider />
              <div className="flex items-center justify-between text-sm my-2">
                <span className="text-gray-500 font-medium">
                  Precio total
                </span>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-5 w-5 " />
                  <span className="font-bold  text-xl">
                    {booking.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <>
              <Divider />
              <div className="my-2">
                <h3 className="text-base font-semibold text-gray-500 mb-2">
                  TUS NOTAS
                </h3>
                <p className="text-sm text-gray-800 bg-gray-100 p-3 rounded-lg">
                  {booking.notes}
                </p>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 w-full">
            <Button
              variant="outlined"
              sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf: { xs: 'stretch', sm: 'center' },
                color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#eb9902ff',
                    color: '#fff',
                    borderColor: '#f7ae26ff',
                }
               }}
              onClick={() => onOpenChange(false)}
            >
              CERRAR
            </Button>

            <Button
              variant="contained"
              sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf : { xs: 'stretch', sm: 'center' },
                color: '#ffffffff', background:'#0b80d9ff',
                fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#045a9cff',
                    color: '#fff'
                }
               }}
              onClick={handleMessage}
              startIcon={<MessageSquare size="1rem" />}
            >
              Mensaje proveedor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}