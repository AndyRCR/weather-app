import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { createContext, useState } from 'react'
import { db } from '../services/Firebase'

export const GlobalContext = createContext()

const GlobalStateContext = ({children}) => {

    const [list, setList] = useState(null)
    const [district, setDistrict] = useState('Villa el Salvador')

    const getData = async () =>{
        const col = collection(db, 'districts')
        try {
            const data = await getDocs(query(col, where('district', '==', district)))
            const res = data.docs
                .map(doc => doc = {
                    id: doc.id,
                    ...doc.data(),
                    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString()})
                .sort((a,b) => new Date(a.date) - new Date(b.date))
            setList(res)
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <GlobalContext.Provider
    value={{
        list, setList,
        district, setDistrict,
        getData
    }}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStateContext