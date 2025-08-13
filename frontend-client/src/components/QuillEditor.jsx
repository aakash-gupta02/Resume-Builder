// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";

// const QuillEditor = ({ value, onChange }) => {
//   const quillInstance = useRef(null);
//   const editorRef = useRef(null);
//   const [isMounted, setIsMounted] = useState(false);

//   // Initialize Quill
//   useEffect(() => {
//     if (!isMounted && editorRef.current) {
//       const quill = new Quill(editorRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic", "underline", "strike"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link"],
//             ["clean"],
//           ],
//         },
//         placeholder: "Write something...",
//       });

//       quill.on("text-change", () => {
//         if (onChange) {
//           const content = quill.root.innerHTML;
//           onChange(content);
//         }
//       });

//       quillInstance.current = quill;
//       setIsMounted(true);

//       // Set initial value
//       if (value) {
//         quill.clipboard.dangerouslyPasteHTML(value);
//       }

//       return () => {
//         quill.off("text-change"); // Cleanup event listener
//       };
//     }
//   }, [isMounted, onChange, value]);

//   // Handle external value changes
//   useEffect(() => {
//     if (
//       isMounted &&
//       quillInstance.current &&
//       value !== quillInstance.current.root.innerHTML
//     ) {
//       quillInstance.current.clipboard.dangerouslyPasteHTML(value || "");
//     }
//   }, [value, isMounted]);

//   return (
//     <div className="quill-editor" style={{ height: "400px" }}>
//       <div ref={editorRef} />
//     </div>
//   );
// };

// export default QuillEditor;




import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange, placeholder, toolbarOptions }) => {
  const quillInstance = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillInstance.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions || [
            ['bold', 'italic', 'underline'],
            [{ list: 'bullet' }],
            ['clean']
          ]
        },
        placeholder: placeholder || 'Type here...'
      });

      // Set initial value
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      // Handle changes
      quill.on('text-change', () => {
        if (onChange) {
          onChange(quill.root.innerHTML);
        }
      });

      quillInstance.current = quill;
    }

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off('text-change');
      }
    };
  }, []);

  // Handle external value changes
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.clipboard.dangerouslyPasteHTML(value || '');
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: '200px' }} />;
};

export default QuillEditor;