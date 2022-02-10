import useSpreadsheet from "../hooks/useSpreadsheet";
import Footer from './Footer';
import Header from "./Header";
import Spreadsheet from "./Spreadsheet";

const rows = 100;
const cols = 50;

export default function layout() {
  const [ssData, dispatch] = useSpreadsheet(rows, cols);
  return (
    <div className="">
      <Header ssData={ssData} dispatch={dispatch}/>
      <div className="spacer-50"></div>
      <Spreadsheet rows={rows} cols={cols} data={ssData} dispatch={dispatch} />
      <Footer/>
    </div>
  );
}

