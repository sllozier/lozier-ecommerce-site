import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountsThunk } from '../../store/reducers1/accountReducer'
import { useParams } from 'react-router-dom'

function ViewAccount() {
    const idParam = useParams()
    const id = ((Number(idParam.id) - 1))
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    useEffect(() => {
        const getData = async () => {
            await getAccountsThunk()(dispatch)
        }
        getData()
    }, [])
    console.log(id)

    return (
        <>
            {state.accounts.length > 0 ?
                <div className='account-container'>
                    <h1>{state.accounts[id].firstName} {state.accounts[id].lastName}</h1>
                    <h3>username: {state.accounts[id].username}</h3>
                    <h3>email: {state.accounts[id].email}</h3>
                </div>
                :
                <h1>no data</h1>
            }

        </>

    )
}

export default ViewAccount



    // const [accountInfo, setAccountInfo] = useState()

    // const data = async () => {
    //     const data = await axios.get('/api/accounts')
    //     console.log(data)

    // }

    // useEffect(() => {
    //     data()
    // })