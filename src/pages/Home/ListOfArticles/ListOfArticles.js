import { useState, useEffect } from 'react';

import Article from '../../../components/Article/Article'

import axios from '../../../axios.js';

import Stack from '@mui/material/Stack';

const ListOfArticles = () => {
    const [data, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios
            .get('/posts/')
            .then((res) => {
                setData(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                setIsError(true)
                console.log(err)
            })
    }, [])

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            component="ul"
        >
            {isLoaded ?
                data.map((item, key) => {
                    return (<Article item={item} isLoaded={isLoaded} isError={isError} key={key} />)
                }) : isError ?
                    <div>Error</div> :
                    [...Array(2)].map((item, key) => <Article isLoaded={isLoaded} key={key} />)
            }
        </Stack>
    )
}

export default ListOfArticles;