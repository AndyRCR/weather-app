import { Line, Liquid } from '@ant-design/charts'
import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './Clouds.css'

const Clouds = () => {
    const { list, district } = useContext(GlobalContext)
    const [cloudsAvg, setCloudsAvg] = useState(null)

    const configLiquid = {
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    }

    const configChart = {
        width: 550,
        height: 240,
        xField: 'date',
        yField: 'clouds',
        yAxis: {
            min: 40,
            max: 100
        },
        meta: {
            humidity: {
                alias: 'Nubes',
                formatter: (e) => `${e}%`
            }
        },
        lineStyle: {
            lineWidth: 2
        },
        point: {
            size: 4,
            shape: "point",
        }
    }

    let chart
    const downloadImage = () => chart?.downloadImage()

    useEffect(() => {
        if (list != null) {
            let copy = [...list]
            if(copy.length > 0) setCloudsAvg(copy.map(e => e.clouds).reduce((a, b) => a + b) / copy.length)
        }
    }, [district])

    return (
        <div className='cloudsContainer'>
            <h2>Average Cloud level</h2>
            <div className='cloudsCharts'>
                {list != null ? (
                    <Line data={list} {...configChart} onReady={(chartInstance) => (chart = chartInstance)}/>
                ) : <h1>Sin registros</h1>}
                <Liquid percent={cloudsAvg / 100} {...configLiquid}></Liquid>
            </div>
            <Button variant='outlined' onClick={downloadImage}>
                Export Image
            </Button>
        </div>
    )
}

export default Clouds