import "./DayEntriesView.css";
import { useSelectedDayContext } from "../../SelectedDayContext";

interface Props {
  active: boolean;
}

const DayEntriesView = ({ active }: Props) => {
  const { data: selDay } = useSelectedDayContext();

  if (!active) return;
  return (
    <div className="day-entries-cont">
      <p>Day: {selDay.day}</p>
      <p>Month: {selDay.month}</p>
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
