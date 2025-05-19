'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent= ({ setShowAlert, setTitle, setType }) => {

  const handleFileUploadButtonClick = () => {
    // handle upload of file
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');

    el.addEventListener('change', async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append('pdf', file);
          console.log('Uploading file:');

          const res = await fetch('https://pdf-rag-backend.vercel.app/upload/pdf', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          console.log(data)
          setShowAlert(true);
          setTitle('File uploaded successfully');
          setType('success');
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        } else {
          setShowAlert(true);
          setTitle('File upload failed');
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
