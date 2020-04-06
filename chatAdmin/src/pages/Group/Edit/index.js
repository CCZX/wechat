import React, { useState, useEffect } from 'react'

import  { groupApi } from './../../../api'

function StatisticsGroup() {

  useEffect(() => {
    ;(async () => {
      const { data = {} } = await groupApi.getAllGroup()
      console.log(data)
    })()
  }, [])

  return (
    <div>
      <p>群聊Edit</p>
    </div>
  )
}

export default StatisticsGroup
