import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../App.css"
const InputWord = () => {
    const [word, setWord] = useState("");
    const [dataReceived, setDataReceived] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(null);

    const handleChange = (e) => {
        const input = e.target.value;

        // Use a regular expression to check if the input contains only letters
        const validInput = /^[a-zA-Z][a-zA-Z\s]*$/.test(input);

        if (validInput || input === "") {
            setWord(input);
            setInputError(null);
        } else {
            setInputError("Please enter only letters.");
        }
    };

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const apiCall = async () => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setDataReceived(response.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (word.trim() !== "") {
            apiCall();
        }
    };

    useEffect(() => {
        // You can add additional logic here if needed
    }, [dataReceived]);

    return (
        <div>
            <input
                placeholder='Search'
                id='input'
                onChange={handleChange}
                value={word}
                style={{ borderColor: inputError ? 'red' : '' }}
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}

            {inputError && <p style={{ color: 'red' }}>{inputError}</p>}

            {dataReceived.length > 0 ? (
                dataReceived.map((def, i) => (
                    <div key={i}>
                        <h3> <span>{def.meanings[0].partOfSpeech}</span></h3>
                        {def.meanings[0].definitions.map((definition, j) => (
                            <div className='definition' key={j}>{definition.definition}</div>
                        ))}
                    </div>
                ))
            ) : null}
        </div>
    );
};

export default InputWord;
