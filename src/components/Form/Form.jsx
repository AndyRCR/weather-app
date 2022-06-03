import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { db } from '../../services/Firebase'
import { addDoc, collection } from 'firebase/firestore'
import { GlobalContext } from '../../context/GlobalStateContext'
import { toast, ToastContainer } from 'react-toastify'
import './Form.css'

const Form = () => {

  const { getData, district, setDistrict } = useContext(GlobalContext)

  const [formValue, setFormValue] = useState({
    district: district,
    date: null,
    averageDay: '',
    averageNight: '',
    clouds: '',
    gusts: 0,
    humidity: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
    if(e.target.name === 'district'){
      setDistrict(e.target.value)
      getData()
    }
  }

  const sendData = async () => {
    try {
      if(
        formValue.averageDay === '' || formValue.averageNight === '' ||
        formValue.clouds === '' || formValue.humidity === '' ||
        formValue.date === null
      ){
        Swal.fire({
          icon: 'info',
          title: 'Incomplete dates!',
          text: 'All fields are required'
        })
      }else{
        const col = collection(db, 'districts')
        await addDoc(col, formValue)
        toast.success('Registration entered successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setFormValue({
          district: district,
          date: null,
          averageDay: '',
          averageNight: '',
          clouds: '',
          gusts: 0,
          humidity: ''
        })
        getData()
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error has ocurred!'
      })
    }
  }

  useEffect(() => { }, [district])

  return (
    <div className='formContainer'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2>Weather Registry</h2>
      <FormControl className='form'>
        <div className='formItem'>
          <Select
            id='districtSelect'
            value={formValue.district}
            onChange={handleInputChange}
            className='formInput'
            name='district'
          >
            <MenuItem value={'Villa el Salvador'}>Villa el Salvador</MenuItem>
            <MenuItem value={'Villa Maria del Triunfo'}>Villa Maria del Triunfo</MenuItem>
            <MenuItem value={'San Juan de Miraflores'}>San Juan de Miraflores</MenuItem>
          </Select>
          <div style={{height: '100%', border: '1px solid #DBDBDB', marginTop: '8px'}}></div>
          <TextField className='formInput' id="inputNight" name='clouds' label="Clouds(%)" value={formValue.clouds} onChange={handleInputChange} variant="outlined" />
        </div>
        <div className='formItem'>
          <TextField className='formInput' id="inputDay" name='averageDay' label="Day temp. average" value={formValue.averageDay} onChange={handleInputChange} variant="outlined" />
          <div style={{height: '100%', border: '1px solid #DBDBDB'}}></div>
          <TextField className='formInput' id="inputDay" name='humidity' label="Humidity(%)" value={formValue.humidity} onChange={handleInputChange} variant="outlined" />
        </div>
        <div className='formItem'>
          <TextField className='formInput' style={{borderBottom: '0'}} id="inputDay" name='averageNight' label="Night temp. average" value={formValue.averageNight} onChange={handleInputChange} variant="outlined" />
          <div style={{height: '100%', border: '1px solid #DBDBDB'}}></div>
          <div className='formInput' style={{borderBottom: '0'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat='dd/MM/yyyy'
                label="Date"
                minDate={new Date(Date.now())}
                value={formValue.date}
                onChange={(e) => {
                  try {
                    setFormValue({
                      ...formValue,
                      date: e
                    })
                  } catch (error) {
                    setFormValue({
                      ...formValue,
                      date: null
                    })
                  }

                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <Button onClick={sendData} variant='contained' className='btnSend'>Registrar</Button>
      </FormControl>
    </div>
  )
}

export default Form