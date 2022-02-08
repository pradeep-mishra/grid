import useSpreadsheet from "../hooks/useSpreadsheet";
import Header from "./Header";
import Spreadsheet from "./Spreadsheet";

const rows = 100;
const cols = 50;

export default function layout() {
  const [ssData, dispatch] = useSpreadsheet(rows, cols);
  return (
    <div>
      <Header ssData={ssData} dispatch={dispatch}/>
      <div className="header-spacer"></div>
        <Spreadsheet rows={rows} cols={cols} data={ssData} dispatch={dispatch} />
    </div>
  );
}
