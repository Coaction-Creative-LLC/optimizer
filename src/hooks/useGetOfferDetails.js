import { useQuery } from "react-query";
import axios from "axios";

const getOffersDetails = async (offerId) => {
  debugger;
  const response = await axios.get(
    `https://developmentalsite-9a1468bb97a5.herokuapp.com/offers/get-offer/${offerId}`
  );
  return response.data;
};

const useGetOffersDetails = (offerId) => {
  return useQuery(["getOffersList", offerId], () => getOffersDetails(offerId));
};

export default useGetOffersDetails;

