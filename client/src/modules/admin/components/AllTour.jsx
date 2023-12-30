import React, { useEffect } from 'react'
import { getAPI } from '../../../config/api'

function AllTour() {
  const getAllTour = async(req, res) => {
    try {
      const res = await getAPI('/api/tour');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTour()
  }, [])

  return (
    <div className='all-tour-page'>
      <div className="all-tour-page-header">
        <h1>Tất cả các Tour trong hệ thống</h1>
      </div>
      <div className="all-tour-page-body">

      </div>
    </div>
  )
}

export default AllTour