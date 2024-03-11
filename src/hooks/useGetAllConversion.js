import axios from 'axios';
import { useQuery } from 'react-query';

const getAllConversionsList = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/conversion-tracking/get-all');
  return response.data;
};

const useGetConversions = () => {
  return useQuery('getAllConversionsList', getAllConversionsList);
};

export default useGetConversions;
