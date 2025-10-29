
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import "./UserFavorites.css"

export default function EmptyFavorites() {
  return (
  <div className="favorites-empty">
  <p className="favorites-empty__message">

    <ErrorMessage msg={"هنوز چیزی را به علاقه‌مندی خودتان اضافه نکردید"}/>
  </p>

  <a href="/" className="favorites-empty__button">
    خانه
  </a>
</div>

  );
}
