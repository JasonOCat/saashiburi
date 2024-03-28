'use client';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Video({url}) {
  return (
      <ReactPlayer controls url={url}/>
  )
}