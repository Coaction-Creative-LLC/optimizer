// useAddAdvertiser.js
import { useMutation } from 'react-query';
import axios from 'axios';

const create = async (data) => {
  const response = await axios.post('https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/create', data); // Replace with your API endpoint
  return response.data;
};

const useCreateCampaign = () => {
  const mutation = useMutation(create);

  const createCampaign = async (formData) => {
    try {
      const result = await mutation.mutateAsync(formData);
      return result;
    } catch (error) {
      // Handle error or return an error object if needed
      console.error('Error adding Campaign:', error.message);
      throw error;
    }
  };

  return {
    createCampaign,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useCreateCampaign;
