import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export default function FavoritesMobile() {
  return (
    <div className="flex flex-col items-center justify-start w-full px-4 md:px-8 py-6 gap-6 text-center font-sans">
      <div className="w-full text-right mb-4">
        <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
         علاقه مندی ها
        </h2>
      </div>
      <p className="text-gray-600 text-base md:text-lg m-0">
        <ErrorMessage msg="هنوز چیزی را به علاقه‌مندی خودتان اضافه نکردید" />
      </p>

      <a
        href="/"
        className="inline-block px-6 py-2.5 bg-blue-500 text-white rounded-lg font-semibold transition-colors duration-300 hover:bg-blue-700 text-sm md:text-base"
      >
        خانه
      </a>
    </div>
  );
}
