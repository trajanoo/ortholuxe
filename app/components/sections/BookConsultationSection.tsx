export default function BookConsultationSection() {
    return (
      <section className=" w-full mt-40 2xl:mt-15">
        <div className="relative h-[40vh] w-full bg-gradient-to-r from-white to-[#C0EDFF] overflow-visible flex items-center justify-center">
          <div className='mr-[600px] flex flex-col gap-5'>
            <p className='text-5xl 2xl:text-6xl font-extrabold text-[#04B5FF]'><span className='text-black mr-2 font-light'>Book</span> Free Consultation</p>
            <button className="h-16 w-44 rounded-full bg-[#FE4900] hover:bg-[#FE4900]/80 cursor-pointer transition backdrop-blur-md text-white text-sm font-light border border-white/30 uppercase tracking-widest ">
              Book now
            </button>
          </div>

          <img src="/tooth.png" alt="Tooth" className="absolute right-1 bottom-[-40px] w-[600px] 2xl:w-[860px]" />

        </div>
      </section>  
    )
}