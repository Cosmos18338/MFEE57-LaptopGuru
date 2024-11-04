'use client'

import React, { useState, useEffect } from 'react'
import Coupon from '@/components/coupon'

export default function Test(props) {
  return (
    <>
      <div className="row bg-dark square">
        <div className="col-12 bg-light">123</div>
        <div className="col bg-light">456</div>
        <div className="col-6 bg-primary">789</div>
        <div className="col bg-light">456</div>
      </div>
      <hr />
      <div className="bg-dark square d-flex ">
        <div className="bg-light">
          <Coupon />
        </div>
        <div className="bg-light">456</div>
      </div>
    </>
  )
}
