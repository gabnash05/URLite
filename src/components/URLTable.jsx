import { useState, useEffect } from 'react'

export default function URLTable({ urlData, handleDeleteUrl }) {

  const [names, setNames] = useState({});

  useEffect(() => {
    const initialNames = urlData.reduce((acc, urlItem) => {
      acc[urlItem._id] = urlItem.name || '';
      return acc;
    }, {});
    setNames(initialNames);
  }, [urlData]);

  const handleNameChange = (id, newName) => {
    setNames((prevNames) => ({
      ...prevNames,
      [id]: newName,
    }))
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://URLiteAPI.onrender.com/urlite/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      handleDeleteUrl();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const handleBlur = async (id) => {
    try {
      const response = await fetch(`https://URLiteAPI.onrender.com/urlite/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: names[id] }),
      });

      if(!response.ok) {
        console.error('Server error changing Name:', error);
      } 

    } catch {
      console.error('Error updating URL name:', error);
    }
  }



  return(
    <div className='overflow-x-auto'>
      <table className='mt-10 min-w-[500] bg-white'>
        <thead>
          <tr>
            <th className='px-4 py-2 border'>Name</th>
            <th className='px-4 py-2 border'>Full URL</th>
            <th className='px-4 py-2 border'>Short URL</th>
            <th className='px-4 py-2 border'>Clicks</th>
            <th className='px-4 py-2 border'></th>
          </tr>
        </thead>

        <tbody>
          {urlData.map((urlItem) => (
            <tr>
              <td className='px-4 py-2 border text-center'>
                <input  className='w-60 p-2 rounded mr-2 border-gray-400'
                        value={names[urlItem._id]}
                        onChange={(e) => handleNameChange(urlItem._id, e.target.value)}
                        onBlur={() => handleBlur(urlItem._id)}
                />
              </td>
              <td className='px-4 py-2 border max-w-xs truncate'><a href={urlItem.full} target="_blank" rel="noopener noreferrer">{urlItem.full}</a></td>
              <td className='px-4 py-2 border'><a href={`https://URLiteAPI.onrender.com/${urlItem.short}`} target="_blank" rel="noopener noreferrer">{`https://URLiteAPI.onrender.com//${urlItem.short}`}</a></td>
              <td className='px-4 py-2 border text-center'>{urlItem.clicks}</td>
              <td className='px-4 py-2 flex justify-center'>
                <button onClick={() => handleDelete(urlItem._id)} className='px-1 bg-red-500 text-white rounded hover:bg-red-600'>
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}