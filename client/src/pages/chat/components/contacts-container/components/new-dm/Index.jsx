import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import apiClient from '@/lib/api-client'
import { HOST, SEARCH_CONTACTS_ROUTES } from '@/lib/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'

const NewDm = () => {

    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const res = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchTerm }, { withCredentials: true });
                if (res.status === 200 && res.data.contacts) {
                    setSearchedContacts(res.data.contacts)
                    // console.log(res.data.contacts)
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-50 cursor-pointer transition-all duration-300'
                            onClick={() => setOpenNewContactModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1c1b1e] border-none mb-2 p-3 text-white'>
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal} >
                <DialogContent className={`bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col`}>
                    <DialogHeader>
                        <DialogTitle>Please Select a Contact</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Search Contact"
                            className={`rounded-lg p-6 bg-[#2c2e3b] border-none`}
                            onChange={e => searchContacts(e.target.value)}
                        />
                    </div>
                    <ScrollArea className={`h-[250px]`}>
                        <div className='flex flex-col gap-5'>
                            {
                                searchedContacts?.map((contact) => (
                                    <div key={contact._id} className='flex gap-3 items-center cursor-pointer'>
                                        <div className='w-12 h-12 relative'>
                                            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                {contact?.image ? (
                                                    <AvatarImage
                                                        src={`${HOST}/${contact.image}`}
                                                        alt="profile"
                                                        className="object-cover w-full h-full bg-black"
                                                    />
                                                ) : (
                                                    <div
                                                        className={`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(
                                                            contact?.color
                                                        )}`}
                                                    >
                                                        {contact?.firstName
                                                            ? contact.firstName.charAt(0)
                                                            : contact?.email?.charAt(0)}
                                                    </div>
                                                )}
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>
                                                {
                                                    contact.firstName && contact.lastName
                                                        ? `${contact.firstName} ${contact.lastName}` : ""
                                                }
                                            </span>
                                            <span className='text-xs'>
                                                {contact.email}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ScrollArea>
                    {
                        searchedContacts.length <= 0 && (
                            <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
                                <h3 className='poppins-medium'>
                                    <span className='text-purple-500'>Hi</span> Search new
                                    <span className='text-purple-500'> contact.</span>
                                </h3>
                            </div>
                        )
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewDm
