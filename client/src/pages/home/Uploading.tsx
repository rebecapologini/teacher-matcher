import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'; // Import the Image Transform plugin
import '../../FilePondCustom.css'; // Import custom styles

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageTransform // Register the Image Transform plugin
);

interface UploadingProps {
  onUploadComplete: (fileUrl: string) => void;
  onRemove: () => void; // New prop for removal
}

const Uploading: React.FC<UploadingProps> = ({ onUploadComplete, onRemove }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (error: any, fileItem: any) => {
    if (!fileItem) return;
    // Handle file removal on the server
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
      setFiles([]); // Clear files after deletion
      onRemove();  // Call the removal handler
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };

  const handleProcessFile = (error: any, file: any) => {
    if (error) return;
    
    const adjustQuality = (fileItem: any, quality: number, resolve: any) => {
      const blob = fileItem.getFileEncodeBase64();
      const byteString = atob(blob.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const newBlob = new Blob([ab], { type: 'image/jpeg' });

      if (newBlob.size <= 512 * 1024) {
        resolve();
      } else if (quality > 10) {
        fileItem.setMetadata('imageTransformOutputQuality', quality - 10);
        adjustQuality(fileItem, quality - 10, resolve);
      } else {
        resolve();
      }
    };

    return new Promise(resolve => {
      adjustQuality(file, 85, resolve);
    });
  };

  return (
    <div>
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
            onload: (response) => {
              const fileUrl = JSON.parse(response).filePath;
              onUploadComplete(fileUrl);
              return response;
            },
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
        onremovefile={handleRemoveFile} // Pass the function directly
        onprocessfile={handleProcessFile}
        name="file"
        acceptedFileTypes={['image/*']}
        labelFileTypeNotAllowed="Only images are allowed"
        fileValidateTypeLabelExpectedTypes="Expects {allButLastType} or {lastType}"
        allowImagePreview={false}
        maxFileSize="2MB" // Add file size limit
        labelMaxFileSizeExceeded="File is too large"
        labelMaxFileSize="Maximum file size is {filesize}"
        className="filepond-custom" // Apply custom class
        labelIdle=''
        credits={false}
        labelFileProcessingComplete=''
        labelFileProcessingAborted=''
        styleButtonRemoveItemPosition='center'
        labelFileProcessing=''
        labelTapToCancel=''
        labelTapToUndo=''
        labelFileLoading=''
        labelThousandsSeparator=''
        labelDecimalSeparator=''
        labelFileWaitingForSize=''
        styleItemPanelAspectRatio='center'
        labelFileLoadError=''
        labelFileSizeNotAvailable=''
        labelFileProcessingError=''
        imageTransformOutputQuality={85} // Set initial quality
      />
    </div>
  );
};

export default Uploading;
