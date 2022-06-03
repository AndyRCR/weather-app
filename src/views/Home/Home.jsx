import React, { useContext, useEffect } from 'react'
import './Home.css'
import Chart from '../../components/Chart/Chart'
import Form from '../../components/Form/Form'
import { GlobalContext } from '../../context/GlobalStateContext'
import Humidity from '../../components/Humidity/Humidity'
import Clouds from '../../components/Clouds/Clouds'

const Home = () => {

  const {getData} = useContext(GlobalContext)

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className='homeContainer'>
        <h1 style={{color: 'white'}}>Administrador de pronóstico climático</h1>
        <div className='contentContainer'>
          <div className='firstContainer'>
            <Form/>
            <Chart/>
          </div>
          <div className='secondContainer'>
            <Humidity/>
            <Clouds/>
          </div>
        </div>
    </div>
  )
}

export default Home