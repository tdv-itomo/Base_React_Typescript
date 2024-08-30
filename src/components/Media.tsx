import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
// import { IFiles } from '../models/ForestOwner';

type MediaProps = {
  files: FileList | File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  filesEdit?: any[] | null;
  setUpdatedRemovedFiles?: React.Dispatch<React.SetStateAction<string[]>>;
  type?: string;
};

export const Media: React.FC<MediaProps> = React.memo(
  ({ files, setFiles, filesEdit, setUpdatedRemovedFiles, type }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [removedFiles, setRemovedFiles] = useState<string[]>([]);

    const handleAddImage = () => {
      inputRef.current?.click();
    };

    const getFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setFiles(files);
      }
    };

    const handleRemoveFile = (event: any, key: string) => {
      event.preventDefault();
      setRemovedFiles((prev) => {
        const updatedRemovedFiles = [...prev, key];
        if (setUpdatedRemovedFiles) {
          setUpdatedRemovedFiles(updatedRemovedFiles);
        }
        return updatedRemovedFiles;
      });
    };

    const isFileRemoved = (key: string) => removedFiles.includes(key);

    return (
      <>
        <div className='pt-4 w-full overflow-auto'>
          <div
            className={`flex mb-3 align-items-center ${
              type === 'locationimage' ? 'gap-2' : 'justify-content-between '
            }`}>
            <span>Hình ảnh / Video</span>
            <Button
              icon='pi pi-plus'
              rounded
              style={{ height: '35px', width: '35px' }}
              type='button'
              onClick={handleAddImage}
            />
          </div>
          <div>
            <input
              type='file'
              multiple
              className='hidden'
              accept='image/*,video/*'
              ref={inputRef}
              onChange={getFiles}
            />
            <hr />
            <div className='flex flex-column gap-2'>
              {filesEdit && filesEdit.length > 0 && (
                <div className='flex flex-column w-full gap-2 overflow-auto'>
                  {filesEdit.map(
                    (file, index) =>
                      !isFileRemoved(file.key) && (
                        <div
                          key={index}
                          className='file-preview flex justify-content-between align-items-center'
                          style={{ height: '100px' }}>
                          {file.type === 'image' && (
                            <>
                              <Image
                                src={file.value}
                                alt={file.key}
                                width='100'
                                height='100'
                                preview
                                className='preview-image'
                              />
                              <div
                                className='text-left overflow-hidden whitespace-nowrap overflow-ellipsis'
                                style={{ width: '250px' }}>
                                <p>{file.key}</p>
                              </div>
                              <Button
                                icon='pi pi-times'
                                className='p-button-rounded p-button-danger p-button-text'
                                onClick={(e) => handleRemoveFile(e, file.key)}
                              />
                            </>
                          )}
                          {file.type === 'video' && (
                            <>
                              <video
                                controls
                                controlsList='nodownload'
                                className='preview-video'
                                width='100'
                                height='100'>
                                <source
                                  src={file.value}
                                  type={file.type}
                                />
                              </video>
                              <Button
                                icon='pi pi-times'
                                className='p-button-rounded p-button-danger p-button-text'
                                onClick={(e) => handleRemoveFile(e, file.key)}
                              />
                            </>
                          )}
                        </div>
                      )
                  )}
                </div>
              )}
              {files && files.length > 0 && (
                <div className='flex flex-column w-full gap-2 overflow-auto'>
                  {Array.from(files).map((file, index) => (
                    <div
                      key={index}
                      className='file-preview flex justify-content-between align-items-center'>
                      {file.type.startsWith('image/') && (
                        <>
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width='100'
                            height='100'
                            preview
                            className='preview-image'
                          />
                          <div
                            className='text-left overflow-hidden whitespace-nowrap overflow-ellipsis'
                            style={{ width: '250px' }}>
                            <p>{file.name}</p>
                          </div>
                          <Button
                            icon='pi pi-times'
                            className='p-button-rounded p-button-danger p-button-text'
                            onClick={(e) => handleRemoveFile(e, file.name)}
                          />
                        </>
                      )}
                      {file.type.startsWith('video/') && (
                        <>
                          <video
                            controls
                            controlsList='nodownload'
                            className='preview-video'
                            width='100'
                            height='100'>
                            <source
                              src={URL.createObjectURL(file)}
                              type={file.type}
                            />
                          </video>
                          <Button
                            icon='pi pi-times'
                            className='p-button-rounded p-button-danger p-button-text'
                            style={{
                              top: '2px',
                              right: '2px',
                              width: '20px',
                              height: '20px',
                              fontSize: '10px',
                            }}
                            onClick={(e) => handleRemoveFile(e, file.name)}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);
