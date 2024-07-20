import { useDispatch } from "react-redux";
import css from "./CalendarItem.module.css";

const CalendarItem = ({ date, waterPart }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    // запрос на бекенд

    dispatch();
  };
  return (
    <>
      <button onClick={handleClick} className={css.btn}>
        {date}
      </button>
      <p className={css.p}>{waterPart}</p>
    </>
  );
};

export default CalendarItem;
