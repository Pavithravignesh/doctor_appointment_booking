import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { RelatedDoctors } from '../components';

function Appointments() {
    const { docId } = useParams();
    const { doctors, currencySymbol } = useContext(AppContext);
    const daysOfWeeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    // doctor info
    const [docInfo, setDocInfo] = useState(null);
    // doctor slot
    const [docSlot, setDocSlot] = useState([]);
    // doctor slot index
    const [slotIndex, setSlotIndex] = useState(0);
    // slot time
    const [slotTime, setSlotTime] = useState("");

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => (doc._id === docId));
        setDocInfo(docInfo);
        // console.log(docInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlot([]);

        // get current date
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            // getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date(currentDate)
            // endTime.setTime(today.getDate() + 1);
            endTime.setHours(21, 0, 0, 0)

            // If it's today → start from the next 30-minute slot
            if (today.toDateString() === currentDate.toDateString()) {
                let now = new Date();

                // Round to next 30-minute interval
                now.setMinutes(now.getMinutes() < 30 ? 30 : 60);
                now.setSeconds(0);
                now.setMilliseconds(0);

                currentDate.setHours(now.getHours());
                currentDate.setMinutes(now.getMinutes());
            }
            else {
                // For future dates → start at 10:00 AM
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }


            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                // add slots to array
                timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })

                //  increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlot(prev => ([...prev, timeSlots]));
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => { getAvailableSlots() }, [docInfo])

    useEffect(() => { console.log(docSlot) }, [docSlot])

    return docInfo && (
        <div className=''>
            {/* Doctor Details */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-primary w-full sm:max-w-72 rounded-lg">
                    <img src={docInfo.image} alt="" srcset="" />
                </div>
                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-whtie mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                    {/* Doctor Info: name, degree, experience */}
                    <p className='flex inters-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified_icon" srcset="" /></p>
                    <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full' type="button">{docInfo.experience}</button>
                    </div>
                    {/* Doctor About */}
                    <div className="">
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="info_icon" srcset="" /></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    {/* Doctor appointment fee */}
                    <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span></p>
                </div>
            </div>

            {/* BBooking Slots */}
            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p>Booking Slots</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {docSlot.length && docSlot.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
                            <p>{item[0] && daysOfWeeks[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                    {docSlot.length && docSlot[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border--gray-300'}`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <div className="">
                    <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' type="button">Book on Appointment</button>
                </div>
            </div>
            {/* Listing Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointments