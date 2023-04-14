import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios';

import Image from 'next/image'

import useEvent from '@/hooks/useEvent'
import useNotes from '@/hooks/useNotes';
import { useToast } from '@/hooks/useToast'
import { Note } from '@/lib/schema';

import { Typography } from '@/components/ui/Typography';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/Button';

const ViewEvent = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { eventId } = router.query

  const { data: fetchedPost, isLoading: isPostLoading } = useEvent(eventId as string)
  const { data: notes, isLoading: isNotesLoading } = useNotes(eventId as string)

  const handleChange = async (imgUrl: string) => {
    try {
      await axios.patch(`/api/events/${eventId}`, {
        brochure_img: imgUrl
      })

      toast({
        variant: 'success',
        description: 'The brochure image is updated successfully.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
    }
  }

  return (
    <div className="p-4 space-y-4 min-h-screen flex-col items-center justify-center py-2 dark:bg-[#18191b] dark:text-white bg-white">
      <Image
        src={fetchedPost?.brochure_img || '/thumbnail-placeholder.svg'}
        width={1000}
        height={710}
        alt={fetchedPost?.title}
      />
      <div className='text-left'>
        <Typography variant="h5" children={fetchedPost?.title} className="mb-4" />
        {notes && <Typography variant="bodytext1" children={notes.map((note: Note) => note.content).join(' ')} />}
      </div>
      <div className='w-6/12'>
        <ImageUpload onChange={handleChange} />
      </div>
    </div>
  )
}

export default ViewEvent
