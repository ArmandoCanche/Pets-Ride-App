import { Button, Dialog, DialogContent, TextareaAutosize } from "@mui/material";
import { CalendarIcon, Clock, User } from "lucide-react"; // Importamos User para el icono del cliente
import { useState } from "react";
import { StaticDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


export default function ProviderRescheduleModal({ open, onOpenChange, booking }) {
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [reason, setReason] = useState("");

  const handleReschedule = () => {
    console.log("[PROVIDER] Sending reschedule proposal:", {
      bookingId: booking.id,
      newDate: selectedDateTime.format("YYYY-MM-DD"),
      newTime: selectedDateTime.format("HH:mm"),
      reason,
    });
    onOpenChange(false);
  };

  if (!booking) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={() => onOpenChange(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "1rem",
              maxWidth: "600px",
              padding: 3
            }
          }
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: '1rem'
          }}
        >
          {/* Título adaptado para Prestador */}
          <h1 className="text-2xl font-semibold">Proponer nuevo horario</h1>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-gray-500 mb-2">ACTUAL RESERVA</h2>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{booking.serviceType}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                 <User className="h-3 w-3" />
                 <span>{booking.clientName || booking.client} • {booking.petName}</span>
              </div>

              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span className="text-sm">{booking.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3"/>
                  <span className="text-sm">{booking.time}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <span className="flex mb-1 text-base font-semibold text-[#005c71] mb-4">SELECCIONA NUEVA FECHA Y HORA</span>
            <div className="flex justify-center px-16">
              <StaticDateTimePicker
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}
                shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
                onAccept={handleReschedule}
                onClose={() => onOpenChange(false)}
                slotProps={{
                  toolbar: {
                    hidden: true
                  },
                  actionBar: {
                    hidden: true
                  },
                  day: {
                    sx: {
                      "&.Mui-selected": {
                        backgroundColor: "#045f73",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#045f73",
                        },
                        "&:focus": {
                          backgroundColor: "#045f73",
                        }
                      }
                    }
                  },
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium">
              Motivo del cambio (Importante para el cliente)
            </label>
            <TextareaAutosize 
              minRows={3} 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Hola, necesito mover la cita debido a..."
              style={{
                fontSize: '0.9rem', 
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '8px',
                fontWeight: 500,
                fontFamily: 'inherit',
                width: '100%',
                resize: 'none',
                outline: 'none',
              }}
            />
          </div>
          {selectedDateTime && (
            <div className="flex flex-col border-1 p-6 rounded-lg border-orange-200 bg-[#f7ede9] gap-2">
              <h3 className="text-sm font-semibold">Propuesta seleccionada</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4 text-orange-400"/>
                  <span>{selectedDateTime.format("DD/MM/YYYY")}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-orange-400"/>
                  <span>{selectedDateTime.format("HH:mm")}</span>
                </div>
              </div>
            </div>
          )}

          {/* Sección de botones */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outlined"
              onClick={() => onOpenChange(false)}
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
            >
              Cancelar
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={!reason.trim()}
              sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf : { xs: 'stretch', sm: 'center' },
                color: '#ffffffff', background:'#045f73',
                fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#1c788dff',
                    color: '#fff'
                },
                '&.Mui-disabled': {
                    background: '#ccc',
                    color: '#666'
                }
              }}
            >
              Enviar Propuesta
            </Button>
          </div>
          
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}