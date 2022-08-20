import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const test = async () => {
    console.log('start')
    const res = await fetch('http://localhost:8000/tests');
    const data = await res.json();
    console.log(data)
  }

  useEffect(() => {
    test()
  }, [])

  return (
    <div>
      <Head>
        <title>Dutch Account App</title>
        <meta name="description" content="dutch account app" />
        <link rel="icon" href="/receipt.ico" />
      </Head>
    </div>
  )
}

export default Home
