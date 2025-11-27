"use client"

import { useEffect } from "react"
import { testSanityConnection } from "../sanity/client"

export default function TestSanity() {
  useEffect(() => {
    testSanityConnection()
  }, [])

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Testing Sanity Connection...</h1>
      <p>Open your browser console to see results ✅</p>
    </div>
  )
}
