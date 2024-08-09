import { create } from "zustand"

export default create((set, get) =>
{
    return {
        songPlaying: false,

        songStartTime: 0,

        songStopTime: 0,

        //change global status
        startSong: () =>
        {
            set((state) => ({songStartTime: Date.now()}))
            set((state) => ({songPlaying: true}))
            return get().songStartTime
        },

        //get song start time
        getSongTime: () => {
            return get().songStartTime
        },

        //currently unused
        setSongOff: () => 
        {
            set((state) => ({songStopTime: Date.now()}))
            set((state) => ({songPlaying: false}))
            return get().songStopTime
        },
    }
})