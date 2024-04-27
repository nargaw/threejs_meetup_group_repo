import { create } from "zustand";

export default create((set, get) => {
    return {
        
        //page value
        pageValue: 0,

        //set page position value
        setPageValue: (val) => 
        {
            set((state) => ({pageValue: val }))
        },
    }
})