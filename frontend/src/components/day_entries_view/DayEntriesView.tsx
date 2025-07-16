import "./DayEntriesView.css";

interface Props {
  active: boolean;
}

const DayEntriesView = ({ active }: Props) => {
  if (!active) return;
  return (
    <div className="day-entries-cont">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, officia ut,
      dolores reiciendis doloribus soluta minima porro maxime suscipit excepturi
      numquam ullam facere, nisi ducimus sint veritatis. Aperiam, libero at.
    </div>
  );
};

export default DayEntriesView;
