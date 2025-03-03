import PageTitle from '@/components/PageTitle'
import React from 'react'
import { Component } from './component/chart'

type Props = {}

export default function Health_Status({}: Props) {
  return (
    <div>
        <PageTitle title="Health Status"/>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>

        <Component/>
        </div>
      </div>
  )
}