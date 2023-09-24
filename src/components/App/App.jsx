import Searchbar from 'components/Searchbar';
import { Grid } from './App.styled';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import getImages from '../../helper/api';

const { useState, useEffect, useRef } = require('react');

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [error, setError] = useState(null);
  const [isVisibleButton, setIsVisibleButton] = useState(true);
  const [largeImageURL, setLargeImageURL] = useState('');

  const isFirstRender = useRef(0);

  const onSubmit = q => {
    if (q === query) return;

    setImages([]);
    setQuery(q);
    setPage(1);
  };

  useEffect(() => {
    if (isFirstRender.current < 2) {
      isFirstRender.current += 1;
      return;
    }
    getPhotos(query, page);
  }, [query, page]);

  const getPhotos = async (query, page) => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = (await getImages(query, page)).data;
      if (hits.length === 0) {
        return alert(`We dont find ${query}`);
      }

      setImages(prev => [...prev, ...hits]);
      setIsVisibleButton(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = largeImageURL => {
    setIsVisibleModal(prev => !prev);
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      <Grid>
        <Searchbar onSubmit={onSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={toggleModal} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {images.length > 0 &&
          isVisibleButton &&
          (isLoading ? <Loader /> : <Button onClick={handleLoadMore} />)}
      </Grid>
      {isVisibleModal && (
        <Modal src={largeImageURL} toggleModal={toggleModal} />
      )}
    </>
  );
};

export default App;
