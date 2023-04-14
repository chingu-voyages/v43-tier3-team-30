import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import isEqual from 'lodash/isEqual';
import axios from 'axios';

import Image from 'next/image'
import { AiOutlineRollback, AiOutlineEdit, AiTwotoneDelete } from 'react-icons/ai'

import useEvent from '@/hooks/useEvent'
import useNotes from '@/hooks/useNotes';
import { useToast } from '@/hooks/useToast'
import useCurrentUser from '@/hooks/useCurrentUser';
import { Note } from '@/lib/schema';

import { Typography } from '@/components/ui/Typography';
import ImageUpload from '@/components/ui/ImageUpload';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const ViewEvent = () => {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  const { toast } = useToast()
  const { eventId } = router.query

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImg, setNewImg] = useState('');
  const [updatingNotes, setUpdatingNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const { data: fetchedPost, isLoading: isPostLoading } = useEvent(eventId as string)
  const { data: notes, isLoading: isNotesLoading } = useNotes(eventId as string)

  const handleEdit = () => {
    setNewTitle(fetchedPost?.title);
    setUpdatingNotes(notes);
    setNewImg(fetchedPost?.brochure_img);
    setIsEditing(true);
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${fetchedPost.id}`);
      toast({
        variant: 'success',
        description: 'The event is deleted successfully',
      })
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value);
  const handleNewNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewNote(e.target.value);
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>, noteId: Note["id"]) => {
    setUpdatingNotes(prevNotes => {
      const noteToChange = prevNotes.find(({ id }) => id === noteId);
      if (noteToChange) {
        noteToChange.content = e.target.value;
        return {
          ...prevNotes,
          noteToChange
        }
      }
      return prevNotes;
    })
  }

  const navList = useMemo(() => {
    return [
      {
        href: '/',
        name: 'Back To Event List',
        tabName: 'Back To Event List',
        icon: <AiOutlineRollback size={24} />,
      },
      {
        href: '',
        name: 'Edit the Event',
        tabName: 'Edit the Event',
        icon: <AiOutlineEdit onClick={handleEdit} size={24} />,
      },
      {
        href: '',
        name: 'Delete the Event',
        tabName: 'Delete the Event',
        icon: (
          <Dialog>
            <DialogTrigger asChild>
              <AiTwotoneDelete size={24} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Do you really want to delete the event?<br></br>
                  The event <b>can't be</b> restored if you delete it.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={handleDelete} variant="destructive" className='mb-4'>
                  Yes, delete it!
                </Button>
                <Button onClick={() => router.reload()}>No, get back to the event page.</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog >
        ),
      },
    ]
  }, []);

  const handleImgChange = (imgUrl: string) => {
    setNewImg(imgUrl);
  }

  const handleUpdate = async () => {
    if (newTitle === fetchedPost.title && newImg === fetchedPost.brochure_img && isEqual(updatingNotes, notes) && !newNote) {
      toast({
        variant: 'destructive',
        description: 'There is no new change to update',
      });
      return;
    }
    try {
      await axios.patch(`/api/events/${eventId}`, {
        title: newTitle,
        brochure_img: newImg
      })
      if (!isEqual(updatingNotes, notes)) {
        // To Improve: check each note to see if the content is changed
        updatingNotes.forEach(async ({ id, content }) => {
          await axios.patch(`/api/events/${eventId}/notes/${id}`, {
            content
          })
        });
      }
      if (newNote) {
        await axios.post(`/api/events/${eventId}/notes`, {
          content: newNote,
          userId: currentUser.id,
          eventId: eventId,
        })
      }

      toast({
        variant: 'success',
        description: 'The event is updated successfully',
      })
      setIsEditing(false);
      router.reload();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      })
    }
  }

  if (isPostLoading || isNotesLoading) {
    return;
  }

  return (
    <>
      <div className="p-4 space-y-4 min-h-screen flex-col items-center justify-center py-2 dark:bg-[#18191b] dark:text-white bg-white">
        {isEditing ? (
          <>
            <ImageUpload onChange={handleImgChange} value={newImg} />
            <Typography variant="h6" children="Title" className="mb-4" />
            <Input value={newTitle} onChange={handleTitleChange} />
            <div>
              <Typography variant="h6" children="Notes" className="mb-4" />
              {updatingNotes?.length ? (
                updatingNotes.map(({ id, content }: Note, index) => <Input key={`${id}-${index}`} value={content} onChange={(e) => handleNoteChange(e, id)} />)
              ) : (
                <Input value={newNote} onChange={handleNewNoteChange} />
              )}
            </div>
            <div className='flex justify-between'>
              <Button onClick={() => setIsEditing(false)} variant="destructive">Cancel</Button>
              <Button onClick={handleUpdate} variant="default" className='bg-[#384DFF]'>Save</Button>
            </div>
          </>) : (
          <div className='text-left'>
            <Image
              src={fetchedPost?.brochure_img || '/thumbnail-placeholder.svg'}
              className='rounded-lg'
              width={1000}
              height={710}
              alt={fetchedPost?.title}
            />
            <Typography variant="h5" children={fetchedPost?.title} className="my-4" />
            {notes && <Typography variant="bodytext1" children={notes.map((note: Note) => note.content).join(' ')} />}
          </div>
        )
        }
      </div>

      <BottomNav tabs={navList} />
    </>
  )
}

export default ViewEvent
