'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent= ({ setShowAlert, setTitle, setType }) => {

  const handleFileUploadButtonClick = () => {
  const el = document.createElement('input');
  el.setAttribute('type', 'file');
  el.setAttribute('accept', 'application/pdf');

  el.addEventListener('change', async (ev) => {
    if (el.files && el.files.length > 0) {
      const file = el.files.item(0);

      if (file) {
        const formData = new FormData();
        formData.append('pdf', file);

        try {
          console.log('Uploading file...');
          console.log(process.env.NODE_ENV)

          const res = await fetch(
            `${
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/upload/pdf'
                : 'https://pdf-rag-backend.vercel.app/upload/pdf'
            }`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
          }

          const data = await res.json();
          console.log('Upload response:', data);

          setShowAlert(true);
          setTitle('File uploaded successfully');
          setType('success');
        } catch (error) {
          console.error('File upload error:', error);

          setShowAlert(true);
          setTitle('File upload failed');
          setType('error');
        } finally {
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      } else {
        setShowAlert(true);
        setTitle('No file selected');
        setType('error');
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    }
  });

  el.click();
};


  return (
    <>

      <div className="bg-white text-black shadow-2xl flex justify-center items-center p-4 rounded-lg border-white border-2">
        <div
          onClick={handleFileUploadButtonClick}
          className="poppins cursor-pointer flex justify-center items-center flex-col"
        >
          <h3>Upload PDF File</h3>
          <Upload />
        </div>
      </div>
    </>
  );
};

export default FileUploadComponent;
