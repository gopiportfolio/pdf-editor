"use client"

import { useState } from "react"
import "./styles/annotation-tools.css"

function TextAnnotationTool({ onAddAnnotation, onClose }) {
  const [text, setText] = useState("")
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("Arial")
  const [color, setColor] = useState("#000000")
  const [x, setX] = useState(100)
  const [y, setY] = useState(100)

  const handleAddText = () => {
    if (!text.trim()) {
      alert("Please enter text")
      return
    }

    onAddAnnotation({
      type: "text",
      text,
      fontSize: Number.parseInt(fontSize),
      fontFamily,
      color,
      x: Number.parseInt(x),
      y: Number.parseInt(y),
      page: 1,
      width: text.length * (Number.parseInt(fontSize) * 0.6),
      height: Number.parseInt(fontSize),
    })

    setText("")
    onClose()
  }

  return (
    <div className="annotation-panel">
      <div className="panel-header">
        <h4>Text Annotation</h4>
        <button onClick={onClose} className="close-button">
          ✕
        </button>
      </div>

      <div className="panel-content">
        <div className="form-group">
          <label>Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here"
            className="form-input textarea"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Font Size (px)</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              min="8"
              max="72"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Font Family</label>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="form-input">
              <option>Arial</option>
              <option>Times New Roman</option>
              <option>Courier New</option>
              <option>Georgia</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label>X Position (px)</label>
            <input type="number" value={x} onChange={(e) => setX(e.target.value)} min="0" className="form-input" />
          </div>

          <div className="form-group">
            <label>Y Position (px)</label>
            <input type="number" value={y} onChange={(e) => setY(e.target.value)} min="0" className="form-input" />
          </div>
        </div>

        <button onClick={handleAddText} className="action-button">
          Add Text
        </button>
      </div>
    </div>
  )
}

export default TextAnnotationTool
