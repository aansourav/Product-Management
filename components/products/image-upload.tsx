"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  disabled?: boolean
}

export function ImageUpload({ images, onChange, disabled }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("")

  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl)) {
      onChange([...images, imageUrl])
      setImageUrl("")
    }
  }

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddImage()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <Button type="button" onClick={handleAddImage} disabled={disabled || !imageUrl.trim()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemoveImage(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No images added yet</p>
        </div>
      )}
    </div>
  )
}
