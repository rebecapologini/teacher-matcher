import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import '../../FilePondCustom.css'; // Импортируем кастомные стили

// Регистрируем плагины
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

const Uploading = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (error: any, fileItem: any) => {
    if (!fileItem) return;
    // Обработка удаления файла на сервере
    fetch('http://localhost:4000/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: fileItem.filename }), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('File deleted:', data);
      setFiles([]); // Очистка файлов после удаления
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={1}
        server={{
          url: 'http://localhost:4000/api',
          process: {
            url: '/upload',
            method: 'POST',
            withCredentials: true,
            headers: {},
            onload: (response) => response,
            onerror: (response) => response,
          },
          revert: {
            url: '/upload',
            method: 'DELETE',
            withCredentials: false,
            headers: {},
            onload: (response) => response,
            onerror: (response) => response,
          }
        }}
        onupdatefiles={fileItems => {
          setFiles(fileItems.map(fileItem => fileItem.file as File));
        }}
        onremovefile={handleRemoveFile} // Передаем функцию напрямую
        name="file"
        acceptedFileTypes={['image/*']}
        labelFileTypeNotAllowed="Only images are allowed"
        fileValidateTypeLabelExpectedTypes="Expects {allButLastType} or {lastType}"
        allowImagePreview={false}
        maxFileSize="2MB" // Добавлено ограничение размера файла
        labelMaxFileSizeExceeded="File is too large"
        labelMaxFileSize="Maximum file size is {filesize}"
        className="filepond-custom" // Применяем кастомный класс
        labelIdle=''
        credits = {false}
        labelFileProcessingComplete=''
        labelFileProcessingAborted=''
        styleButtonRemoveItemPosition='center'
        labelFileProcessing=''
      />
    </div>
  );
};

export default Uploading;