import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useToast } from '@/hooks/useToast'
import useEvents from '@/hooks/useEvents'

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
import ImageUpload from '@/components/ui/ImageUpload';

type Values = {
  title: string,
  brochure_img: string
}

export function EventModal() {
  const { toast } = useToast()
  const router = useRouter()

  const [values, setValues] = useState<Values>({
    title: '',
    brochure_img: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  // TO prevent the z-index issue: 
  const [isHiddenDialog, setIsHiddenDialog] = useState(false);

  const { mutate: mutateEvents } = useEvents()

  const handleSubmit = useCallback(async () => {
    if (!values.title) return;

    try {
      setIsLoading(true)

      const { data: { id } } = await axios.post('/api/events', values)

      setIsLoading(false)

      toast({
        variant: 'success',
        description: 'Event created',
      })

      mutateEvents()
      setValues({
        title: '',
        brochure_img: ''
      })
      router.push(`/events/${id}`);
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
  const handleImgUpload = (imgSrc: string) => {
    setValues(prevValues => ({
      title: prevValues.title,
      brochure_img: imgSrc
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setIsHiddenDialog(false)}>
        <Button variant="outline">Create Event</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${isHiddenDialog && 'invisible'}`}>
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
        <div onClick={() => setIsHiddenDialog(true)}>
          <ImageUpload onChange={handleImgUpload} />
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
