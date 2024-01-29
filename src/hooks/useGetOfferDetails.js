// import { useQuery } from 'react-query';

// const useGetOfferDetails = () => {
//   const getOfferDetails = async (offerId) => {
//     const result = await fetch(`https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/getOfferDetail/${offerId}`);
//     const offerDetails = await result.json();
//     return offerDetails;
//   };

//   return {
//     getOfferDetails: (offerId) => getOfferDetails(offerId),
//     useOfferDetailsQuery: (offerId) => {
//       return useQuery(['offerDetails', offerId], () => getOfferDetails(offerId), {
//         enabled: false,
//       });
//     },
//   };
// };

// export default useGetOfferDetails;
import { useQuery } from "react-query";
import axios from "axios";

const getOffersDetails = async (offerId) => {
  const response = await axios.get(
    `https://developmentalsite-9a1468bb97a5.herokuapp.com/campaigns/getOfferDetail/${offerId}`
  );
  return response.data;
};

const useGetOffersDetails = (offerId) => {
  return useQuery(["getOffersList", offerId], () => getOffersDetails(offerId));
};

export default useGetOffersDetails;

