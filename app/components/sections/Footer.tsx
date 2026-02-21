import { Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden">

            <div className="w-full overflow-hidden">
                <div className="flex animate-marquee min-w-max justify-center items-center">
                    <h1 className="text-[7rem] 2xl:text-[10rem] text-[#55CFFE] font-black scale-y-[1.2] tracking-tight px-10 whitespace-nowrap">
                        ORTHOLUXE HEALTH VENTURES
                    </h1>

                    <h1 className="text-[8rem] 2xl:text-[10rem] text-[#55cefec7] font-black scale-y-[1.2] tracking-tight px-10 whitespace-nowrap">
                        ORTHOLUXE HEALTH VENTURES
                    </h1>
                </div>
            </div>

            <div className="w-[95vw] h-[65vh] 2xl:h-[65vh] bg-gradient-to-r from-[#C0EDFF] to-white rounded-2xl mt-7 ">
                <div className="w-full px-16 xl:px-28 py-12 2xl:py-24 flex flex-col lg:flex-row justify-between text-black">

                    <div className="max-w-md space-y-8">
                        <span className="text-2xl mb-10 font-light tracking-tight text-cyan-500">
                            Ortho<span className="text-black">Luxe</span>
                        </span>

                        <div className="space-y-3 text-sm 2xl:text-base">
                            <h2 className="font-bold mt-10">
                                OrthoLuxe Health Ventures LLP
                            </h2>
                            <p>Unit 6, Woolwich Trademan Park, Pettman Crescent,</p>
                            <p>Thamesmead, London - SE28 OAJ</p>
                        </div>

                        <div className="space-y-2 text-sm 2xl:text-base">
                            <p>Call us: <span className="font-bold">+55 51 99518 9792</span></p>
                            <p>Email us: <span className="font-bold">info@ortholuxe.com</span></p>
                            <p>Clinic Hours: <span className="font-bold">10:00 AM - 8:00 PM</span></p>
                        </div>

                        <p className="text-sm py-3 2xl:pt-16">
                            © 2026. OrthoLuxe Health Ventures LLP. ALL RIGHTS RESERVED
                        </p>
                    </div>

                    <div className="flex flex-col mt-16 lg:mt-0">

                        <div className="flex gap-24">

                            <div className="space-y-6">
                                <p className="font-bold text-sm 2xl:text-lg">
                                    Available Treatments
                                </p>
                                <ul className="space-y-4 text-sm 2xl:text-base">
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Dentures</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Braces</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Invisalign</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Teeth Cleaning</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Teeth Whitening</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Root Canals</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Implants</li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <p className="font-bold text-sm 2xl:text-lg">Other</p>
                                <ul className="space-y-4 text-sm 2xl:text-base">
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">About us</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Book Appointment</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Our Treatments</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Our Clinics</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Contact Us</li>
                                    <li className="cursor-pointer hover:text-[#FE4900] transition">Privacy Policy</li>
                                </ul>
                            </div>

                        </div>

                        <div className="2xl:flex gap-6 mt-16 hidden">
                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-full hover:shadow-md cursor-pointer transition">
                                <span className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
                                    <Facebook size={16} className="text-white" />
                                </span>
                                <span className="text-sm font-medium">Facebook</span>
                            </button>

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-full hover:shadow-md cursor-pointer transition">
                                <span className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
                                    <Twitter size={16} className="text-white" />
                                </span>
                                <span className="text-sm font-medium">Twitter</span>
                            </button>

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-full hover:shadow-md cursor-pointer transition">
                                <span className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
                                    <Instagram size={16} className="text-white" />
                                </span>
                                <span className="text-sm font-medium">Instagram</span>
                            </button>

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-full hover:shadow-md cursor-pointer transition">
                                <span className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
                                    <Linkedin size={16} className="text-white" />
                                </span>
                                <span className="text-sm font-medium">LinkedIn</span>
                            </button>
                        </div>


                    </div>


                </div>
            </div>
        </section>
    )
}