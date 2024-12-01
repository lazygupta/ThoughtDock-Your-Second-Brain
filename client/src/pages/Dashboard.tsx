import { useState } from 'react'
import '../App.css'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Button } from '../components/ui/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)

  return <div>
    <Sidebar />

    <div className='p-4 ml-72 bg-gray-200 min-h-screen border-2'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className='flex m-8 gap-4 items-center justify-between'>
        <div className='text-xl font-bold'>
          All Notes
        </div>
        <div className='flex gap-4'>
          <Button
            startIcon={<ShareIcon size="md" />}
            size="md"
            variant="secondary"
            text="Share Brain"
            onClick={() => {
              setModalOpen(true)
            }}
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            size="md"
            variant="primary"
            text="Add Content" />
        </div>


      </div>

      <div className='flex gap-4 flex-wrap'>
        <Card title="Ptron Earbuds" link="https://twitter.com/lazygupta_/status/1477216755139309568" type="twitter" />

        <Card title="Samay Raina" link="https://www.youtube.com/embed/buSdqtdn_4I?si=GQHn5cP9Z3Zf3gjR" type="youtube" />

      </div>
    </div>


  </div>
}