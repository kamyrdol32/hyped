// Imports
import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

// Components
import MyLoader from '../Components/MyLoader';
import MyCardList from "../Components/MyCardList";


// Code
export default function MySerialList() {

    let page = 1;
    const queryClient = useQueryClient()

    const [serials, setSerials] = useState([]);
    const {isLoading, isError} = useQuery(['Serials'], fetchSerials, {
        keepPreviousData: true,
        onSuccess: (data) => {
            setSerials(oldSerials => [...oldSerials, ...data]);
        }
    });
    async function fetchSerials() {
        const response = await fetch('/api/serials/get/' + page)
        page++;
        return response.json();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            queryClient.invalidateQueries('Serials')
            window.removeEventListener('scroll', handleScroll);
            setInterval(() => {
                window.addEventListener('scroll', handleScroll);
            }, 1000);
        }
    }

    if (isLoading) return <MyLoader />
	if (isError) return toast.error(isError);

    return (
        <Container>
            <Row>
                {serials.map(film => (
                    <MyCardList key={film.ID} Type="Serial" ID={film.ID} Image={film.Image} Title={film.Title} Rating={film.Rating} Description={film.Description} Year={film.Year} Director={film.Director} Country={film.Country} Genre={film.Genre} />
                ))}
            </Row>
        </Container>
    )
}