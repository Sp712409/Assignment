
import React, { useState, useEffect } from 'react'
import Loading from './github/loading';
import GithubUsers from "./github/githubUsers";
import Pagination from "./pagination";

const UseEffectAPI = () => {

    const [users, setUsers] = useState([]);
    

    const [loading, setLoading] = useState(true);
   
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);


    const getUsers = async () => {
        try {
            const response = await fetch('https://picsum.photos/v2/list');
             setLoading(false);
            setUsers(await response.json());
        } catch (error) {
            setLoading(false);
            console.log("my error is "+ error);
        }
    }

   
    useEffect(() => {
        getUsers();
        
    }, []);

    if (loading) {
        return <Loading />
    }

    

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);


    return (
        <>
            <GithubUsers users={currentPosts}/>
           
            <Pagination
                totalPosts={users.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}


export default UseEffectAPI