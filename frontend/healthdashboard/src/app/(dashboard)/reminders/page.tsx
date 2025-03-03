import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import { BellRing } from 'lucide-react'
import React from 'react'

type Props = {}

export default function Reminders({}: Props) {
  return (
    <div>
        <PageTitle title="Reminders"/>
        <Card icon={BellRing} title="Medication" discription="Take your medication"/>
      </div>
  )
}