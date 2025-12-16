"use client"

import { useState } from "react"
import PDFViewer from "../PDFViewer"
import "../styles/dashboard.css"

function DashboardPage({ user, onLogout }) {
  const [pdfFile, setPdfFile] = useState(null)
  const [showUpload, setShowUpload] = useState(true)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPdfFile({
          data: event.target.result,
          name: file.name,
        })
        setShowUpload(false)
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert("Please select a valid PDF file")
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPdfFile({
          data: event.target.result,
          name: file.name,
        })
        setShowUpload(false)
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert("Please drop a valid PDF file")
    }
  }

  const handleNewPDF = () => {
    setPdfFile(null)
    setShowUpload(true)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>PDF Editor</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Welcome, {user.username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {showUpload ? (
          <div className="upload-container">
            <div
              className="upload-box"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h2>Upload PDF</h2>
              <p>Drag and drop your PDF here or click to browse</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="file-input"
                id="pdf-input"
              />
              <label htmlFor="pdf-input" className="upload-button">
                Choose File
              </label>
            </div>
          </div>
        ) : (
          <div className="editor-wrapper">
            <PDFViewer pdfData={pdfFile} onNewPDF={handleNewPDF} />
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
