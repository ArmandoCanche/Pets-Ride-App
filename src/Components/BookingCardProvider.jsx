import { Avatar } from "@mui/material";


export default function BookingCardProvider(client) {
    const statusColors = {
    pendiente:  "bg-yellow-500/10 text-yellow-600 dark:text-yellow-600 border border-yellow-500/20",
    confirmado: "bg-blue-500/10   text-blue-800   dark:text-blue-600   border border-blue-500/20",
    completado: "bg-green-500/10  text-green-800  dark:text-green-600  border border-green-500/20",
    cancelado:  "bg-red-500/10    text-red-800    dark:text-red-600    border border-red-500/20",
    };

    return (
        <div>
            <div className="hover:shadow-lg border p-4 rounded-lg shadow-sm transition-shadow duration-200">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar src="/static/images/avatar/1.jpg" alt={`${client}`} />

                    </div>

                </div>
            </div>
        </div>
    );
}