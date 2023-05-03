import HomeElem from '@/components/HomeElem'
import Head from 'next/head'
export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="A weather app is a mobile application that provides users with current and forecasted weather conditions for a specific location. It typically displays temperature, humidity, wind speed and direction, precipitation, and other relevant weather data. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/weather.svg" />
        
      </Head>
      <div>
       <HomeElem/>
      </div>
    </>
  )
}
