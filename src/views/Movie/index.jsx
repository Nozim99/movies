import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { StarIcon } from "../../components/Icons";
import mainFetch from "../../utils/mainFetch";
import MLoading from "../../components/MLoading";
import CComment from "./components/CComment";
import cls from "./style.module.css";
import { Fragment } from "react";

const MoviePage = () => {
  const { movieId } = useParams();

  const { data, isLoading } = useQuery(
    `movie-${movieId}`,
    () => mainFetch(`/movie/${movieId}`)
      .then(response => response.json())
      .then(response => ({
        image: response?.poster_path ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${response.poster_path}` : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
        title: response?.title,
        country: response?.origin_country,
        description: response?.overview,
        budget: response?.budget,
        genres: response?.genres?.map(item => item?.name),
        date: response?.release_date,
        year: response?.release_date?.split("-")[0]
      })
      )
  )

  const { data: reviewData } = useQuery(
    `review-${movieId}`,
    () => mainFetch(`/movie/${movieId}/reviews`)
      .then(response => response.json())
      .then(response => response?.results?.map(item => ({
        name: item?.author,
        avatar: item?.author_details?.avatar_path ? `https://media.themoviedb.org/t/p/w100_and_h100_bestv2/${item.author_details.avatar_path}` : null,
        rating: item?.author_details?.rating,
        content: item?.content,
        date: item?.created_at
      })))
  )

  if (isLoading) return <MLoading />

  return (
    <main className={cls.main}>
      <div className={cls.section}>
        <img width="300" height="450" src={data?.image} alt={data?.title} />
        <div>
          <h1>{data?.title}</h1>
          <div className={cls.infoBox}>
            <span className={cls.year}>
              {data?.year}
            </span>
            {
              data?.genres?.map((item, index) => (
                <span key={index}>{item}{data.genres.length - 1 !== index && ", "}</span>
              ))
            }
          </div>
          <div className={cls.countryBox}>
            <p>Country:</p>
            <p>{data?.country?.map((item, index) => (
              <Fragment key={index}>
                {item}{data.country.length - 1 !== index && ","}
              </Fragment>
            ))}</p>
          </div>
          <h2 className={cls.overview}>Overview</h2>
          <p>
            {data?.description}
          </p>
          <div className={cls.budget}>
            <span>Budget: </span>
            <span>{Number(data?.budget).toLocaleString().replaceAll(",", " ")} $</span>
          </div>
        </div>
      </div>

      {
        reviewData?.length &&
        <>
          <h2 className={cls.commentTitle}>Comments</h2>
          <div>
            {
              reviewData.map((item, index) => (
                <div key={index} className={cls.reviewBox}>
                  <div className={cls.userBox}>
                    <img
                      width="100"
                      height="100"
                      className={cls.image}
                      src={
                        item?.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                      }
                      alt={item?.title} />
                    <div>
                      <div className={cls.userName}>{item?.name}</div>
                      <div className={cls.ratingBox}>
                        <StarIcon />
                        <span className={cls.rating}>{item?.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CComment comment={item?.content} />
                </div>
              ))
            }
          </div>
        </>
      }
    </main>
  )
}

export default MoviePage;