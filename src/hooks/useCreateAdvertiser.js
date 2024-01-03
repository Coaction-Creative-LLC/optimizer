// useAddAdvertiser.js
import { useMutation } from 'react-query';
import axios from 'axios';

const postAdvertiser = async (data) => {
  const response = await axios.post('https://developmentalsite-9a1468bb97a5.herokuapp.com/advertisers/create', data); // Replace with your API endpoint
  return response.data;
};

const useAddAdvertiser = () => {
  const mutation = useMutation(postAdvertiser);

  const addAdvertiser = async (formData) => {
    try {
      const result = await mutation.mutateAsync(formData);
      return result;
    } catch (error) {
      // Handle error or return an error object if needed
      console.error('Error adding advertiser:', error.message);
      throw error;
    }
  };

  return {
    addAdvertiser,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useAddAdvertiser;
