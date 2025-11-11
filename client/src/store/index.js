import { create } from "zustand";
import { createAuthSlice, createChatSlice } from "./slices/authSlice";


export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}))