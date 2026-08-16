"use client"
import { useState } from "react"

export default function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(prev => prev + 1)}>increser</button>
    </div>
  )
}
