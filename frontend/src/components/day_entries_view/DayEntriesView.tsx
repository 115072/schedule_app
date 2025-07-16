import "./DayEntriesView.css";
import { useSelectedDayContext } from "../../SelectedDayContext";
import { getMonthName } from "../../utils";

interface Props {
  active: boolean;
}

const DayEntriesView = ({ active }: Props) => {
  const { data: selDay, setter: setSelDay } = useSelectedDayContext();

  if (!active || selDay === null) return;
  return (
    <div className="day-entries-cont">
      <button onClick={() => setSelDay(null)}>CLOSE</button>
      <p>Day: {selDay?.day}</p>
      <p>Month: {getMonthName(selDay?.month)}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, officia
        ut, dolores reiciendis doloribus soluta minima porro maxime suscipit
        excepturi numquam ullam facere, nisi ducimus sint veritatis. Aperiam,
        libero at.
      </p>
    </div>
  );
};

export default DayEntriesView;
