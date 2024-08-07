import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageTransform from "filepond-plugin-image-transform"; // Import the Image Transform plugin
import "./FilePondCustom.css"; // Import custom styles

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

const Uploading: React.FC<UploadingProps> = ({
  onUploadComplete,
  onRemove,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemoveFile = (error: any, fileItem: any) => {
    if (!fileItem) return;
    // Handle file removal on the server
    fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: fileItem.filename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File deleted:", data);
        setFiles([]); // Clear files after deletion
        onRemove(); // Call the removal handler
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const handleProcessFile = (error: any, file: any) => {
    if (error) return;

    const adjustQuality = (fileItem: any, quality: number, resolve: any) => {
      const blob = fileItem.getFileEncodeBase64();
      const byteString = atob(blob.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const newBlob = new Blob([ab], { type: "image/jpeg" });

      if (newBlob.size <= 512 * 1024) {
        resolve();
      } else if (quality > 10) {
        fileItem.setMetadata("imageTransformOutputQuality", quality - 10);
        adjustQuality(fileItem, quality - 10, resolve);
      } else {
        resolve();
      }
    };

    return new Promise((resolve) => {
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
          url: `${import.meta.env.VITE_API_BASE_URL}`,
          process: {
            url: "/upload",
            method: "POST",
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
            url: "/upload",
            method: "DELETE",
            withCredentials:  false,
            headers: {},
            onload: (response) => response,
            onerror: (response) => response,
          },
        }}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem.file as File));
        }}
        onremovefile={handleRemoveFile} // Pass the function directly
        onprocessfile={handleProcessFile}
        name="file"
        acceptedFileTypes={["image/*"]}
        labelFileTypeNotAllowed="Only images are allowed"
        fileValidateTypeLabelExpectedTypes="Expects {allButLastType} or {lastType}"
        allowImagePreview={false}
        maxFileSize="2MB" // Add file size limit
        labelMaxFileSizeExceeded="File is too large"
        labelMaxFileSize="Maximum file size is {filesize}"
        className="filepond-custom" // Apply custom class
        labelIdle='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.78995 13.2699L6.51995 9.85993C6.62623 9.38606 6.86561 8.95239 7.20995 8.60993L13.88 1.99993C14.5563 1.3109 15.4747 0.912711 16.44 0.889929C17.168 0.879498 17.87 1.1603 18.39 1.66993C19.5261 3.01239 19.3795 5.01715 18.06 6.17993L11.39 12.8499C11.0475 13.1943 10.6138 13.4337 10.14 13.5399L6.72995 14.2699H6.53995C6.29066 14.2795 6.05256 14.1661 5.90288 13.9665C5.75319 13.7669 5.71099 13.5066 5.78995 13.2699ZM8.26995 9.67993C8.12984 9.81571 8.03251 9.98952 7.98995 10.1799L7.49995 12.5099L9.82995 12.0099C10.0204 11.9674 10.1942 11.87 10.33 11.7299L17 5.05993C17.7306 4.47495 17.8756 3.42041 17.33 2.65993C17.091 2.43164 16.7702 2.3091 16.44 2.31993C15.8705 2.34279 15.3324 2.58673 14.94 2.99993L8.26995 9.67993Z" fill="#888888"/>
<path d="M17.91 8.92993C17.498 8.93532 17.1653 9.26797 17.16 9.67993V15.3699C17.1734 16.1742 16.8632 16.9502 16.2992 17.5236C15.7351 18.0971 14.9643 18.42 14.16 18.4199H4.62996C2.96732 18.3873 1.63507 17.0329 1.62996 15.3699V5.87993C1.65725 4.21502 3.01482 2.87971 4.67996 2.87993H10.37C10.7842 2.87993 11.12 2.54414 11.12 2.12993C11.12 1.71572 10.7842 1.37993 10.37 1.37993H4.62996C2.13646 1.37978 0.107357 3.38658 0.0799561 5.87993V15.3699C0.0799561 17.8828 2.11706 19.9199 4.62996 19.9199H14.12C16.6289 19.9144 18.66 17.8789 18.66 15.3699V9.67993C18.6546 9.26797 18.3219 8.93532 17.91 8.92993Z" fill="#888888"/>
</svg>
'
        credits={false}
        labelFileProcessingComplete=""
        labelFileProcessingAborted=""
        styleButtonRemoveItemPosition="center"
        labelFileProcessing=""
        labelTapToCancel=""
        labelTapToUndo=""
        labelFileLoading=""
        labelThousandsSeparator=""
        labelDecimalSeparator=""
        labelFileWaitingForSize=""
        styleItemPanelAspectRatio="center"
        labelFileLoadError=""
        labelFileSizeNotAvailable=""
        labelFileProcessingError=""
        imageTransformOutputQuality={85} // Set initial quality
      />
    </div>
  );
};

export default Uploading;
