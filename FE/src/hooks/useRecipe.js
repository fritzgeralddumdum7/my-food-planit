import API from '@/api/BaseApi';
import { useEffect, useState } from 'react';
import { useModalDispatch } from '@/contexts/ModalContextProvider';
import { showNotification } from '@mantine/notifications';

const useRecipe = () => {
  const [intervalId, setIntervalId] = useState();
  const [isDone, setIsDone] = useState(false);
  const modalDispatch = useModalDispatch();

  const setJobMatchIngr = (ingredientsList) => {
    return API.request({
      method: 'GET',
      url: `/scraper/match-ingredient`,
      params: {
        ingrs: ingredientsList,
      },
    });
  };

  const addJobSearchIngr = (keyword) => {
    return API.request({
      method: 'POST',
      url: `/analysis/add-job-ingredient-search`,
      data: {
        ingredient: keyword,
      },
    });
  };

  const getJobSearchedIngr = async (id) => {
    return await API.request({
      method: 'GET',
      url: `/analysis/get-job-ingredient-search/${id}`,
    });
  };

  const fetchIngredientData = async (id) => {
    return await API.request({
      method: 'GET',
      url: `/scraper/show/${id}`,
    }).catch(({ response }) => {
      setIsDone(true);
      modalDispatch({ type: 'hideSpinner' });
      showNotification({ color: 'red', message: response.data.message });
    });
  };

  const startFetch = (id, fetch, callback) => {
    setIsDone(false);
    clearInterval(intervalId);

    const fetchInterval = setInterval(async () => {
      // const res = await fetchIngredientData(id);
      const res = await fetch(id);
      if (res?.data.is_job_done) {
        setIsDone(true);
        clearInterval(intervalId);
        callback(res);
      }
    }, 1000);

    setIntervalId(fetchInterval);
  };

  const matchIngredient = async (ingredientsList, callback) => {
    const job = await setJobMatchIngr(ingredientsList);
    return startFetch(job.data.id, fetchIngredientData, callback);
  };

  const searchIngredent = async (keyword, callback) => {
    const job = await addJobSearchIngr(keyword);
    return startFetch(job.data.id, getJobSearchedIngr, callback);
  };

  useEffect(() => intervalId && clearInterval(intervalId), [isDone]);

  return { matchIngredient, searchIngredent };
};

export default useRecipe;
