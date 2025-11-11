import { HOST } from '@/lib/constants'
import { useAppStore } from '@/store'
import React, { createContext, useRef, useEffect, useContext, Children } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore()

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });
            socket.current.on("connect", () => {
                console.log(`Connected to socket server`)
            })

            return () => {
                socket.current.disconnect()
            }
        }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current} >
            {children}
        </SocketContext.Provider>
    )
}