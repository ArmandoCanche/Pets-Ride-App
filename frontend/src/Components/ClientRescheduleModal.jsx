import { Button, Dialog, DialogContent, TextareaAutosize, Divider } from "@mui/material";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react"; // <--- Importar useEffect
import { StaticDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ClientRescheduleModal({ open, onOpenChange, booking }) {
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedDateTime(dayjs());
      setReason("");
    }
  }, [open]);

  const handleReschedule = () => {
    console.log("[MUI] Rescheduling booking:", {
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
        maxWidth="md"
        fullWidth
        slotProps={{
            paper: {
            sx: {
                borderRadius: "1.5rem",
                maxWidth: "550px",
                padding: 1,
                overflow: 'hidden'
            }
            }
        }}
    >
      <DialogContent
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: '1.5rem',
            padding: '2rem',
        }}
      >
        {/* HEADER */}
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Reprogramar reserva</h1>
            <p className="text-sm text-gray-500 mt-1">Solicita un cambio de fecha al proveedor.</p>
        </div>

        {/* TARJETA INFO ACTUAL */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reserva Actual</h2>
            <div>
                <p className="text-lg font-bold text-[#005c71] leading-tight">{booking.serviceType}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">
                    {booking.providerName} <span className="mx-1">•</span> {booking.petName}
                </p>
            </div>

            <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

            <div className="flex items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500"/>
                    <span className="font-semibold">{booking.time}</span>
                </div>
            </div>
        </div>

        {/* DATE PICKER */}
        <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#005c71]"/>
                NUEVA FECHA Y HORA
            </span>
            <div className="flex justify-center border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <StaticDateTimePicker
                    value={selectedDateTime}
                    onChange={(newValue) => setSelectedDateTime(newValue)}
                    shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
                    onAccept={handleReschedule}
                    onClose={() => onOpenChange(false)}
                    slotProps={{
                        toolbar:{ hidden: true },
                        actionBar:{ hidden:true },
                        layout: { sx: { '.MuiDateCalendar-root': { width: '100%' } } },
                        day: {
                            sx: {
                                "&.Mui-selected": {
                                    backgroundColor: "#005c71",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#004d61" },
                                    "&:focus": { backgroundColor: "#004d61" }
                                }
                            }
                        },
                    }}
                />
            </div>
        </div>

        {/* INPUT RAZON */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              Razón del cambio <span className="text-gray-400 font-normal">(Opcional)</span>
            </label>
            <TextareaAutosize 
                minRows={3} 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ej. Surgió un compromiso familiar..."
                style={{
                    fontSize: '0.95rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px',
                    fontFamily: 'inherit',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                }}
            />
        </div>
        {/* RESUMEN */}
        {selectedDateTime && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-900">
              <span className="text-sm font-bold text-orange-800">Nueva Selección:</span>
              <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4"/> {selectedDateTime.format("DD/MM/YYYY")}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> {selectedDateTime.format("HH:mm")}</span>
              </div>
            </div>
        )}

        {/* BOTONES */}
        <div className="flex gap-3 mt-2">
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
              variant="contained"
              sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf : { xs: 'stretch', sm: 'center' },
                color: '#ffffffff', background:'#005c71',
                fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#004d61',
                    color: '#fff'
                }
              }}
            >
              Confirmar
            </Button>
        </div>
      </DialogContent>
    </Dialog>
    </LocalizationProvider>
  )
}