import React, { useEffect, useState } from 'react';
import useDebounce, { useAppDispatch, useAppSelector } from '../hooks';
import { fetchplanets, setPage, setSearch } from '../features/planets/planetsSlice';
import SearchComponent from '../features/serachComponet/SearchComponent';

const PlanetsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { planets, page, totalPages, loading, error, search } = useAppSelector((state) => state.planets);
    const [query, setQuery] = useState(search);
   const  debouncedQuery = useDebounce(query, 700);

    useEffect(() => {
        dispatch(fetchplanets({ page, search: debouncedQuery }));
    }, [dispatch, page, debouncedQuery]);

   

    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        dispatch(setSearch(e.target.value));
    };

    return (
        <div>
            <h1>planets</h1>
            <SearchComponent {...{ search: query, handleSearchChange }} />

            
                {
                    loading ?
                        <div>Loading...</div>
                        :
                        error ?
                            <div>Error: {error}</div>
                            :
                            <div>
                                <ul>
                                    {planets.map((planet: any) => (
                                        <li key={planet.id}>
                                            {planet.name}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handlePrevPage}>Prev</button>
                                <button onClick={handleNextPage}>Next</button>
                            </div>
                }
            
        </div>
    );
};

export default PlanetsList;
