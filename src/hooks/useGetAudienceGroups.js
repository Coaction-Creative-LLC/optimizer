import axios from 'axios';
import { useQuery } from 'react-query';

const fetchAudienceGroups = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/groups');
  return response.data;
};

const useGetAudienceGroups = () => {
  return useQuery('getAudienceGroupsList', fetchAudienceGroups);
};

export default useGetAudienceGroups;
