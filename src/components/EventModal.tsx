import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/Input'

import { useCallback, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import axios from 'axios'
import useEvents from '@/hooks/useEvents'

type Values = {
  title: string
  note: string
}

export function EventModal() {
  const { toast } = useToast()

  const [values, setValues] = useState<Values>({
    title: '',
    note: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: mutateEvents } = useEvents()

  console.log('event : ', values)

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log(values.title)

      await axios.post('/api/events', values)

      setIsLoading(false)

      toast({
        variant: 'success',
        description: 'Event created',
      })

      mutateEvents()
      setValues({
        title: '',
        note: '',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }, [values, mutateEvents])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Input
          id="title"
          name="title"
          placeholder="What's the event name?"
          className="col-span-3"
          onChange={handleChange}
        />
        <Input
          id="note"
          name="note"
          placeholder="Have some notes?"
          className="col-span-3"
          onChange={handleChange}
        />
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
