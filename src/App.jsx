import { useState, useEffect } from 'react'
import URLTable from './components/URLTable';

export default function App() {
  const [url, setUrl] = useState('');
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    getUrls();
  }, []);

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  async function getUrls() {
    try {
      const response = await fetch('https://URLiteAPI.onrender.com/'); 

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const shortUrls = await response.json();
      setUrlData(shortUrls);

    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  }

  async function handleSubmitUrl(event) {
    event.preventDefault();

    try {
      const response = await fetch('https://URLiteAPI.onrender.com/urlite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({ full: url })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      getUrls();
      setUrl('')
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  }

  async function handleDeleteUrl() {
    getUrls();
  }


  return (

    <div className='flex flex-col items-center'>

      <form onSubmit={handleSubmitUrl}
            className='w-full flex flex-col items-center mt-16'>
        <h1 className='text-8xl font-bold cursor-default'>URLite</h1>

        <div className='mt-4'>
          <input  className='w-60 p-2 border rounded mr-2 border-gray-400'
                  value={url}
                  onChange={handleUrlChange}/>
          <button type='submit' 
                  className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Shorten
          </button>
        </div>
      </form>

      <URLTable urlData={urlData} handleDeleteUrl={handleDeleteUrl}/>

    </div>
  )
}