"use client";
import React, { useState } from 'react';
import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';
import Alert from '@/components/ui/Alert';


export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="bg-slate-700 w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUploadComponent setShowAlert={setShowAlert} setTitle={setTitle} setType={setType} />
        </div>
        <div className="bg-slate-900 w-[70vw] min-h-screen border-l-2">
          <div className="p-4">
            {showAlert && (
              <Alert
                type={type}
                title={title}
                message=""
                onClose={() => setShowAlert(false)}
              />
            )}
          </div>
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
