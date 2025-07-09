import {create} from 'zustand'

export const authStore = create((set)=>({
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem("token") || null,
    id: localStorage.getItem("id") || null,
    isAuthenticated: !!localStorage.getItem("token"),

    storeToken: (username,token,id)=>{
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        localStorage.setItem("id",id)
        set({token,username,isAuthenticated:true,id})
    },
    removeToken: ()=>{
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        set({username:null, token:null, isAuthenticated:false, id:null})
    }
}))