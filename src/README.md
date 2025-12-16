# PDF Editor Application

A professional, fully-featured PDF editor built with React and Next.js. Add text annotations, signatures, stamps, and more to your PDF documents with an intuitive interface and smooth user experience.

## Features

- **PDF Viewing**: Upload and view multi-page PDF documents with thumbnail sidebar navigation
- **Text Annotations**: Add customizable text annotations with font family, size, and color options
- **Signatures**: Three signature methods:
  - Type signatures in a cursive style
  - Draw signatures on a canvas
  - Upload signature images
- **Stamps**: Create custom stamps with text and color customization
- **Zoom Controls**: Zoom in and out (0.5x to 2x) while maintaining proper positioning
- **Draggable Annotations**: Move any annotation (text, signature, stamp) to any location on the page
- **Page Navigation**: Quick navigation with thumbnail sidebar and previous/next buttons
- **PDF Export**: Export annotated PDFs (foundation for full flattening)
- **Authentication**: Secure login system with demo credentials
- **Responsive Design**: Clean, professional UI built with custom CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone or download the project:
\`\`\`bash
git clone <repository-url>
cd pdf-editor-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

### Demo Credentials

Use these credentials to log in:
- **Admin Account**: 
  - Username: `admin`
  - Password: `password`
- **User Account**:
  - Username: `user`
  - Password: `user123`

## Usage

### Uploading a PDF

1. Log in with your credentials
2. Click the **"New PDF"** button to upload a PDF file
3. Select a PDF file from your computer

### Adding Annotations

1. Click on an annotation tool: **Text**, **Signature**, or **Stamp**
2. A tool panel will appear with configuration options:
   - **Text**: Choose font family, size, and color
   - **Signature**: Type, draw, or upload your signature
   - **Stamp**: Customize stamp text and color
3. Click on the PDF page to add the annotation
4. Click **"Add"** to confirm

### Managing Annotations

- **Move**: Click and drag any annotation to reposition it
- **Delete**: Click the delete button on an annotation to remove it
- **Zoom**: Use **Zoom In** and **Zoom Out** buttons to adjust the view (0.5x - 2x)
- **Navigate**: Use the thumbnail sidebar or Previous/Next buttons to move between pages

### Exporting

Click **"Export PDF"** to download your annotated PDF document.

## Project Structure

\`\`\`
pdf-editor-app/
├── src/
│   ├── components/
│   │   ├── AnnotationToolbar.jsx       # Main toolbar for annotation tools
│   │   ├── PDFViewer.jsx               # PDF canvas and viewer
│   │   ├── TextAnnotationTool.jsx      # Text annotation interface
│   │   ├── SignatureTool.jsx           # Signature creation tool
│   │   ├── StampTool.jsx               # Stamp creation tool
│   │   └── ThumbnailSidebar.jsx        # Page thumbnail navigation
│   ├── pages/
│   │   ├── LoginPage.jsx               # Authentication login
│   │   └── DashboardPage.jsx           # Main editor dashboard
│   ├── services/
│   │   ├── authService.js             # Authentication logic
│   │   └── pdfService.js              # PDF manipulation utilities
│   ├── styles/
│   │   ├── app.css                    # Global application styles
│   │   ├── login.css                  # Login page styles
│   │   ├── dashboard.css              # Dashboard layout styles
│   │   ├── annotation-toolbar.css     # Toolbar styles
│   │   ├── pdf-viewer.css             # PDF viewer styles
│   │   ├── text-annotation.css        # Text tool styles
│   │   ├── signature-tool.css         # Signature tool styles
│   │   ├── stamp-tool.css             # Stamp tool styles
│   │   └── thumbnail-sidebar.css      # Thumbnail styles
│   ├── App.jsx                         # Root component
│   └── index.jsx                       # Entry point
├── app/
│   └── page.tsx                        # Next.js app router page
├── package.json                        # Project dependencies
└── README.md                           # This file
\`\`\`

## Technology Stack

- **Frontend Framework**: React 19.2.0 with Next.js 16.0.7
- **PDF Library**: PDF.js (pdfjs-dist 5.4.449)
- **Styling**: Pure CSS (custom styles, no Tailwind)
- **State Management**: React Hooks
- **Build Tool**: Next.js with Turbopack

## Key Features Implementation

### PDF Rendering
- Uses PDF.js library for reliable PDF rendering
- Workers handle PDF parsing asynchronously
- Canvas-based rendering for performance

### Annotations System
- Modular component architecture
- State management through React hooks
- Real-time positioning and dragging
- Zoom-aware scaling

### Zoom Functionality
- Scale range: 0.5x to 2x
- Maintains annotation positioning
- Smooth visual transitions
- Proper container scrolling

### Drag & Drop
- Mouse event handlers for drag detection
- Real-time position tracking
- Visual feedback (cursor changes)
- Works with all annotation types

## Customization

### Changing Colors

Edit the color values in the individual CSS files:
- `src/styles/app.css` - Global color scheme
- `src/styles/annotation-toolbar.css` - Tool colors
- `src/styles/pdf-viewer.css` - Viewer theme

### Modifying Font Options

Update the font lists in `src/components/TextAnnotationTool.jsx`:
\`\`\`javascript
const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New'];
\`\`\`

## Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with ES6+ support

## Known Limitations

- PDF text extraction not implemented
- Batch annotation operations not available
- Collaboration features not included
- PDF form filling not supported

## Future Enhancements

- [ ] Full PDF flattening on export
- [ ] Undo/Redo functionality
- [ ] Annotation history
- [ ] Multi-user collaboration
- [ ] Advanced drawing tools
- [ ] PDF form support
- [ ] Cloud storage integration

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please review the code structure and component documentation in the `src/` directory.

---

**Happy Editing!** 📄✨
