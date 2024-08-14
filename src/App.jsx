import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const inputRef = useRef('');

  async function call(searchTerm) {
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=55bf46fd29e844e284fddcb5a20c1c2e`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setNews(data.articles);
  }

  useEffect(() => {
    call('India');
  }, []);

  return (
    <>
      <div className="grid h-[5rem] w-full place-items-center bg-gradient-to-r from-blue-500 to-green-500 p-4 shadow-lg">
        <input
          className="flex h-10 w-[50vw] rounded-md border border-transparent bg-white/80 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-transform duration-300 hover:scale-105"
          type="text"
          ref={inputRef}
          placeholder="Search..."
        ></input>
        <button
          onClick={() => call(inputRef.current.value)}
          type="button"
          className="ml-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid gap-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 lg:grid-cols-4">
        {news.map((item, key) => (
          <div
            key={key}
            className="group relative w-full rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              className="object-cover w-full h-48 rounded-t-xl"
              src={item.urlToImage}
              alt="image"
            />
            <div className="p-4 bg-gray-100 transition-colors duration-300 group-hover:bg-green-50">
              <h4 className="text-xl font-semibold text-blue-600 transition-transform duration-300 group-hover:scale-105">
                {item.title}
              </h4>
              <p className="mb-2 leading-normal transition-opacity duration-300 group-hover:opacity-80">
                {item.content}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-2 text-sm text-white bg-blue-500 rounded shadow-lg hover:bg-blue-700 transition-transform duration-300 transform group-hover:scale-105"
              >
                Read more...
              </a>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
