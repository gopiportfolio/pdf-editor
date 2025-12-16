"use client"
import TextAnnotationTool from "./TextAnnotationTool"
import SignatureTool from "./SignatureTool"
import StampTool from "./StampTool"
import "./styles/toolbar.css"

function AnnotationToolbar({ onAddAnnotation, onExport, activeTool, onToolChange, onNewPDF }) {
  const handleToolClick = (tool) => {
    onToolChange(activeTool === tool ? null : tool)
  }

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-section">
          <h3 className="toolbar-title">Annotation Tools</h3>

          <button
            className={`toolbar-button ${activeTool === "text" ? "active" : ""}`}
            onClick={() => handleToolClick("text")}
            title="Add Text Annotation"
          >
            Text
          </button>

          <button
            className={`toolbar-button ${activeTool === "signature" ? "active" : ""}`}
            onClick={() => handleToolClick("signature")}
            title="Add Signature"
          >
            Signature
          </button>

          <button
            className={`toolbar-button ${activeTool === "stamp" ? "active" : ""}`}
            onClick={() => handleToolClick("stamp")}
            title="Add Stamp"
          >
            Stamp
          </button>
        </div>

        <div className="toolbar-section">
          <button onClick={onExport} className="toolbar-button export-button">
            Export PDF
          </button>
          <button onClick={onNewPDF} className="toolbar-button new-button">
            New PDF
          </button>
        </div>
      </div>

      {activeTool === "text" && (
        <TextAnnotationTool onAddAnnotation={onAddAnnotation} onClose={() => onToolChange(null)} />
      )}
      {activeTool === "signature" && (
        <SignatureTool onAddAnnotation={onAddAnnotation} onClose={() => onToolChange(null)} />
      )}
      {activeTool === "stamp" && <StampTool onAddAnnotation={onAddAnnotation} onClose={() => onToolChange(null)} />}
    </>
  )
}

export default AnnotationToolbar
