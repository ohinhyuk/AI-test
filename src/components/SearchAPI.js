import axios from "axios";

/**
 * @brief 구글 검색 API를 사용하여 검색어에 대한 검색 결과를 반환하는 함수
 */
export const SearchAPI = async (searchWord) => {
  const response = await axios.get(
    `https://customsearch.googleapis.com/customsearch/v1?cx=${process.env.REACT_APP_SEARCH_ENGINE_ID}&q=${searchWord}&key=${process.env.REACT_APP_SEARCH_ENGINE_API_KEY}`
  );
  return response.data;
};
