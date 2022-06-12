import React from 'react';
import { useForm } from 'react-hook-form';
import { cities, categories } from '../../GuideData/data';

const OffersFilter = ({ offers, setFilteredOffers }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    let filteredLocationCategorySearch = [];
    let filteredSearchLocation = [];
    let filteredSearchCategory = [];
    let filteredLocationCategory = [];
    const resetInput = () =>
      reset({
        search: '',
        location: '',
        category: '',
      });

    const filteredTitle = offers.filter(
      (offer) =>
        (data.search.length &&
          offer.title.toLowerCase().includes(data.search.toLowerCase())) ||
        (data.search.length &&
          offer.company.name.toLowerCase() === data.search.toLowerCase())
    );

    const filteredLocation = offers.filter(
      (offer) =>
        data.location.length &&
        offer.location.toLowerCase().includes(data.location.toLowerCase())
    );

    const filteredCategory = offers.filter(
      (offer) =>
        data.category.length &&
        offer.category.toLowerCase().includes(data.category.toLowerCase())
    );

    if (data.location.length && data.category.length && data.search.location) {
      filteredLocationCategorySearch = filteredSearchLocation.filter(
        (offer) => offer.category.toLowerCase() === data.category.toLowerCase()
      );
      if (filteredLocationCategorySearch.length) {
        setFilteredOffers(filteredLocationCategorySearch);
        resetInput();
      } else {
        alert('Ninguna oferta coincide con los criterios de búsqueda');
        setFilteredOffers([]);
        resetInput();
      }
    } else if (data.search.length && data.location.length) {
      filteredSearchLocation = filteredTitle.filter(
        (offer) => offer.location.toLowerCase() === data.location.toLowerCase()
      );
      if (filteredSearchLocation.length) {
        setFilteredOffers(filteredSearchLocation);
        resetInput();
      } else {
        alert('Ninguna oferta coincide con los criterios de búsqueda');
        setFilteredOffers([]);
        resetInput();
      }
    } else if (data.search.length && data.category.length) {
      filteredSearchCategory = filteredTitle.filter(
        (offer) => offer.category.toLowerCase() === data.category.toLowerCase()
      );
      if (filteredSearchCategory.length) {
        setFilteredOffers(filteredSearchCategory);
        resetInput();
      } else {
        alert('Ninguna oferta coincide con los criterios de búsqueda');
        setFilteredOffers([]);
        resetInput();
      }
    } else if (data.location.length && data.category.length) {
      filteredLocationCategory = filteredLocation.filter(
        (offer) => offer.category.toLowerCase() === data.category.toLowerCase()
      );
      if (filteredLocationCategory.length) {
        setFilteredOffers(filteredLocationCategory);
        resetInput();
      } else {
        alert('Ninguna oferta coincide con los criterios de búsqueda');
        setFilteredOffers([]);
        resetInput();
      }
    } else if (filteredTitle.length) {
      setFilteredOffers(filteredTitle);
      resetInput();
    } else if (filteredLocation.length) {
      setFilteredOffers(filteredLocation);
      resetInput();
    } else if (filteredCategory.length) {
      setFilteredOffers(filteredCategory);
      resetInput();
    } else {
      alert('Ninguna oferta coincide con los criterios de búsqueda');
      setFilteredOffers([]);
      resetInput();
    }
  };

  return (
    <>
      <form className='main-filter' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='filter'
          type='text'
          name='search'
          placeholder='Nombre de la oferta o empresa'
          {...register('search')}
        />
        <select className='filter' name='location' {...register('location')}>
          <option value='' selected>
            Filtrar por localización
          </option>
          {cities.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select className='filter' name='category' {...register('category')}>
          <option value='' selected>
            Filtrar por categoría
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className='filter-btn'>Aplicar filtro</button>
      </form>
      <button className='filter-btn' onClick={() => setFilteredOffers([])}>
        Resetear filtro
      </button>
    </>
  );
};

export default OffersFilter;
