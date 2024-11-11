import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Accordion from 'react-bootstrap/Accordion'
import BuyItemCard from './buy-item-card'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function BuyList(props) {
  return (
    <>
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0" className="border-primary">
          <Accordion.Header>
            <div className="col-sm-3">訂單資訊</div>
          </Accordion.Header>
          <Accordion.Body>
            <BuyItemCard />
            <BuyItemCard />
            <BuyItemCard />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div>123</div>
    </>
  )
}
