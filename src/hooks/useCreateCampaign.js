// useAddAdvertiser.js
import { useMutation } from 'react-query';
import axios from 'axios';

const create = async (data) => {
  let response;
  if (data._id === "") {
    delete(data._id);
    // If data._id is present, perform a PUT request
    response = await axios.post(`https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/create`, data);
  } else {
    // If data._id is not present, perform a POST request
    response = await axios.put(`https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/${data._id}`, data);
  }
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
