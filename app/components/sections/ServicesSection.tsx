import TreatmentsSlider from "../TreatmentsSlider";

export default function ServicesSection() {
    return (
        <section id='services' className="relative h-screen w-full flex justify-center items-center text-white mt-10 ">
            <div className='min-h-screen w-[85vw] flex flex-col 2xl:gap-16'>
                <div className='flex text-black justify-between h-52 items-center'>
                    <div className='flex flex-col text-4xl 2xl:text-5xl font-extralight'>
                        <span className='text-gray-500'>Available</span>
                        <span className='text-black'>Treatments</span>
                    </div>

                    <div className='w-125 2xl:text-lg mt-8'>
                        <p className='text-[#FE4900] text-xl uppercase tracking-widest'>Our services</p>
                        <p className='mt-3'>At OrthoLuxe, we offer a wide range of treatments, from routine cleaning and fillings to advanced procedures like implants and cosmetic dentistry. Our goal is to provide personalized care for all your dental needs.</p>
                    </div>
                </div>

                <TreatmentsSlider />
            </div>
        </section>
    );
}