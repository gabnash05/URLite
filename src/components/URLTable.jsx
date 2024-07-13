import { useState } from 'react'

export default function URLTable({ urlData, handleDeleteUrl }) {

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





  return(
    <div className='overflow-x-auto'>
      <table className='mt-10 min-w-[500] bg-white'>
        <thead>
          <tr>
            <th className='px-4 py-2 border'>Full URL</th>
            <th className='px-4 py-2 border'>Short URL</th>
            <th className='px-4 py-2 border'>Clicks</th>
            <th className='px-4 py-2 border'></th>
          </tr>
        </thead>

        <tbody>
          {urlData.map((urlItem) => (
            <tr>
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