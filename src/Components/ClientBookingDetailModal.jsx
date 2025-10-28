// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Dialog, DialogContent,  DialogTitle, Badge, Button, Avatar } from "@mui/material";
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
    onOpenChange(false);
    if (onMessage) {
      onMessage();
    } else {
      // CAMBIO: 'router.push' se convierte en 'navigate'
      navigate("/client/messages");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Provider Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              PROVIDER INFORMATION
            </h3>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={booking.providerImage || "/placeholder.svg"}
                  alt={booking.providerName}
                />
                <AvatarFallback>{booking.providerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{booking.providerName}</h4>
                {booking.providerRating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{booking.providerRating}</span>
                    <span className="text-sm text-muted-foreground">
                      (128 reviews)
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
              <Badge
                className={
                  booking.status === "confirmed"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : booking.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
                      : booking.status === "completed"
                        ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                        : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                }
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              BOOKING DETAILS
            </h3>
            <div className="space-y-3">
              {booking.bookingId && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono text-sm">{booking.bookingId}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Service Type</span>
                <span className="font-semibold">{booking.serviceType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pet</span>
                <span className="font-medium">{booking.petName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{booking.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{booking.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Location</span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{booking.location}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">
                  Total Price
                </span>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="font-bold text-accent text-xl">
                    ${booking.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  YOUR NOTES
                </h3>
                <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                  {booking.notes}
                </p>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90"
              onClick={handleMessage}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Provider
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}