import config from "./config.js";

const request = async (url) => {
  try {
    const result = await fetch(url); // 일종의 패턴. fetch 결과가 나올 때까지 기다린다
    console.log('async await', result.status);
    if (result.status === 200) {
      return result.json();
    } else {
      throw config.REQUEST_ERROR[result.status];
    }
  } catch (error) {
    alert(error.msg);
    return {data: null}
  }
}
const api = {
  fetchCats: keyword => {
    return request(`${config.API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword, limit) => {
    return request(`${config.API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${config.API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${config.API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${config.API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;