import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import axios from "axios";

import type { UploadItem } from "./global";

import { Hero, List, UploadBox } from "./components/ui";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    const uploadsToAdd: UploadItem[] = [];

    files.forEach((file) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImage) return;

      const isSizeValid = file.size <= 2 * 1024 * 1024;

      uploadsToAdd.push({
        file,
        progress: 0,
        status: isSizeValid ? "pending" : "failed",
        cancelToken: null,
      });
    });

    const startIndex = uploads.length;
    const updatedUploads = [...uploads, ...uploadsToAdd];
    setUploads(updatedUploads);

    uploadsToAdd.forEach((upload, offset) => {
      if (upload.status === "pending") {
        const index = startIndex + offset;
        uploadFiles(upload.file, index);
      }
    });
  };

  const uploadFiles = (file: File, index: number) => {
    const cancelTokenSource = axios.CancelToken.source();

    setUploads((prev) =>
      prev.map((u, i) =>
        i === index
          ? { ...u, status: "uploading", cancelToken: cancelTokenSource }
          : u
      )
    );

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${baseUrl}/upload`, formData, {
        cancelToken: cancelTokenSource.token,
        onUploadProgress: ({ total, loaded }) => {
          if (total) {
            const progress = Math.round((loaded * 100) / total);
            setUploads((prev) =>
              prev.map((u, i) => (i === index ? { ...u, progress } : u))
            );
          }
        },
      })
      .then(() => {
        setUploads((prev) =>
          prev.map((u, i) => (i === index ? { ...u, status: "completed" } : u))
        );
      })
      .catch((error) => {
        const errorStatus = axios.isCancel(error) ? "aborted" : "error";
        setUploads((prev) =>
          prev.map((u, i) => (i === index ? { ...u, status: errorStatus } : u))
        );
      });
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleRemove = (index: number): void => {
    const upload = uploads[index];
    if (upload.cancelToken) upload.cancelToken.cancel("abort uploading");
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="layout">
      <Hero />
      <div className="flex justify-center">
        <div className="w-full gap-7 max-w-[300px] lg:max-w-[600px] border-1 rounded-[10px] border-[#EEEEEE] bg-white px-8 py-5 mt-7.5">
          <UploadBox
            inputRef={inputRef}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
          />
          {uploads?.length ? (
            <List uploads={uploads} handleRemove={handleRemove} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
