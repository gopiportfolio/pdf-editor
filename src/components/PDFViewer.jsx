import React, { useState, useRef, useEffect } from "react"
import * as PDFJS from "pdfjs-dist"

import AnnotationToolbar from "./AnnotationToolbar"
import ThumbnailSidebar from "./ThumbnailSidebar"

import { pdfService } from "../components/services/pdfService"
import "../components/styles/pdf.css"

// ✅ Correct PDF.js worker setup for Vite
const workerPath = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href
PDFJS.GlobalWorkerOptions.workerSrc = workerPath

function PDFViewer({ pdfData, onNewPDF }) {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1)
  const [annotations, setAnnotations] = useState([])
  const [activeTool, setActiveTool] = useState(null)
  const [error, setError] = useState(null)

  const [draggedAnnotationId, setDraggedAnnotationId] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // ================= LOAD PDF =================
  useEffect(() => {
    if (pdfData?.data) {
      loadPDF(pdfData.data)
    }
  }, [pdfData])

  const loadPDF = async (data) => {
    try {
      setError(null)
      const pdf = await PDFJS.getDocument({ data }).promise
      setPdfDoc(pdf)
      setTotalPages(pdf.numPages)
      setCurrentPage(1)
      renderPage(pdf, 1)
    } catch (err) {
      console.error("PDF load error:", err)
      setError("Failed to load PDF file.")
    }
  }

  // ================= RENDER PAGE =================
  const renderPage = async (pdf, pageNum) => {
    try {
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport,
      }).promise
    } catch (err) {
      console.error("Render error:", err)
    }
  }

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage)
    }
  }, [currentPage, scale, pdfDoc])

  // ================= ANNOTATIONS =================
const handleAddAnnotation = (annotation) => {
  const canvas = canvasRef.current
  if (!canvas) return

  // Place annotation visibly inside page
  const defaultX = canvas.width * 0.25
  const defaultY = canvas.height * 0.2

  setAnnotations((prev) => [
    ...prev,
    {
      ...annotation,
      id: Date.now(),
      page: currentPage,
      x: annotation.x ?? defaultX,
      y: annotation.y ?? defaultY,
      width: annotation.width ?? 160,
      height: annotation.height ?? 60,
    },
  ])
}

  const handleDeleteAnnotation = (id) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id))
  }

  // ================= EXPORT =================
  const handleExportPDF = async () => {
    if (!pdfDoc) return
    try {
      const bytes = await pdfService.exportWithAnnotations(pdfDoc, annotations)
      pdfService.downloadPdf(bytes, pdfData?.name || "exported.pdf")
    } catch (err) {
      console.error("Export error:", err)
      alert("Error exporting PDF")
    }
  }

  // ================= DRAG =================
  const handleAnnotationMouseDown = (e, id) => {
    e.preventDefault()
    const ann = annotations.find((a) => a.id === id)
    if (!ann) return

    const rect = containerRef.current.getBoundingClientRect()
    setDraggedAnnotationId(id)
    setDragOffset({
      x: e.clientX - rect.left - ann.x,
      y: e.clientY - rect.top - ann.y,
    })
  }

  const handleMouseMove = (e) => {
    if (draggedAnnotationId === null) return

    const rect = containerRef.current.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragOffset.x
    const newY = e.clientY - rect.top - dragOffset.y

    setAnnotations((prev) =>
      prev.map((a) =>
        a.id === draggedAnnotationId
          ? { ...a, x: Math.max(0, newX), y: Math.max(0, newY) }
          : a
      )
    )
  }

  const handleMouseUp = () => setDraggedAnnotationId(null)

  // ================= UI =================
  return (
    <div className="pdf-viewer-container">
      {error && !pdfDoc && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {pdfDoc ? (
        <>
          <AnnotationToolbar
            onAddAnnotation={handleAddAnnotation}
            onExport={handleExportPDF}
            activeTool={activeTool}
            onToolChange={setActiveTool}
            onNewPDF={onNewPDF}
          />

          <div className="viewer-content">
            <ThumbnailSidebar
              pdfDoc={pdfDoc}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageSelect={setCurrentPage}
            />

            <div
              className="canvas-wrapper"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="scalable-container"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <canvas ref={canvasRef} className="pdf-canvas" />

                <div className="annotations-overlay">
                  {annotations
                    .filter((a) => a.page === currentPage)
                    .map((a) => (
                      <div
                        key={a.id}
                        className="annotation-item"
                        style={{
                          left: a.x,
                          top: a.y,
                          cursor:
                            draggedAnnotationId === a.id
                              ? "grabbing"
                              : "grab",
                        }}
                        onMouseDown={(e) =>
                          handleAnnotationMouseDown(e, a.id)
                        }
                      >
                        {a.type === "text" && (
  <div
    className="text-annotation"
    style={{
      fontSize: a.fontSize || 16,
      color: a.color || "#000",
    }}
  >
    {a.text}
  </div>
)}

{a.type === "signature" && (
  <img
    src={a.imageData}
    alt="Signature"
    className="signature-annotation"
  />
)}

{a.type === "stamp" && (
  <div
    className="stamp-annotation"
    style={{
      backgroundColor: a.backgroundColor || "#ff0000",
      color: a.textColor || "#ffffff",
      width: a.width || 160,
      height: a.height || 80,
    }}
  >
    {a.text || "APPROVED"}
  </div>
)}

                        <button
                          className="delete-annotation"
                          onClick={() => handleDeleteAnnotation(a.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="viewer-controls">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              <span>
                Page {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next →
              </button>

              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              >
                −
              </button>

              <span>{Math.round(scale * 100)}%</span>

              <button
                onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              >
                +
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="loading-text">Ready to load PDF...</p>
      )}
    </div>
  )
}

export default PDFViewer
