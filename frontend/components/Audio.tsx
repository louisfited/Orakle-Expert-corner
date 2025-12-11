import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface StoriesProps {
  sources: string[]
  onTrackChange?: (trackIndex: number) => void
}

export const AudioStories: React.FC<StoriesProps> = ({ sources, onTrackChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [durations, setDurations] = useState<number[]>([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    Promise.all(
      sources.map(
        (src) =>
          new Promise<number>((res) => {
            const a = new Audio(src)
            a.addEventListener('loadedmetadata', () => res(a.duration))
          })
      )
    ).then((ds) => setDurations(ds))
  }, [sources])

  useEffect(() => {
    onTrackChange?.(currentTrack)
  }, [currentTrack, onTrackChange])

  useEffect(() => {
    const a = audioRef.current
    if (!a || durations.length === 0) return

    a.src = sources[currentTrack]
    a.load()
    a.volume = volume
    if (playing) a.play().catch(() => {})

    const onEnded = () => {
      if (currentTrack < sources.length - 1) {
        setCurrentTrack((i) => i + 1)
      } else {
        setPlaying(false)
      }
    }
    const onTimeUpdate = () => {
      const before = durations.slice(0, currentTrack).reduce((sum, d) => sum + d, 0)
      setElapsed(before + a.currentTime)
    }

    a.addEventListener('ended', onEnded)
    a.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [currentTrack, durations, sources])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    playing ? a.play().catch(() => {}) : a.pause()
  }, [playing])

  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volume
  }, [volume])

  const total = durations.reduce((a, b) => a + b, 0)
  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const toggle = () => setPlaying((p) => !p)
  const prev = () => {
    const a = audioRef.current!
    if (a.currentTime > 3 || currentTrack === 0) {
      a.currentTime = 0
    } else {
      setCurrentTrack((i) => i - 1)
    }
  }
  const next = () => {
    if (currentTrack < sources.length - 1) {
      setCurrentTrack((i) => i + 1)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex md:flex-row gap-12 flex-col">
        <div className="flex space-x-4 justify-center">
          {/*
          <button
            onClick={prev}
            aria-label="Previous"
            className="p-3 bg-textPrimary text-white rounded-full hover:opacity-75 transition"
          >
            <FaBackward />
          </button>
           */}
          <button
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="p-3 bg-textPrimary text-white rounded-full hover:opacity-75 transition"
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          {/*
          <button
            onClick={next}
            aria-label="Next"
            className="p-3 bg-textPrimary text-white rounded-full hover:opacity-75 transition"
          >
            <FaForward />
          </button>
              */}
        </div>
        <div className="flex h-2 w-full items-center my-auto">
          <span className="text-textPrimary mr-2 font-semibold">{fmt(elapsed)}</span>
          {durations.map((dur, idx) => {
            const cBefore = durations.slice(0, idx).reduce((a, b) => a + b, 0)
            const playedIn = elapsed <= cBefore ? 0 : elapsed >= cBefore + dur ? dur : elapsed - cBefore
            const pct = dur > 0 ? (playedIn / dur) * 100 : 0

            return (
              <div
                key={idx}
                className="flex-1 bg-gray-200 rounded h-2 mr-2"
              >
                <div
                  className="bg-textPrimary h-2"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )
          })}

          <span className="text-textPrimary ml-auto font-semibold">{fmt(total)}</span>
        </div>

        <div className="flex items-center space-x-2 px-2 mt-[-3px]">
          {volume > 0 ? <FaVolumeUp className="text-textPrimary" /> : <FaVolumeMute className="text-textPrimary" />}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-300 rounded-lg cursor-pointer"
            style={{ accentColor: '#1026C4' }}
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  )
}
