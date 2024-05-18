import React, { useEffect, useState } from 'react';
import useDebounce, { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, setPage, setSearch } from '../features/users/userSlice';
import SearchComponent from '../features/serachComponet/SearchComponent';

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, page, totalPages, loading, error, search } = useAppSelector((state) => state.users);
    const [query, setQuery] = useState(search);
   const  debouncedQuery = useDebounce(query, 700);

    useEffect(() => {
        dispatch(fetchUsers({ page, search: debouncedQuery }));
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
            <h1>Users</h1>
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
                                {users.map((user: any) => (
                                    <li key={user.id}>
                                        {user.name}
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

export default UserList;
