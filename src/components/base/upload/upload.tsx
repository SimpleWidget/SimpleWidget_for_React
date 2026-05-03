import React, { useRef, useState } from 'react';
import './upload.scss';

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  limit?: number;
  onChange?: (files: FileList) => void;
}

const SUpload: React.FC<UploadProps> = ({
  accept = '*',
  multiple = false,
  limit = 3,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<string[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onChange?.(files);
      const newUrls: string[] = [];
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        newUrls.push(url);
      });
      setFileList([...fileList, ...newUrls]);
    }
  };

  const handleRemove = (index: number) => {
    const newList = [...fileList];
    newList.splice(index, 1);
    setFileList(newList);
  };

  return (
    <div className="sw-upload">
      <input
        ref={inputRef}
        type="file"
        className="sw-upload__input"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <div className="sw-upload__trigger" onClick={handleClick}>
        <span className="sw-upload__icon">+</span>
      </div>
      <span className="sw-upload__tip">点击上传</span>
      {fileList.length > 0 && (
        <div className="sw-upload__list">
          {fileList.map((url, index) => (
            <div key={index} className="sw-upload__item">
              <img src={url} alt="" />
              <span className="sw-upload__remove" onClick={() => handleRemove(index)}>✕</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SUpload;