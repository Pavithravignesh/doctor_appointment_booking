import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div>
            {/* Left Side */}
            <div>
                <p>Book Appointment<br />With Trusted Doctors</p>
                <div className="">
                    <img src={assets.group_profiles} alt="" srcset="" />
                    <p>Simply browse through our extensive list of trusted doctors,<br />
                        schedule your appointment hassle-free.</p>
                    <a href="http://">
                        Book Appointment <img src={assets.arrow_icon} alt="" srcset="" /></a>
                </div>
            </div>

            {/* Right Side */}
            <div>
                <img src={assets.header_img} alt="" srcset="" />
            </div>
        </div>
    )
}

export default Header
