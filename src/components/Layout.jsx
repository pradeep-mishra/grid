import Header from "./Header";
import Spreadsheet from "./Spreadsheet";

export default function layout() {
  return (
    <div>
      <Header />
      <div className="header-spacer"></div>
      <div>
        <Spreadsheet rows={100} cols={50} />
        
      </div>
    </div>
  );
}
