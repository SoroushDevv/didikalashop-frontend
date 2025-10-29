import "./UserComments.css"
import CommentBox from "../../../../Components/CommentBox/CommentBox";
import useUserComments from "../../../../Hooks/useUserComments";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";



export default function UserComments() {
const {  userComments, loading, error } = useUserComments();

return (
 <div className="comments-container">
  <div className="comments-section-title">
    <h2>نقد و نظرات</h2>
  </div>

  <div className="comments-wrapper">
    {userComments.length ? (
      userComments.map((comment, index) => (
        <CommentBox key={index} comment={comment} />
      ))
    ) : (
      <ErrorMessage msg={"کامنتی یافت نشد"} />
    )}
  </div>
</div>

  );
}
