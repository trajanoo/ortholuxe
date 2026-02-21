export default function ContactSection() {
    return (
        <section id='contact' className='relative min-h-screen flex justify-center items-center mt-15 2xl:mt-0'>
        <div className='h-[90vh] w-[95vw] flex  bg-gradient-to-r from-[#E6E6E6] to-white  rounded-3xl overflow-hidden'>
          <div className="flex h-full w-full mx-36">
            <div className='w-1/2 h-full flex flex-col justify-center items-start gap-3 2xl:gap-5 text-sm 2xl:text-base'>
              <h1 className='text-black text-5xl 2xl:text-5xl font-bold  tracking-tight'><span className='text-gray-500 font-light'>Book</span> Appointment</h1>

              <div className='flex gap-5 mt-6 2xl:mt-10'>
                <input type="text" placeholder='YOUR NAME' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" placeholder='CONTACT NO.' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" />
              </div>

              <div className='flex gap-5'>
                <input type="text" placeholder='EMAIL ID' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" placeholder='YOUR AGE' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="text" />
              </div>

              <div className='flex flex-col gap-5'>
                <input type="text" placeholder='SELECT SERVICES' className='uppercase tracking-wide bg-white p-4 2xl:p-5  rounded-full text-gray-800 w-130' />
                <input type="text" placeholder='SELECT CLINIC' className='uppercase tracking-wide bg-white p-4 2xl:p-5  rounded-full text-gray-800 w-130' />
              </div>

              <div className='flex gap-5'>
                <input type="date" placeholder='SELECT DATE' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
                <input type="time" placeholder='SELECT TIME' className='uppercase tracking-wide bg-white p-4 2xl:p-5 2xl:w-82 rounded-full text-gray-800' />
              </div>
              <button className="2xl:h-16 h-14 2xl:w-72 w-52 rounded-full mt-4 bg-[#FE4900] hover:bg-[#FE4900]/80 cursor-pointer transition backdrop-blur-md text-white text-sm font-light border border-white/30 uppercase tracking-widest ">
                Book Appointment
              </button>
            </div>

            <div className='w-1/2 h-full flex justify-center items-center'>
              <img src="mao.png" alt="Mao" className="max-w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>
    )
}