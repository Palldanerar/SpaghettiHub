import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const CodeRender = () => {
  const fullCode = useSelector((state: RootState) => state.CodeSlices.fullCode);

  const combinedCode = `
  <html>
    <style>
      ${fullCode.css}
    </style>
    <body>
      ${fullCode.html}
    </body>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/babel-standalone@6/babel.js"></script>
    <script type="text/babel">
      ${fullCode.javascript}
    </script>
  </html>`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white h-[calc(100dvh-60px)]">
      <iframe className="w-full h-full" src={iframeCode} />
    </div>
  );
}

export default CodeRender