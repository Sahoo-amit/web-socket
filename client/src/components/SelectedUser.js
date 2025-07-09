import {create} from 'zustand'

export const SelectedUser = create((set)=>({
    currentUser: null,

    setCurrentUser: (user)=> set({currentUser:user})
}))