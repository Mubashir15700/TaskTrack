import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUser } from '../../services/api';

const UserDetails = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    const { id } = useParams();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await getUser(id);
                if (response && response.data.status === "success" && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setError("Failed to fetch user details.");
                }
            } catch (error) {
                setError("An error occurred while fetching user details.");
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetails();
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    return (
        <div>
            {user ? (
                <>
                    <p>UserDetails for ID: {id}</p>
                    <p>{user.username}</p>
                </>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default UserDetails;
