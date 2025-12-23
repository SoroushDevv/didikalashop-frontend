import CommentBox from "../../../../Components/CommentBox/CommentBox";
import Loader from "../../../../Components/Loader/Loader";
import useUserComments from "../../../../Hooks/useUserComments";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";

export default function UserComments() {
  const { userComments, loading, error } = useUserComments();

  if (loading)
    return <Loader/>;
  if (error)
    return <p className="text-center text-red-500">خطا در بارگذاری: {error}</p>;

  return (
    <div className="w-full flex flex-col gap-4 font-sans py-6">
      <div className="w-full text-right mb-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-brand-primary pb-2">
          نقد و نظرات
        </h2>
      </div>

      <>
        {userComments.length ? (
          userComments.map((comment, index) => (
            <div
              key={index}
              className="w-full sm:w-[320px] md:w-[360px] bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 flex flex-col gap-3">
                {comment.image && (
                  <img
                    src={comment.image}
                    alt="comment"
                    className="w-24 max-h-[200px] object-cover rounded-lg mb-2"
                  />
                )}

                <div className="text-gray-700 text-sm leading-6 whitespace-pre-line">
                  <CommentBox comment={comment} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <ErrorMessage msg="کامنتی یافت نشد" />
        )}
      </>
    </div>
  );
}
