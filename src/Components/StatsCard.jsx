


export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white  justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
        <div className='flex flex-col gap-3 justify-between'>
            <h1 className='text-md text-gray-400 font-medium'>{title}</h1>
            <h1 className='text-4xl font-bold'>{value}</h1>
        </div>
      <div>
        {/* Verifica que Icon exista antes de renderizar */}
        {Icon && (
          <Icon sx={{
            background:'#e6eff1',
            color:'#005c71',
            fontSize:'3.5rem',
            padding:'0.7rem',
            borderRadius:'0.8rem'
          }} />
        )}
      </div>
    </div>
  );
}