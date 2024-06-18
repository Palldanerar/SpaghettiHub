import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";
import { Link } from "react-router-dom";

const myCodes = () => {

  interface MyCodesItem {
    fullCode: {
      html: string,
      css: string,
      javascript: string
    },
    _id: string,
    title: string,
    ownerInfo: Object,
  }

  //@ts-ignore
  const { data: myCodes } = useGetMyCodesQuery();

  return myCodes?.length !== 0 ? (
    <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {myCodes?.map((item: MyCodesItem) => {
        return <CodeItem title={item.title} _id={item._id} owner={item.ownerInfo} />;
      })}
    </div>
  ) : (
    <>
      <p className="text-center font-mono text-slate-600 p-3">
        У Вас нет сохранённых сниппетов. <Link to="/editor">Создайте первый сниппет</Link>
      </p>
    </>
  );
}

export default myCodes;