import axios from 'axios'
import React, { FunctionComponent, useState } from 'react'

const EmailForm: FunctionComponent<{
    id: string | null | number;
}> = ({ id }) => {
    
    const HandleEmail = async (e: any) => {
        e.preventDefault() 
        try {
            const { data } = await axios({
                method: "POST",
                url: "api/files/email",
                data: {
                    id,
                    emailFrom,
                    emailTo
                }
            });
            setMessage(data.message)
        } catch (error: any) {
            setMessage(error)
        }
    }

    const [emailFrom, setEmailFrom] = useState("")
    const [emailTo, setEmailTo] = useState("")
    const [message, setMessage] = useState(null)

    return (
        <div className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
            <h3 className='text-white font-semibold text-xl'>
                You can also send the file through mail
            </h3>
            <form
                action=""
                className='flex flex-col items-center justify-center w-full p-2 space-y-3'
                onSubmit={HandleEmail}
            >
                <input 
                    type="email" 
                    placeholder='Email From' 
                    required 
                    className='p-2 text-black bg-[#F5FFFA] border-2 border-[#2F4F4F] focus:outline-none rounded-lg'
                    onChange={(e) => setEmailFrom(e.target.value)} 
                    value={emailFrom} 
                />
                <input 
                    type="email" 
                    placeholder='Email To' 
                    required 
                    className='p-2 text-black bg-[#F5FFFA] border-2 border-[#2F4F4F] focus:outline-none rounded-lg'
                    onChange={(e) => setEmailTo(e.target.value)} 
                    value={emailTo} 
                />
                <button
                    className='w-44 bg-[#66FF66] hover:bg-[#66CC66] my-5 h-10 rounded-lg text-white focus:outline-none'
                    type="submit"
                >
                    Email
                </button>    
            </form>
            {
                message && (
                    <p className='font-medium text-[#FF6347]'>
                        {message}
                    </p>
                )
            }
        </div>
    )
}

export default EmailForm;
