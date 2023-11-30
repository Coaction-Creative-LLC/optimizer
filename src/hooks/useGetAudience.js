import axios from 'axios';
import { useQuery } from 'react-query';

const fetchAudience = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/audiences');
  return response.data;
};

const useGetAudience = () => {
  return useQuery('getAudienceList', fetchAudience);
};

export default useGetAudience;
