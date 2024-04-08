import React, { useState } from 'react'
import axios from 'axios'


const EmailForm = ({ id }) => {
    const [emailFrom,setEmailFrom] = useState("")
    const [emailTo,setEmailTo] = useState("")
    const [message,setMessage] = useState(null)

    const HandleEmail = async (e) => {
        e.preventDefault();
        try {
         const {data} =await axios({
                method : "POST",
                url : "api/files/email",
                data : {
                    id,
                    emailFrom,
                    emailTo,
                }
            })
            setMessage(data.message)
        } catch (error) {
            setMessage(error.message)
        }
         }


    return (
        <div className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
            <h3>You can also send the file through mail</h3>
            <form className='flex flex-col items-center justify-center w-full p-2 space-y-3' onSubmit={HandleEmail}>
                <input 
                    type="email" 
                    placeholder='Email From' 
                    required 
                    className='p-1 text-white bg-gray-800 border-2 focus:outline-none' 
                    onChange={(e)=>setEmailFrom(e.target.value)} 
                    value={emailFrom}/>
                <input 
                    type="email" 
                    placeholder='Email To' 
                    required 
                    className='p-1 text-white bg-gray-800 border-2 focus:outline-none' 
                    onChange={(e)=>setEmailTo(e.target.value)} 
                    value={emailTo}/>
                <button className='h-10 my-5 bg-gray-700 rounded w-44 focus:outline-none' type="submit">Email</button>    
            </form>
            {
                message && <p className='font-medium text-red-400'>
                   Message : {message}
                </p>
            }
        </div>
    )
}


export default EmailForm