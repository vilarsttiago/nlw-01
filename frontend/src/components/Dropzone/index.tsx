import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiArrowDown } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileLoaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileLoaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {

    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileLoaded(file);

    console.log(acceptedFiles);
  }, [onFileLoaded]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl 
        ? <img src={selectedFileUrl} alt="Imagem Carregada"/> 
        :(
          isDragActive ?
            <p>
              <FiArrowDown />
              Solte a imagem aqui ...
            </p> :
            <p>
              <FiUpload />
              Imagem do estabelecimento
            </p>
         )
      }
    </div>
  );
}

export default Dropzone;



