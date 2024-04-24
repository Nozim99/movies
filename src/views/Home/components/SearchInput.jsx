import { memo } from "react";
import cls from "../style.module.css";
import useDebounce from "../../../hooks/useDebounce";
import { SearchIcon } from "../../../components/Icons";

const SearchInput = ({ inputChangeHandler }) => {

  // 700 milliseconds after entering a value into the input, the function will be executed
  const searchMovie = useDebounce((e) => {
    inputChangeHandler(e);
  }, 700);

  return (
    <div >
      <div className={cls.searchContainer}>
        <input onChange={searchMovie} className={cls.input} type="text" placeholder="Search..." />
        <div className={cls.search}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}

export default memo(SearchInput);