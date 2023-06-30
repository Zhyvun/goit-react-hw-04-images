import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // https://www.npmjs.com/package/react-toastify
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { getImage } from '../UI/api';
import { toastConfig } from '../UI/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBox, ModalImage } from './App.styled';

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
    const { searchQuery, page } = this.state; //дістаємо значення шо зараз є в поточному стані

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      if (searchQuery.trim() === '') {
        toast.error('ШО? ПРОБІЛ ЗАЛІП ? ....Почисть клаву 😜', toastConfig);
        return;
      }
      this.setState({ loading: true }); // якщо не дорівнює (змінилось) дозволяємо пошук
      getImage(searchQuery, page) // шукаємо і передаємо нові значення
        .then(({ hits: newHits, totalHits }) => {
          if (this.state.searchQuery.trim() === '' || totalHits === 0) {
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
          this.setState(prevState => ({
            hits: [...prevState.hits, ...filteredNewHits],
            totalHits,
          }));
        })

        // Ловимо помилку
        .catch(error => {
          console.error(error.response);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  //Підтвердження форми пошуку
  hendleSearchFormSubmit = searchValue => {
    this.setState({
      searchQuery: searchValue,
      page: 1,
      hits: [],
      totalHits: 0,
    });
  };

  //функція додавання результатів
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // метод для відкриття/закриття модального вікна
  toggleModal = (largeImageURL = '') => {
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { loading, hits, largeImageURL, totalHits } = this.state;
    const showLoadMoreBtn = !loading && hits.length !== totalHits;

    return (
      <AppBox>
        <Searchbar onSearchSubmit={this.hendleSearchFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery images={hits} handleImageClick={this.toggleModal} />
        )}
        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore} disabled={loading} />
        )}
        {loading && <Loader />}
        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
        <ToastContainer />
      </AppBox>
    );
  }
}
