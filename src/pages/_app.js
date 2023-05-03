import '@/styles/globals.css'
import { useState } from 'react'
import AppContext from '@/components/AppContext'
export default function App({ Component, pageProps }) {
  const [unit, setunit] = useState("c")
  return (
    <AppContext.Provider value={{unit,setunit}}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
