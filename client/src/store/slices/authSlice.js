export const createAuthSlice = (set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo })
})

export const createChatSlice = (set) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],

    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] })
})