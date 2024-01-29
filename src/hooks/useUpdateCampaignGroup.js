// useUpdateCampaignGroup.js
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateGroup = async (data) => {
  const response = await axios.put(`https://developmentalsite-9a1468bb97a5.herokuapp.com/audiences/`, data);
  return response.data;
};

const useUpdateCampaignGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateGroup, {
    onSuccess: () => {
      // Invalidate the query after successful mutation
      queryClient.invalidateQueries('getAudienceList'); // Replace 'yourQueryKey' with the actual key of the query you want to invalidate
    },
  });
  
  const updateCampaignGroup = async (formData) => {
    try {
      const result = await mutation.mutateAsync(formData);
      return result;
    } catch (error) {
      // Handle error or return an error object if needed
      console.error('Error updating Campaign Group:', error.message);
      throw error;
    }
  };

  return {
    updateCampaignGroup,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useUpdateCampaignGroup;
