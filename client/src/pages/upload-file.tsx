import React, { useRef, useState } from 'react';
import axios from 'axios';
import './UploadFile.css'; // Ваши стили

interface UploadFileProps {
  onUploadComplete: (fileName: string) => void;
  onRemove: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onUploadComplete, onRemove }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf' && file.size <= 2 * 1024 * 1024) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const fileUrl = response.data.filePath;
        setFileName(response.data.fileName); // Используем оригинальное имя файла
        setIsFileUploaded(true);
        onUploadComplete(response.data.fileName);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Файл должен быть не более 2МБ.');
    }
  };

  const handleRemoveClick = async () => {
    if (fileName) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            fileName: fileName, // Передаем только имя файла
          },
        });

        if (response.status === 200) {
          setFileName('');
          setIsFileUploaded(false);
          onRemove();
        } else {
          console.error('Failed to remove file:', response);
        }
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
  };

  return (
    <div className="upload-file">
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="upload-icon-container" onClick={() => !isFileUploaded && fileInputRef.current?.click()}>
        <div className="upload-icon">
          {!isFileUploaded ? (
            <svg width="15" height="16" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5V13C5 14.1046 5.89543 15 7 15V15C8.10457 15 9 14.1046 9 13V5C9 2.79086 7.20914 1 5 1V1C2.79086 1 1 2.79086 1 5V13C1 16.3137 3.68629 19 7 19V19C10.3137 19 13 16.3137 13 13V8" stroke="#888888" stroke-width="2" stroke-linecap="round"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleRemoveClick}>
              <path d="M2 2L13 13M2 13L13 2" stroke="#888888" stroke-width="2" stroke-linecap="round"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
