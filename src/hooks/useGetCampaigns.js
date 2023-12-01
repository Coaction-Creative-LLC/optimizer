import axios from 'axios';
import { useQuery } from 'react-query';

const getCampaigns = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns');
  return response.data;
};

const useGetCampaigns = () => {
  return useQuery('getCampaignsList', getCampaigns);
};

export default useGetCampaigns;
