import useSpreadsheet from "../hooks/useSpreadsheet";
import Header from "./Header";
import Spreadsheet from "./Spreadsheet";

const rows = 100;
const cols = 50;

export default function layout() {
  const [ssData, dispatch] = useSpreadsheet(rows, cols);
  return (
    <div className="">
      <Header ssData={ssData} dispatch={dispatch}/>
      <div className="header-spacer"></div>
      <Spreadsheet rows={rows} cols={cols} data={ssData} dispatch={dispatch} />
      <footer>
        <span className="creator">&copy;Pradeep Mishra</span>
        <span>
          <a target="_blank" href="https://github.com/pradeep-mishra">
            <img src="/github.png" alt="github" />
          </a>
        </span>
        <span>
          <a target="_blank" href="https://www.linkedin.com/in/ipradeepmishra/">
            <img src="/linkedin.png" alt="linkedin" />
          </a>
        </span>
        <span>
          <a target="_blank" href="https://twitter.com/ipradeepmishra">
            <img src="/twitter.png" alt="twitter" />
          </a>
        </span>
      </footer>
    </div>
  );
}
