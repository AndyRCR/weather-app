import { Line, Liquid } from '@ant-design/charts'
import { Button, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './Clouds.css'

const Clouds = () => {
    const { list } = useContext(GlobalContext)
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
            clouds: {
                alias: 'Clouds',
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
        if (list != null) setCloudsAvg(list.map(e => e.clouds).reduce((a, b) => a + b) / list.length)
    }, [list])

    return (
        <div className='cloudsContainer'>
            <h2>Average Cloud level</h2>
            <div className='cloudsCharts'>
                {list != null ? (
                    <>
                        <Line data={list} {...configChart} onReady={(chartInstance) => (chart = chartInstance)} />
                        <Liquid percent={cloudsAvg / 100} {...configLiquid}></Liquid>
                    </>
                ) : <CircularProgress />}
                
            </div>
            <Button variant='outlined' onClick={downloadImage}>
                Export Image
            </Button>
        </div>
    )
}

export default Clouds