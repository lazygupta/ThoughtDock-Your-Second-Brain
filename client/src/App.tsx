import './App.css'
import { Card } from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <>
    <CreateContentModal open={true} />
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
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            size="md"
            variant="primary"
            text="Add Content" />
        </div>


      </div>

      <div className='flex gap-4 flex-wrap'>
        <Card title="Burj Khalifa" link="https://twitter.com/voiceofhumans01/status/1862791805613293672" type="twitter" />

        <Card title="Samay Raina" link="https://www.youtube.com/embed/buSdqtdn_4I?si=GQHn5cP9Z3Zf3gjR" type="youtube" />

      </div>

    </>
  )
}

export default App