import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './image-input.module.css';

interface ImageInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => (
  <>
    <label className={styles.label} htmlFor="upload">
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </div>

      <div className={styles.copy}>Click here to upload an image</div>
    </label>

    <input
      className={styles.input}
      type="file"
      id="upload"
      name="image"
      onChange={onChange}
    />
  </>
);
