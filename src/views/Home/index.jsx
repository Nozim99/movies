import { useCallback, useState } from "react";
import mainFetch from "../../utils/mainFetch";
import { useQuery, useQueryClient } from "react-query";
import { Card } from "antd";
import cls from "./style.module.css";
import useMainStore from "../../hooks/useMainStore";
import CLoading from "./components/CLoading";
import MLoading from "../../components/MLoading";
import SearchInput from "./components/SearchInput";
import { useNavigate, } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState();

  // custom zustand store
  const {
    page,  // API related current page. type number
    increment,  // function that increments the page value
  } = useMainStore();

  // stores the list of previous movies by one when the value of page is incremented by one
  const cacheData = useQueryClient().getQueryData(["movies", page - 1, searchName]);

  // the url used to search for movies and the url used to get the list of popular movies are different. so 2 different urls are used
  const movieUrl = searchName ? `/search/movie?page=${page}&query=${searchName.replaceAll(" ", "+")}` : `/movie/popular?page=${page}`;

  // Send a request via react-query
  const { data, isFetching, isLoading } = useQuery(

    // the key value of the query response
    ["movies", page, searchName],

    () => mainFetch(movieUrl).then(response => response.json()).then(response => {

      // to modify an incoming request. to use the data directly in JSX
      let transformedData = null;

      // only the necessary information of the movie is saved
      const movies = response?.results?.map(item => ({
        id: item?.id,
        image: item?.poster_path
          ? `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`  // Only the endpoint part of the picture comes
          : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
        title: item?.title,
        vote_average: Math.round(item?.vote_average * 10),  // Values range from 0 to 10, multiplied by 10 to convert to a percentage
        date: item?.release_date,
      }))

      if (page === 1) {
        transformedData = {
          ...response,
          results: movies,
        }
      }

      // If the value of page is not equal to 1, the new movies list will be added to the old movies list.
      else {
        transformedData = {
          ...response,
          results: [
            ...cacheData?.results,
            ...movies.filter(movie => !cacheData?.results?.some(item => item.id === movie.id)),  // movies id value may be duplicated, API bug to avoid this
          ]
        }
      }

      return transformedData;
    }),
    {
      initialData: {
        page: 1,
        total_pages: 1,
        total_results: 0,
        results: []
      }
    }
  )

  // If the request is pending, the list of old saved movies will be returned
  const moviesData = isFetching ? cacheData : data;

  // If you go to the end of the page on the site, the 20 movies on the next page will be added to the list of movies
  const incrementPage = useCallback(() => {
    increment();
  }, [isFetching]);

  // for the input onchange function of search movie name
  const inputChangeHandler = useCallback((e) => {
    setSearchName(e.target.value);
  }, [])


  return (
    <main>
      <SearchInput inputChangeHandler={inputChangeHandler} />

      {/* loading is visible when the status is pening when the request is sent for the first time */}
      {isLoading && <div className="relative"><MLoading /></div>}

      <div className={cls.cards}>
        {
          moviesData?.results?.map(item => (
            <Card
              onClick={() => navigate(`/movie/${item.id}`)}
              key={item?.id}
              hoverable
              style={{
                width: "220px",
                height: "330px",
                margin: "0 auto"
              }}
              cover={<img loading="lazy" alt="example" width="220" height="330" src={item?.image} />}
            >
              <Card.Meta title={item?.title} description={item?.date} />
            </Card>
          ))
        }
      </div>

      {/* If this component is visible on the page, the value of page is incremented by 1 */}
      {data?.page < data?.total_pages && <CLoading incrementPage={incrementPage} />}
    </main>
  )
}

export default Home;