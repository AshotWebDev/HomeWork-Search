import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Requet.css'
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage, setPlanetPage } from '../../features/todo/requet/requestSlice';
const Request = () => {
    // const [page, setPage] = useState(1)
    // const [planetsPAge, setplanetsPage] = useState(1)
    const [peopleData, setpeopleData] = useState<{}>([])
    const [respPlanet, setRespPlanet] = useState<{}>([])
    const [peopleCount, setpeopleCount] = useState(0)
    const [planetCount, setplanetCount] = useState(0)

    const dispatch = useAppDispatch();
    const { page, planetPage } = useAppSelector((state) => state.requests);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/people?page=${page}`)
            const planetData = await axios.get(`https://swapi.dev/api/planets?page=${planetPage}`)

            console.log(planetData);

            setpeopleData(data.results)
            setpeopleCount(data.count)
            setRespPlanet(planetData.data.results)
            setplanetCount(planetData.data.count)
        }

        fetchData()

    }, [page, planetPage])





    const paginationPeople = () => {
        if (peopleCount && typeof peopleCount !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= peopleCount / 10; i++) {
                paginationList.push(<li key={i} onClick={() => dispatch(setPage(i))} style={{ color: i === page ? 'red' : 'black' }} >{i}</li>);
            }
            return paginationList;
        }
    }



    const paginationPlanets = () => {
        if (planetCount && typeof planetCount !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= planetCount / 10; i++) {
                paginationList.push(<li key={i} onClick={() => dispatch(setPlanetPage(i))} style={{ color: i === planetPage ? 'red' : 'black' }} >{i}</li>);
            }
            return paginationList;
        }
    }



    return (
        <div className='request'>
            <h1>people</h1>
            <div className='people_div'>
                <div className='request__list'>
                    {
                        peopleData && peopleData.map((item: any) => <div key={item.name}>{item.name}</div>)
                    }
                </div>

                <div className='request__pagination'>
                    <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>Prev</button>
                    {
                        paginationPeople()
                    }
                    <button disabled={page === Math.ceil(peopleCount / 10)} onClick={() => dispatch(setPage(page + 1))}>Next</button>

                </div>
            </div>

            <h1>planets</h1>


            <div>


                <div>
                    {
                        respPlanet && respPlanet.map((item: any) => <div key={item.name}>{item.name}</div>)
                    }
                </div>


            <ul className='request__pagination'>
                <button disabled={page === 1} onClick={() => dispatch(setPlanetPage(planetPage - 1))}>Prev</button>

                {
                    paginationPlanets()
                }

                <button disabled={page === Math.ceil(peopleCount / 10)} onClick={() => dispatch(setPlanetPage(planetPage + 1))}>Next</button>
                
            </ul>
            </div>


        </div>
    )
}

export default Request