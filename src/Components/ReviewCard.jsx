import { Star } from "@mui/icons-material";



export default function ReviewCard({ client, rating, comment, date }) {
    return (
        <div className="px-6 py-10 space-y-2">
            <div className="flex items-center justify-between">
                <p>{client}</p>
                <div className="flex items-center gap-1">
                    {Array.from({ length: rating }).map((_, index) => (
                        <Star key={index} sx={{height:16, width:16, color:'gold'}} />
                    ))}
                </div>
            </div>
            <p className="text-sm text-gray-500">{comment}</p>
            <p className="text-xs text-gray-500">{date}</p>
        </div>
    );
}
