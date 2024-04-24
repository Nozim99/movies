const mainUrl = "https://api.themoviedb.org/3";
const apiKey = "9185594e1568a02fbc6e7fb15d0f32db";

const getUrl = (endpoint) => {
  if (endpoint.includes(`api_key=${apiKey}`)) return mainUrl + endpoint;

  if (endpoint.includes("?")) return `${mainUrl}${endpoint}&api_key=${apiKey}`

  return `${mainUrl}${endpoint}?api_key=${apiKey}`
}

const mainFetch = (endpoint, method = "GET") => {
  const url = getUrl(endpoint);

  return fetch(
    url,
    {
      method,
      headers: {
        accept: 'application/json',
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTg1NTk0ZTE1NjhhMDJmYmM2ZTdmYjE1ZDBmMzJkYiIsInN1YiI6IjY2MjczNWMyY2I2ZGI1MDE4NmIxYjdmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.taBLtoyKn23RqygccTACshR7FKKJug2WTGPxJUy5m1Y'
      }
    }
  )
}

export default mainFetch;