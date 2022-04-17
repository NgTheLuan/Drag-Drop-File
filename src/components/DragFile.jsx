import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FileConfig } from "../config/FileConfig.jsx";
import uploadFile from "../assets/images/cloud-upload-regular-240.png";

function DragFile(props) {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.add("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updateList = [...fileList, newFile];
      setFileList(updateList);
      props.onFileChange(updateList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <React.Fragment>
      <div
        className="drop-file-input"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadFile} alt="" />
          <p>Drag or Drop your file here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>

      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  FileConfig[item.type.split("/")[1]] || FileConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
}

DragFile.propTypes = {
  onFileChange: PropTypes.func,
};

export default DragFile;
