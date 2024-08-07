import './songInterface.css'
import useSong from "./stores/songState";
import { useEffect, useRef } from "react";
import { addEffect } from '@react-three/fiber';

export default function SongUI()
{
    //get/update global values
    const songStatus = useSong(state => state.songPlaying)
    const getSongTime = useSong(state => state.getSongTime)
    const startSong = useSong(state => state.startSong)
    const stopSong = useSong(state => state.setSongOff)
    const songStopTime = useSong(state => state.songStopTime)
    
    //time and progress references
    const time = useRef()
    const progress = useRef()

    //convert time value to minutes and seconds
    const timeDisplay = (e) => 
    {
        const m = Math.floor(e % 3600 / 60).toString().padStart(2,'0')
        const s = Math.floor(e % 60).toString().padStart(2,'0')
        return m + ':' + s;
    }

    //can only use useFrame inside the canvas
    //use addEffect when outside the canvas to get the same result
    useEffect(() =>
    {
        const unsubscribeEffect = addEffect(() =>
        {   
            
            const startTime = getSongTime()
            let elapsedTime = (songStopTime - startTime)/1000
            if(songStatus == false)
            {
                // console.log('off')
                elapsedTime = (songStopTime - startTime) / 1000
                time.current.textContent = timeDisplay(elapsedTime)
                progress.current.style.width = ((elapsedTime/137) * 100) + '%'   
            }
            
            //when the song plays
            //get current time and subtract it from the start time everyframe 
            if(songStatus == true)
            {
                // console.log('on')
                elapsedTime = Date.now() - startTime
                elapsedTime /= 1000
                if(time.current && elapsedTime <= 137){
                    time.current.textContent = timeDisplay(elapsedTime)
                    progress.current.style.width = ((elapsedTime/137) * 100) + '%'
                }
            }
        })

        return () =>
        {
            unsubscribeEffect()
        }
    })

    return <>
        <div className="interface">
            {songStatus == false && <div className="start" onClick={startSong}>start</div>}
            {/* {songStatus == true && <div className="stop" onClick={stopSong}>stop</div>} */}
            <div className="song">song: New Adventure</div>
            <div className="artist">artist: Matrika </div>
            <div id='Progress_Status'>
                <div className="progress" ref={progress}></div>
            </div>
            <div className="time" ref={time}>00:00</div>
        </div>
    </>
}