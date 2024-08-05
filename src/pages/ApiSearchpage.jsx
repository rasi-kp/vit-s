import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Apicard from '../components/Apicard';
import Layout from '../components/Layout';

export default function ApiSearchpage() {
    const [text, setText] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log('Sending request with text:', text);
        if (text.trim() !== '') {
            axios.post('http://ec2-65-0-21-186.ap-south-1.compute.amazonaws.com:9000/api/v1/search/main', {
                "entity": "courses",
                "filter": null,
                "page": 0,
                "value": text
            })
                .then(response => {
                    console.log('Response:', response.data);
                    setResults(response.data); // Assuming the API response returns an array of universities
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [text]);
    if (!results) {
        return (
            <div>Loading...</div>
        );
    }

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <Layout pageTitle="Search">
            <div>
                <div>
                    <input type='text' value={text} onChange={handleInputChange} />
                    <div className='dup-body-wrap'>
                        <ul>
                            {Array.isArray(results) && results.map(university => (
                                <Apicard
                                    key={university.user_id}
                                    University={university.university_name}
                                    logo={university.logo_url}
                                    city={university.city}
                                    state={university.state}
                                    country={university.country}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>

    );
}
