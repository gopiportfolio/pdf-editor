"use client"

import { useState, useRef } from "react"
import "./styles/annotation-tools.css"

function SignatureTool({ onAddAnnotation, onClose }) {
  const [signatureMethod, setSignatureMethod] = useState("typed")
  const [typedText, setTypedText] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)

  const handleDrawSignature = (e) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const context = canvas.getContext("2d")
    context.lineWidth = 2
    context.lineCap = "round"
    context.strokeStyle = "#000"

    if (isDrawingRef.current) {
      context.lineTo(x, y)
      context.stroke()
    }
  }

  const startDrawing = (e) => {
    isDrawingRef.current = true
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const context = canvas.getContext("2d")
    context.beginPath()
    context.moveTo(x, y)
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddSignature = () => {
    let signatureData = null

    if (signatureMethod === "typed" && typedText.trim()) {
      const canvas = document.createElement("canvas")
      canvas.width = 300
      canvas.height = 80
      const context = canvas.getContext("2d")
      context.font = "italic 40px Brush Script MT, cursive"
      context.fillStyle = "#000"
      context.fillText(typedText, 10, 50)
      signatureData = canvas.toDataURL()
    } else if (signatureMethod === "drawn") {
      signatureData = canvasRef.current.toDataURL()
    } else if (signatureMethod === "uploaded" && uploadedImage) {
      signatureData = uploadedImage
    }

    if (!signatureData) {
      alert("Please create a signature first")
      return
    }

    onAddAnnotation({
      type: "signature",
      imageData: signatureData,
      x: 100,
      y: 100,
      page: 1,
      width: 150,
      height: 60,
    })

    onClose()
  }

  return (
    <div className="annotation-panel">
      <div className="panel-header">
        <h4>Add Signature</h4>
        <button onClick={onClose} className="close-button">
          ✕
        </button>
      </div>

      <div className="panel-content">
        <div className="form-group">
          <label>Signature Method</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="typed"
                checked={signatureMethod === "typed"}
                onChange={(e) => setSignatureMethod(e.target.value)}
              />
              Typed Signature
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="drawn"
                checked={signatureMethod === "drawn"}
                onChange={(e) => setSignatureMethod(e.target.value)}
              />
              Draw Signature
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="uploaded"
                checked={signatureMethod === "uploaded"}
                onChange={(e) => setSignatureMethod(e.target.value)}
              />
              Upload Image
            </label>
          </div>
        </div>

        {signatureMethod === "typed" && (
          <div className="form-group">
            <label>Enter Name</label>
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Your name here"
              className="form-input"
            />
          </div>
        )}

        {signatureMethod === "drawn" && (
          <div className="form-group">
            <label>Draw Your Signature</label>
            <canvas
              ref={canvasRef}
              width={300}
              height={150}
              className="signature-canvas"
              onMouseDown={startDrawing}
              onMouseMove={handleDrawSignature}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
            <button onClick={clearCanvas} className="secondary-button">
              Clear
            </button>
          </div>
        )}

        {signatureMethod === "uploaded" && (
          <div className="form-group">
            <label>Upload Signature Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="form-input" />
            {uploadedImage && (
              <div className="preview">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Signature preview"
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                />
              </div>
            )}
          </div>
        )}

        <button onClick={handleAddSignature} className="action-button">
          Add Signature
        </button>
      </div>
    </div>
  )
}

export default SignatureTool
