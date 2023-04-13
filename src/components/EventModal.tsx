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
import { useCallback, useMemo, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import axios from 'axios'
import useEvents from '@/hooks/useEvents'
import { Typography } from './ui/Typography'
import ImageUpload from './ui/ImageUpload'
import { useRouter } from 'next/router'
import { Textarea } from './ui/textarea'
import TagsInput, { tags } from './TagsInput'

interface HeadingProps {
  title: string
  subtitle?: string
}

enum STEPS {
  PUBLIC = 0,
  INFO = 1,
  IMAGES = 2,
  TAG = 3,
  LOCATION = 4,
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="bodytext1" className="mt-2 text-gray-600">
        {subtitle}
      </Typography>
    </div>
  )
}

export function EventModal({ children }: any) {
  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    title: '',
    brochure_img: '',
    isPublic: true,
    tag: '',
    note: '',
    location: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  console.log(values)

  const [step, setStep] = useState(STEPS.PUBLIC)

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.PUBLIC) {
      return undefined
    }

    return 'Back'
  }, [step])

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  let content = (
    <div className="flex flex-col gap-8">
      <Heading title="Wanted to keep event private?" subtitle="Yes or no" />
      <ul
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-4
          max-h-[50vh]
          overflow-y-auto
        "
      >
        <li
          onClick={() => setValues({ ...values, isPublic: false })}
          className={`rounded-xl border-2 ${
            values.isPublic
              ? 'border-neutral-200 dark:border-neutral-600'
              : 'border-black dark:border-white'
          } p-4 flex flex-col gap-3 hover:border-black dark:hover:border-white transition cursor-pointer`}
        >
          Yes, keep it private
        </li>
        <li
          onClick={() => setValues({ ...values, isPublic: true })}
          className={`rounded-xl border-2 ${
            !values.isPublic
              ? 'border-neutral-200 dark:border-neutral-600'
              : 'border-black dark:border-white'
          } p-4 flex flex-col gap-3 hover:border-black dark:hover:border-white transition cursor-pointer`}
        >
          No, shared with all
        </li>
      </ul>
    </div>
  )

  if (step === STEPS.TAG) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading title="Describe event in one word?" subtitle="Pick your tag" />
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
        >
          {tags.map((item) => (
            <div key={item.label} className="col-span-1">
              <TagsInput
                onClick={(tag) => setValues({ ...values, tag: tag })}
                selected={values.tag === item.label}
                label={item.label}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (step === STEPS.INFO) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us some info about event."
          subtitle="Give us info related to event"
        />
        <Input
          id="title"
          name="title"
          label="Title"
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <Textarea
          id="note"
          name="note"
          label="Note"
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your event" subtitle="Upload images" />
        <ImageUpload
          onChange={(e) => setValues({ ...values, brochure_img: e })}
          value={values.brochure_img}
        />
      </div>
    )
  }

  if (step === STEPS.LOCATION) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where did the event occur?"
          subtitle="Give us location of event"
        />
        <Textarea
          id="location"
          name="location"
          label="Location"
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-start">Create Event</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          <hr className="text-gray-600 dark:text-gray-500 h-[1px]" />
        </DialogHeader>
        <div className="flex flex-col h-[50vh] md:h-auto">{content}</div>
        <DialogFooter>
          <div className="flex gap-2 md:gap-4 md:mt-4">
            {secondaryActionLabel && (
              <Button
                disabled={isLoading}
                onClick={onBack}
                variant="outline"
                className="w-full"
              >
                {secondaryActionLabel}
              </Button>
            )}
            {actionLabel !== 'Next' ? (
              <Button disabled={isLoading} className="w-full">
                Create
              </Button>
            ) : (
              <Button disabled={isLoading} onClick={onNext} className="w-full">
                {actionLabel}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
