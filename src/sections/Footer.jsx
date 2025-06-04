import {useState} from "react";

const Footer = () => {
    return (
        <section className="relative bg-black z-10">
        <group className="border-t border-black-300 flex justify-center gap-7 pt-3 pb-2.5 sm:hidden wrap items-center">
        <a href="https://github.com/AlexCDowsett" target="_blank" title="GitHub">
                    <div className="social-icon">
                        <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
                    </div>
                </a>

                <a href="https://www.linkedin.com/in/alex-dowsett-27266b151/" target="_blank" title="LinkedIn">
                    <div className="social-icon">
                        <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2"/>
                    </div>
                </a>

                <a href="https://www.instagram.com/alexccole_/" target="_blank" title="Instagram">
                    <div className="social-icon">
                            <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2"/>
                    </div>
                </a>
                <a href="https://leetcode.com/u/alex220101/" target="_blank" title="LeetCode">
                    <div className="social-icon">
                        <img src="/assets/leetcode.svg" alt="leetcode" className="w-1/2 h-1/2"/>
                    </div>
                </a>
        </group>
        <group className="c-space sm:pt-7 lg:pb-1 lg:border-t md:border-t sm:border-t border-black-300 justify-between items-center wrap gap-3 xl:gap-5 flex">
            <div className="text-white-500 text-s text-s sm:text-md md:text-lg lg:flex xl:pl-10">
                <a href="/legal#terms" className="hover:text-white transition-colors">
                    <p>Terms & Conditions</p>
                </a>
                <p className="hidden sm:hidden lg:block md:hidden">&nbsp;&nbsp;|&nbsp;&nbsp;</p>
                <a href="/legal#privacy" className="hover:text-white transition-colors">
                    <p>Privacy Policy</p>
                </a>
            </div>

            <div className=" gap-3 lg:gap-5 hidden lg:flex md:flex sm:flex">
                <a href="https://github.com/AlexCDowsett" target="_blank" title="GitHub" className="group">
                    <div className="social-icon w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:border-2 hover:border-white rounded-full">
                        <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
                    </div>
                </a>

                <a href="https://www.linkedin.com/in/alex-dowsett-27266b151/" target="_blank" title="LinkedIn" className="group">
                    <div className="social-icon w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:border-2 hover:border-white rounded-full">
                        <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2"/>
                    </div>
                </a>

                <a href="https://www.instagram.com/alexccole_/" target="_blank" title="Instagram" className="group">
                    <div className="social-icon w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:border-2 hover:border-white rounded-full">
                        <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2"/>
                    </div>
                </a>
                <a href="https://leetcode.com/u/alex220101/" target="_blank" title="LeetCode" className="group">
                    <div className="social-icon w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:border-2 hover:border-white rounded-full">
                        <img src="/assets/leetcode.svg" alt="leetcode" className="w-1/2 h-1/2"/>
                    </div>
                </a>
            </div>

            <div className="text-white-500 text-right lg:flex text-s sm:text-md md:text-lg xl:pr-10">
                <a href="/legal#copyright" className="hover:text-white transition-colors">
                    <p className="hidden md:block">© 2025 Alex Dowsett.&nbsp;All rights reserved.</p>
                    <div className="block md:hidden">
                        <p>© 2025 Alex Dowsett.</p>
                        <p>&nbsp;All rights reserved.</p>
                    </div>
                </a> 
            </div>
        </group>
        </section>

    )
}
export default Footer
