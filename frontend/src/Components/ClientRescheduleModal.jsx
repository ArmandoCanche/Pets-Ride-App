import { Dialog, DialogContent } from "@mui/material";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import BookingCard from "./BookingCard";


export default function ClientRescheduleModal({ open, onOpenChange, booking }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(booking.time)
  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}
    slotProps={{
      paper:{
        sx:{
          borderRadius: "1rem",
          maxWidth:"600px",
          padding: 3
        }
      }
    }}
    >
      <DialogContent
      sx={{
        display:"flex",
        flexDirection:"column",
        gap:'1rem'
      }}
      >
        <h1 className="text-2xl font-semibold">Reprogramar reserva</h1>
        <div className="flex gap-3 text flex-col">
          <h2 className="text-base font-semibold text-gray-500">ACTUAL RESERVA</h2>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{booking.serviceType}</p>
            <p className="text-sm text-gray-500">{booking.providerName} • {booking.petName}</p>
            <div className="flex items-center gap-4">
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

        {/* Seleccionar la fecha */}
        <div className="">
          <span className="font-medium">Selecciona una nueva fecha</span>
          <div className="flex justify-center">

          </div>

        </div>
        
      </DialogContent>

    </Dialog>
  )
}