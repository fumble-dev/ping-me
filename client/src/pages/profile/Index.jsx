import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/store'
import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { colors } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { UPDATE_PROFILE } from '@/lib/constants'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const { userInfo, setUserInfo } = useAppStore()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState("")
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const navigate = useNavigate()

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required")
      return false
    }
    if (!lastName) {
      toast.error("Last Name is required")
      return false
    }
    return true
  }

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(UPDATE_PROFILE, { firstName, lastName, color: selectedColor }, { withCredentials: true })
        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data })
          toast.success("Profile Updated Successfully")
          navigate('/chat')
        }
      } catch (error) {
        console.log({ error })
      }
    }
  }

  return (
    <div className='bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col w-[80vw] md:w-max">
        <div>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden ">
              {
                image ? (
                  <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
                ) : (
                  <div className='uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border flex items-center justify-center rounded-full bg-[#712c4a57] text-black'>
                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                  </div>
                )
              }
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer text-white'>
                  {
                    image ? <FaTrash className='text-white cursor-pointer text-3xl' /> : <FaPlus className='text-white cursor-pointer text-3xl' />
                  }
                </div>
              )
            }
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center '>
            <div className='w-full'>
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="First Name"
                type="text"
                value={userInfo.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="Last Name"
                type="text"
                value={userInfo.lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((color, index) => (
                  <div
                    key={index}
                    className={`${color} h-8 w-8 rounded-full cursor-pointer ${selectedColor === index ? "outline-2 outline-white" : ""}`}
                    onClick={() => setSelectedColor(index)}
                  >
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full mt-5'>
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
