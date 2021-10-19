import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { imagesSelectors } from '../../store/images/images.selectors';
import { imagesActions } from '../../store/images/images.slice';
import { usePrevious } from '../../hooks/previous.hook';
import { Loader } from '../loader/loader.component';
import styles from './upload-page.module.css';

export const UploadPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uploading = useSelector(imagesSelectors.getUploading);
  const error = useSelector(imagesSelectors.getUploadError);
  const previousUploading = usePrevious(uploading);

  useEffect(() => {
    const uploadSuccess = previousUploading && !uploading && !error;

    if (uploadSuccess) {
      history.push('/');
    }
  }, [previousUploading, uploading, error, history]);

  if (uploading) {
    return <Loader />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    if (image) {
      dispatch(imagesActions.addImage(image));
    }
  };

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}

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
        onChange={handleChange}
      />
    </>
  );
};
