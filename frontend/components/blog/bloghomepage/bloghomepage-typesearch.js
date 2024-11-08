import React, { useState, useEffect } from 'react'

export default function BloghomepageTypesearch(props) {
  return (
    <>
      <div className="BlogTypeSearch container bg-transparent">
        <form action>
          <div className="d-flex justify-content-around gap-3 flex-wrap">
            <div className="BlogTypeCheckbox text-nowrap col-2">
              <input type="checkbox" id="customCheck7" />
              <label htmlFor="customCheck7" className="BlogTypeCheckboxLabel">
                &nbsp;&nbsp;購買心得
              </label>
            </div>
            <div className="BlogTypeCheckbox text-nowrap col-2">
              <input type="checkbox" id="customCheck8" />
              <label htmlFor="customCheck8" className="BlogTypeCheckboxLabel">
                &nbsp;&nbsp;開箱文
              </label>
            </div>
            <div className="BlogTypeCheckbox text-nowrap col-2">
              <input type="checkbox" id="customCheck9" />
              <label htmlFor="customCheck9" className="BlogTypeCheckboxLabel">
                &nbsp;&nbsp;疑難雜症
              </label>
            </div>
            <div className="BlogTypeCheckbox text-nowrap col-2">
              <input type="checkbox" id="customCheck10" />
              <label htmlFor="customCheck10" className="BlogTypeCheckboxLabel">
                &nbsp;&nbsp;活動心得
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
