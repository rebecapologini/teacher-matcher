import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import AddTodo from '../../components/todos/add-todo.tsx';
import TodoList from '../../components/todos/todo-list.tsx';

// Регистрируем плагины
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,

);

const Home = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (error: any, fileItem: any) => {
    if (!fileItem) return;

    // Обработка удаления файла на сервере
    fetch(`http://localhost:4000/api/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: fileItem.filename }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('File deleted:', data);
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <AddTodo />
      <TodoList />
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
            withCredentials: true,
            headers: {},
            onload: (response) => response,
            onerror: (response) => response,
          }
        }}
        onupdatefiles={fileItems => {
          setFiles(fileItems.map(fileItem => fileItem.file as File));
        }}
        onremovefile={handleRemoveFile}
        name="file"
        acceptedFileTypes={['image/*']}
        labelFileTypeNotAllowed="Only images are allowed"
        fileValidateTypeLabelExpectedTypes="Expects {allButLastType} or {lastType}"
        allowImagePreview={true}
      />
    </div>
  );
};

export default Home;