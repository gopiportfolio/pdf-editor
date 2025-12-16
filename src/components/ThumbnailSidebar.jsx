"use client"

import { useState, useEffect } from "react"
import "./styles/thumbnail-sidebar.css"

function ThumbnailSidebar({ pdfDoc, currentPage, totalPages, onPageSelect }) {
  const [thumbnails, setThumbnails] = useState([])

  useEffect(() => {
    if (!pdfDoc) return

    const generateThumbnails = async () => {
      const thumbs = []
      for (let i = 1; i <= Math.min(totalPages, 20); i++) {
        try {
          const page = await pdfDoc.getPage(i)
          const viewport = page.getViewport({ scale: 0.2 })
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")
          canvas.width = viewport.width
          canvas.height = viewport.height

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise

          thumbs.push({
            page: i,
            image: canvas.toDataURL(),
          })
        } catch (error) {
          console.error(`Error rendering thumbnail for page ${i}:`, error)
        }
      }
      setThumbnails(thumbs)
    }

    generateThumbnails()
  }, [pdfDoc, totalPages])

  return (
    <div className="thumbnail-sidebar">
      <h4>Thumbnails</h4>
      <div className="thumbnails-list">
        {thumbnails.map((thumb) => (
          <div
            key={thumb.page}
            className={`thumbnail ${currentPage === thumb.page ? "active" : ""}`}
            onClick={() => onPageSelect(thumb.page)}
          >
            <img src={thumb.image || "/placeholder.svg"} alt={`Page ${thumb.page}`} />
            <span className="page-number">{thumb.page}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThumbnailSidebar
