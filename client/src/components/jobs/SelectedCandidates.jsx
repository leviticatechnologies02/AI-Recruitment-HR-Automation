import React from 'react'
import Sidebars from '../layout/dashboard/Sidebars'
  import { Icon } from "@iconify/react";
  import { Link } from "react-router-dom";

const SelectedCandidates = () => {
  return (
    <>
    <Sidebars>
        <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24'>
        <h6 className='fw-semibold mb-0'>Selected Candidates</h6>
      </div>
    </Sidebars>
    </>
  )
}

export default SelectedCandidates