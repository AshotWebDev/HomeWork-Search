import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, setPage, setSearch } from '../features/users/userSlice';

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, page, totalPages, loading, error, search } = useAppSelector((state) => state.users);

    React.useEffect(() => {
        dispatch(fetchUsers({ page, search }));
    }, [dispatch, page, search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
        dispatch(setSearch(e.target.value));
    };

    return (
        <div>
            <h1>Users</h1>
            <input type="text" value={search} onChange={handleSearchChange} />

            <div>
                {users.map((user: any) => (
                    <div key={user.name}>
                        <h2>{user.name}</h2>
                        <p>Height: {user.height}</p>
                        <p>Mass: {user.mass}</p>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={handlePrevPage} disabled={page === 1}>Prev</button>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default UserList;
