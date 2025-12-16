import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

/* HEX → rgb */
function hexToRgb(hex = "#000000") {
  const c = hex.replace("#", "")
  const n = parseInt(c, 16)
  return rgb(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255
  )
}

export const pdfService = {
  exportWithAnnotations: async (pdfJsDoc, annotations) => {
    const originalBytes = await pdfJsDoc.getData()
    const pdfDoc = await PDFDocument.load(originalBytes)
    const pages = pdfDoc.getPages()

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    annotations.forEach((a) => {
      const page = pages[a.page - 1]
      if (!page) return

      const { height } = page.getSize()
      const y = height - a.y - (a.height || 20)

      /* ========= TEXT ========= */
      if (a.type === "text") {
        page.drawText(a.text || "", {
          x: a.x,
          y,
          size: a.fontSize || 14,
          font,
          color: hexToRgb(a.color || "#000000"),
        })
      }

      /* ========= STAMP (STRAIGHT OVAL) ========= */
      if (a.type === "stamp") {
        const w = a.width || 160
        const h = a.height || 80

        const cx = a.x + w / 2
        const cy = y + h / 2

        // ✅ STRAIGHT OVAL (NO ROTATION)
        page.drawEllipse({
          x: cx,
          y: cy,
          xScale: w / 2,
          yScale: h / 2,
          color: hexToRgb(a.backgroundColor || "#00aa66"),
        })

        // ✅ PERFECTLY CENTERED TEXT
        const text = a.text || "APPROVED"
        const fontSize = 14
        const textWidth = font.widthOfTextAtSize(text, fontSize)

        page.drawText(text, {
          x: cx - textWidth / 2,
          y: cy - fontSize / 2,
          size: fontSize,
          font,
          color: hexToRgb(a.textColor || "#ffffff"),
        })
      }
    })

    return await pdfDoc.save()
  },

  downloadPdf: (bytes, filename = "exported.pdf") => {
    const blob = new Blob([bytes], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  },
}
