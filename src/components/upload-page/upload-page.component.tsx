import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { imagesSelectors } from '../../store/images/images.selectors';
import { imagesActions } from '../../store/images/images.slice';
import { usePrevious } from '../../hooks/previous.hook';
import { Loader } from '../loader/loader.component';
import { Message } from '../message/message.component';
import styles from './upload-page.module.css';
import { ImageInput } from '../image-input/image-input.component';

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

  useEffect(
    () => () => {
      dispatch(imagesActions.resetUpload());
    },
    [dispatch]
  );

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
      {error && (
        <div className={styles.error}>
          <Message isError>{error}</Message>
        </div>
      )}

      <ImageInput onChange={handleChange} />
    </>
  );
};
