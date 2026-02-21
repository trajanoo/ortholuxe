export default function AboutSection() {
    return (
        <section id='about' className='relative min-h-screen w-full flex justify-center text-white mt-10 '>
        <div className="h-full w-[85vw] flex flex-col ">
          <div className='flex text-black justify-between h-52 items-center'>
            <div className='flex flex-col text-4xl 2xl:text-5xl font-extralight'>
              <span className='text-gray-500'>About</span>
              <span className='text-black'><span className='text-cyan-600'>Ortho</span>Luxe</span>
            </div>

            <div className='w-125 2xl:text-lg mt-8'>
              <p className='text-[#FE4900] text-xl uppercase tracking-widest'>Our Vision</p>
              <p className='mt-3'>At OrthoLuxe, our vision is to blend advanced technology with compassionate care to create a welcoming space. We aim to inspire confident, healthy smiles through innovation and personalized treatment.</p>
            </div>
          </div>

          <div className='grid grid-cols-12  h-full w-full gap-x-5 gap-y-5 grid-rows-3 2xl:mt-24'>

            <div className="bg-gray-500 min-h-[180px] 2xl:min-h-[200px] col-span-6 2xl:col-span-5 2xl:col-start-2 row-span-2 rounded-3xl bg-center bg-cover shadow-xl" style={{ backgroundImage: `url('/dentalcare.png')` }}></div>

            <div className="bg-gray-500 min-h-[180px] row-span-3 col-span-3 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/dentureswoman.png')` }}></div>

            <div className="bg-gray-500 min-h-[180px] col-start-4 col-span-3  row-span-2 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/dentaltreatments.png')` }}></div>

            <div className="bg-gray-500 min-h-[200px] col-start-7 col-span-6 2xl:col-span-5 rounded-3xl bg-center bg-cover shadow-xl"
              style={{ backgroundImage: `url('/teethalignment.png')` }}
            > </div>
          </div>

        </div>
      </section>
    )
}