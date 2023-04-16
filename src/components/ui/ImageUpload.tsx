import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

// caxbcy1y
// dvdn0fbf6
const uploadPreset = 'caxbcy1y'

interface ImageUploadProps {
  onChange: (value: string) => void
  value?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 px-20 py-12 transition border-2 border-dashed cursor-pointer hover:opacity-70 rounded-2xl border-neutral-300 text-neutral-600 "
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {value && (
              <div
                className="absolute inset-0 w-full h-full "
              >
                <Image fill style={{ objectFit: 'cover' }} src={value} alt="" />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
