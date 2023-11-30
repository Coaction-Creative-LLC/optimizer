// useAddAdvertiser.js
import { useMutation } from 'react-query';
import axios from 'axios';

const create = async (data) => {
  const response = await axios.post('https://developmentalsite-9a1468bb97a5.herokuapp.com/offers/create', data); // Replace with your API endpoint
  return response.data;
};

const useCreateOffer = () => {
  const mutation = useMutation(create);

  const createOffer = async (formData) => {
    try {
      const result = await mutation.mutateAsync(formData);
      return result;
    } catch (error) {
      // Handle error or return an error object if needed
      console.error('Error adding Offer:', error.message);
      throw error;
    }
  };

  return {
    createOffer,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useCreateOffer;
