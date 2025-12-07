import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets';

function MyProfile() {

    const [userData, setUserData] = useState({
        name: "Edward Vincent",
        img: assets.profile_pic,
        email: 'richardjameswap@gmail.com',
        phone: '+1 123 456 7890',
        address: {
            line1: `57th Cross, Richmond`,
            line2: `Circle, Church Road, London`
        },
        gender: 'male',
        dob: '1999-07-27'
    });
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={userData.img} alt="img" />
            {
                isEdit ? <input className='bggray-50 text-3xl font-medium max-60 mt-4' type='text' value={userData.name} onChange={(e) => setUserData((prev) => { return { ...prev, name: e.target.value } })} /> : <p className='font-medium text-3xl text-neutral-600 mt-4'>{userData.name}</p>
            }
            <hr className='bg-zinc-400 h-[1px] border-none' />
            <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className='font-medium'>Email id:</p>
                <p className='text-blue-500' text>{userData.email}</p>
                <p className='font-medium'>Phone:</p>
                {
                    isEdit ? <input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={(e) => setUserData((prev) => { return { ...prev, phone: e.target.value } })} /> : <p className='text-blue-500'>{userData.phone}</p>
                }
                <p className='font-medium'>Address:</p>
                {
                    isEdit ? <p>
                        <input className='bg-gray-100 max-w-52' type='text' value={userData.address.line1} onChange={(e) => setUserData((prev) => { return { ...prev, line1: e.target.value } })} />
                        <br />
                        <input className='bg-gray-100 max-w-52' type='text' value={userData.address.line2} onChange={(e) => setUserData((prev) => { return { ...prev, line2: e.target.value } })} /></p> :
                        <div className="text-gray-500">
                            <p className='text-gray-400'>{userData.address.line1}</p>
                            <p className='text-gray-400'>{userData.address.line2}</p>
                        </div>
                }
            </div>

            <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className='font-medium'>Gender:</p>
                {isEdit ? <select className='bg-gray-100 max-w-52' onChange={(e) => setUserData((prev) => { return { ...prev, gender: e.target.value } })} value={userData.gender}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select> : <p className='text-gray-400'>{userData.gender}</p>}
                <p className='font-medium'>Birthday:</p>
                {
                    isEdit ? <input className='bg-gray-100 max-w-52' type='date' value={userData.dob} onChange={(e) => setUserData((prev) => { return { ...prev, dob: e.target.value } })} /> : <p className='text-gray-400'>{userData.dob}</p>
                }
            </div>
            <div className="mt-10">
                {
                    !isEdit ? <button className='border border-primary py-2 px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-200' type='button' onClick={() => setIsEdit(true)} >Edit</button> :
                        <button className='border border-primary py-2 px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-200' type='button' onClick={() => setIsEdit(false)} >Save Info</button>
                }
            </div>
        </div>
    )
}

export default MyProfile
