// AppNews.js

import React, { useEffect, useState } from 'react';

const Card = ({ data }) => {
    console.log(data);

    const readMore = (url) => {
        window.open(url);
    };

    return (
        <div className="cardContainer">
            {data.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                } else {
                    return (
                        <div className="card" key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <div className="content">
                                <a
                                    className="title"
                                    onClick={() => window.open(curItem.url)}
                                >
                                    {curItem.title}
                                </a>
                                <p>{curItem.description}</p>
                                <button onClick={() => readMore(curItem.url)}>
                                    Read More
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

const Newsapp = () => {
    const [search, setSearch] = useState('india');
    const [newsData, setNewsData] = useState(null);
    const API_KEY = '9c3ed8ee95884dec979460a60f96675b';

    const getData = async () => {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
        );
        const jsonData = await response.json();
        console.log(jsonData.articles);
        let dt = jsonData.articles.slice(0, 10);
        setNewsData(dt);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleInput = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul>
                    <a>All News</a>
                    <a>Trending</a>
                </ul>
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Search News"
                        value={search}
                        onChange={handleInput}
                    />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className="head">Stay Updated with Trendy News</p>
            </div>
            <div className="categoryBtn">
                <button onClick={userInput} value="sports">
                    Sports
                </button>
                <button onClick={userInput} value="politics">
                    Politics
                </button>
                <button onClick={userInput} value="entertainment">
                    Entertainment
                </button>
                <button onClick={userInput} value="health">
                    Health
                </button>
                <button onClick={userInput} value="fitness">
                    Fitness
                </button>
            </div>
            <div>{newsData ? <Card data={newsData} /> : null}</div>
        </div>
    );
};

export default Newsapp;

// Global styles
const styles = `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: lightblue;
  padding: 9px;
}

nav input {
  width: 250px;
  text-decoration: none;
  padding: 9px;
  font-size: 18px;
  border: none;
}

.searchBar {
  display: flex;
  align-items: center;
  gap: 11px;
}

nav button {
  width: 70px;
  height: 38px;
  background-color: blue;
  border: none;
  border-radius: 2px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

nav ul {
  display: flex;
  gap: 11px;
}

.cardContainer {
  display: flex;
  justify-content: center;
  gap: 41px;
  flex-wrap: wrap;
}

.card {
  width: 320px;
  box-shadow: 0px 4px 4px 4px rgb(255, 255, 255);
  background-color: white;
  border-radius: 3px;
  margin-top: 21px;
  border: 1px solid rgb(236, 236, 236);
}

.card img {
  width: 100%;
  height: 180px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.card .title {
  font-weight: 600;
  font-size: 18px;
  margin-top: -7px;
}

.card .title:hover {
  border-bottom: 1px solid black;
  cursor: pointer;
}

.card .content {
  padding: 9px;
}

.card button {
  background-color: rgb(29, 162, 214);
  border: none;
  cursor: pointer;
  width: 80px;
  height: 28px;
  color: white;
  font-size: 13px;
  border-radius: 2px;
}

.categoryBtn {
  display: flex;
  justify-content: center;
  gap: 11px;
}

.categoryBtn button {
  gap: 11px;
  width: 130px;
  height: 33px;
  background-color: rgb(255, 108, 108);
  border: none;
  outline: none;
  font-size: 18px;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  padding: 2px;
}

.head {
  text-align: center;
  font-weight: 600;
  font-size: 26px;
}
`;

// Add styles dynamically
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
