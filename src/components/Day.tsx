import "./Day.css";

type DayProps = {
  dayNo: number;
};

const Day = ({ dayNo }: DayProps) => {
  return (
    <div className="day-cont">
      <a>{dayNo}</a>
      <div className="day-prog-bar"></div>
    </div>
  );
};

export default Day;
