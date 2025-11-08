import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ContactsContainer from './components/contacts-container/Index'
import EmptyChatContainer from './components/empty-chat-container/Index'
import ChatContainer from './components/chat-container/Index'

const Chat = () => {

  const { userInfo } = useAppStore()

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue")
      navigate("/profile")
    }
  }, [userInfo, navigate])

  return (
    <div className='flex h-screen text-white overflow-hidden'>
      <ContactsContainer />
      <EmptyChatContainer/>
      <ChatContainer/>
    </div>

  )
}

export default Chat
