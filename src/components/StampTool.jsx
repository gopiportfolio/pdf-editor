"use client"

import { useState } from "react"
import "./styles/annotation-tools.css"

function StampTool({ onAddAnnotation, onClose }) {
  const [stampText, setStampText] = useState("APPROVED")
  const [backgroundColor, setBackgroundColor] = useState("#FF0000")
  const [textColor, setTextColor] = useState("#FFFFFF")

  const handleAddStamp = () => {
    if (!stampText.trim()) {
      alert("Please enter stamp text")
      return
    }

    onAddAnnotation({
      type: "stamp",
      text: stampText,
      backgroundColor,
      textColor,
      width: 160,
      height: 70,
    })

    onClose()
  }

  return (
    <div className="annotation-panel">
      <div className="panel-header">
        <h4>Add Stamp</h4>
        <button onClick={onClose} className="close-button">✕</button>
      </div>

      <div className="panel-content">
        <div className="form-group">
          <label>Stamp Text</label>
          <input
            type="text"
            value={stampText}
            onChange={(e) => setStampText(e.target.value)}
            className="form-input"
            maxLength={20}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Background Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Text Color</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Preview</label>
          <div
            className="stamp-preview"
            style={{
              backgroundColor,
              color: textColor,
            }}
          >
            {stampText}
          </div>
        </div>

        <button onClick={handleAddStamp} className="action-button">
          Add Stamp
        </button>
      </div>
    </div>
  )
}

export default StampTool