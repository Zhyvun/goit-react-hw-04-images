// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // https://www.npmjs.com/package/react-toastify
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'UI/api';
import { toastConfig } from 'UI/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBox, ModalImage } from './App.styled';

export const App = () => {
  const [largeImageURL, setlargeImageURL] = useState('');
  const [searchQuery, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    //задаємо параметри пошуку та номер сторінки
    if (!searchQuery) return; //дістаємо значення шо зараз є в поточному стані

    getImage(searchQuery, page) // шукаємо і передаємо нові значення
      .then(({ hits: newHits, totalHits }) => {
        if (newHits.length === 0 && newHits.length === totalHits) {
          toast.error(
            'Нашкрябай щось путнє 🙄... бо нічого НИМА 😲',
            toastConfig
          ); //перевірка на валідність запиту
          return;
        }
        if (
          newHits.length < 12 ||
          (newHits.length !== 0 && newHits.length < 12)
        ) {
          toast.info('Все! Мультікі закінчились 😉', toastConfig); // перевірка на наявність нових зображень, якщо прийло менше 12 - фініш
        }

        // Вибираєм з масива об'єкта тільки ті властивості, які використовуємо
        const filteredNewHits = newHits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        // Виводимо нові сторінки із зображеннями що у запиті
        setImages(prevHits => [...prevHits, ...filteredNewHits]);
        setTotalImages(totalHits);
      })
      // Ловимо помилку
      .catch(error => {
        console.error(error.response);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  //Підтвердження форми пошуку
  const hendleSearchFormSubmit = searchValue => {
    setQuery(searchValue);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  //функція додавання результатів
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // метод для відкриття/закриття модального вікна
  const toggleModal = (link = '') => setlargeImageURL(link);

  // Відображення наступного масиву сторінок
  const showLoadMoreBtn = !loading && images.length !== totalImages;

  return (
    <AppBox>
      <Searchbar onSearchSubmit={hendleSearchFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handleImageClick={toggleModal} />
      )}
      {showLoadMoreBtn && (
        <Button onClick={handleLoadMore} disabled={loading} />
      )}
      {loading && <Loader />}
      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} />
        </Modal>
      )}
      <ToastContainer />
    </AppBox>
  );
};

/* CLASS
export class App extends Component {
  state = {
    largeImageURL: '',
    searchQuery: '',
    page: 1,
    hits: [],
    loading: false,
    totalHits: 0,
  };

  //задаємо параметри пошуку та номер сторінки
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = state; //дістаємо значення шо зараз є в поточному стані

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      // if (searchQuery.trim() === '') {
      //   toast.error('ШО? ПРОБІЛ ЗАЛІП ? ....Почисть клаву 😜', toastConfig);
      //   return;
      // }
      setState({ loading: true }); // якщо не дорівнює (змінилось) дозволяємо пошук
      getImage(searchQuery, page) // шукаємо і передаємо нові значення
        .then(({ hits: newHits, totalHits }) => {
          if (state.searchQuery.trim() === '' || totalHits === 0) {
            toast.error(
              'Нашкрябай щось путнє 🙄... бо нічого НИМА 😲',
              toastConfig
            ); //перевірка на валідність запиту
            return;
          }
          if (
            (prevState.hits.length === 0 && newHits.length === totalHits) ||
            (prevState.hits.length !== 0 && newHits.length < 12)
          ) {
            toast.info('Все! Мультікі закінчились 😉', toastConfig); // перевірка на наявність нових зображень, якщо прийло менше 12 - фініш
          }
          // Вибираєм з масива об'єкта тільки ті властивості, які використовуємо
          const filteredNewHits = newHits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          // Виводимо нові сторінки із зображеннями що у запиті
          setState(prevState => ({
            hits: [...prevState.hits, ...filteredNewHits],
            totalHits,
          }));
        })

        // Ловимо помилку
        .catch(error => {
          console.error(error.response);
        })
        .finally(() => {
          setState({ loading: false });
        });
    }
  }

  //Підтвердження форми пошуку
  hendleSearchFormSubmit = searchValue => {
    setState({
      searchQuery: searchValue,
      page: 1,
      hits: [],
      totalHits: 0,
    });
  };

  //функція додавання результатів
  handleLoadMore = () => {
    setState(prevState => ({ page: prevState.page + 1 }));
  };

  // метод для відкриття/закриття модального вікна
  toggleModal = (largeImageURL = '') => {
    setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { loading, hits, largeImageURL, totalHits } = state;
    const showLoadMoreBtn = !loading && hits.length !== totalHits;

    return (
      <AppBox>
        <Searchbar onSearchSubmit={hendleSearchFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery images={hits} handleImageClick={toggleModal} />
        )}
        {showLoadMoreBtn && (
          <Button onClick={handleLoadMore} disabled={loading} />
        )}
        {loading && <Loader />}
        {largeImageURL && (
          <Modal onClose={toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
        <ToastContainer />
      </AppBox>
    );
  }
}
*/
