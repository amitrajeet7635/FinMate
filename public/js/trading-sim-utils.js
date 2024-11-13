// import mongoose from 'mongoose';
// import axios from 'axios';
// import {AUTH_DOMAIN, CLIENT_ID, CLIENT_SECRET, AUDIENCE} from "./env";

// const userSchema = new mongoose.Schema({

// })

document.addEventListener('DOMContentLoaded', () => {
    const symbolInput = document.getElementById('symbolInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');
    const selectedSymbolInput = document.getElementById('selectedSymbol');
    const dynamicIframe = document.getElementById('dynamic-iframe');
    const tradingViewContainer = document.getElementById('tradingview-widget-container');
    const detailedResultsSection = document.getElementById('Detailed-section');
    const widget = document.getElementsByClassName('widget');

    // widget.style.backgroundColor = 'red';


    // Function to fetch search results from the server
    async function fetchSymbols(query) {
        try {
            const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.map(symbol => ({
                symbol,
                displaySymbol: symbol,
                description: '' // Add description or other details if necessary
            }));
        } catch (error) {
            console.error('Error fetching symbols:', error);
            return [];
        }
    }

    function showResults() {
        const resultsContainer = document.getElementById('results');
        resultsContainer.classList.remove('hidden'); // Show the container
    }

    function hideResults() {
        const resultsContainer = document.getElementById('results');
        resultsContainer.classList.add('hidden'); // Hide the container
    }

    // Function to handle search
    async function handleSearch() {

        const query = symbolInput.value.trim();
        if (query.length < 1) {
            hideResults();
            return;
        }

        try {
            const results = await fetchSymbols(query);
            // console.log(`Searching for: ${query}`); // Debugging log

            if (results.length > 0) {
                showResults();
                displayResults(results);
            }
            else {
                hideResults();
            }


            // console.log(`Results: ${JSON.stringify(results)}`); // Debugging log
            // displayResults(results);
        } catch (error) {
            console.error('Error fetching symbols:', error);
            hideResults(); // Hide results container in case of an error
        }

    }
    // Function to display search results
    function displayResults(results) {
        resultsContainer.innerHTML = '';

        results.forEach(result => {
            const item = document.createElement('div');
            item.textContent = `${result.displaySymbol} - ${result.description}`;
            item.className = 'result-item py-2 px-4 mb-2 rounded'; // Define styles as needed
            item.addEventListener('click', () => selectSymbol(result.symbol));
            resultsContainer.appendChild(item);
        });
    }

    function hidedetailedResultsSection() {
        detailedResultsSection.classList.add('hidden'); // Hide the section
    }
    function showdetailedResultsSection() {
        detailedResultsSection.idList.remove('hidden'); // Hide the section
    }

    // Function to handle symbol selection
    function selectSymbol(symbol) {
        symbolInput.value = symbol;
        selectedSymbolInput.value = symbol;
        if (symbolInput.value.trim().length > 0) {
            hideResults();
        }
        const fullSymbol = `${symbol}.NS`

        // Update the iframe src URL dynamically
        const iframeSrc = `https://jika.io/embed/area-chart?symbol=${fullSymbol}&selection=one_month&closeKey=adjClose&boxShadow=true&graphColor=1652f0&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito`;
        dynamicIframe.src = iframeSrc;

        // Remove existing TradingView widget script if it exists
        const existingScripts = tradingViewContainer.querySelectorAll('script');
        existingScripts.forEach(script => script.remove());

        // Remove all child nodes of the TradingView container
        while (tradingViewContainer.firstChild) {
            tradingViewContainer.removeChild(tradingViewContainer.firstChild);
        }

        // Create and append new TradingView widget script
        const widgetConfig = {
            interval: "1m",
            width: 450,
            isTransparent: false,
            height: "100%",
            isTransparent: true,
            symbol: "NSE:" + symbol, // Dynamically set the symbol
            showIntervalTabs: true,
            displayMode: "single",
            locale: "en",
            colorTheme: "light"
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.async = true;
        script.innerHTML = JSON.stringify(widgetConfig);

        // Append the new script to the container
        tradingViewContainer.appendChild(script);

        resultsContainer.innerHTML = '';
    }

    // Event listener for the search button
    searchButton.addEventListener('click', handleSearch);

    // Event listener for the input to perform search on every key press
    symbolInput.addEventListener('input', () => {
        if (symbolInput.value.trim().length > 0) {
            handleSearch();
        } else {
            resultsContainer.innerHTML = ''; // Clear results if input is empty
        }
    });

    // async function getManagementAPiToken(){
    //     const options = {
    //         method: 'POST',
    //         url: `https://${AUTH_DOMAIN}/oauth/token`,
    //         headers: { 'content-type': 'application/json' },
    //         data: {
    //             client_id: CLIENT_ID,
    //             client_secret: CLIENT_SECRET,
    //             audience: AUDIENCE,
    //             grant_type: 'client_credentials'
    //         }
    //     };
    
    //     try {
    //         const response = await axios.request(options);
    //         return response.data.access_token;
    //     } catch (error) {
    //         console.error("Error obtaining Management API token: ", error);
    //         throw error;
    //     }
    // }

    // async function fetch_data(){
        
    // }
});
