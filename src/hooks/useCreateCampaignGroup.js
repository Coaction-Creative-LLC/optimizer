// useAddAdvertiser.js
import { useMutation } from 'react-query';
import axios from 'axios';

const createGroup = async (data) => {
  const response = await axios.post(`https://developmentalsite-9a1468bb97a5.herokuapp.com/audiences/`, data);
  return response.data;
};

const useCreateCampaignManually = () => {
  const mutation = useMutation(createGroup);

  const createCampaignGroup = async (formData) => {
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
    createCampaignGroup,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useCreateCampaignManually;
