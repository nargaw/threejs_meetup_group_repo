import { create } from "zustand"

export default create((set, get) =>
{
    return {
        songPlaying: false,

        songStartTime: 0,

        songStopTime: 0,

        startSong: () =>
        {
            set((state) => ({songStartTime: Date.now()}))
            set((state) => ({songPlaying: true}))
            return get().songStartTime
        },

        getSongTime: () => {
            return get().songStartTime
        },

        setSongOff: () => 
        {
            set((state) => ({songStopTime: Date.now()}))
            set((state) => ({songPlaying: false}))
            return get().songStopTime
        },
    }
})