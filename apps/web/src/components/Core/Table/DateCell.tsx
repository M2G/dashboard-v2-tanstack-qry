interface IDateCell {
  readonly date?: number;
}

function DateCell({ date }: IDateCell): JSX.Element {
  return (
    <div className="date_cell">
      {date ? (
        <>
          <div>{new Date(date).toLocaleDateString()}</div>
          <div>{new Date(date).toLocaleTimeString()}</div>
        </>
      ) : null}
    </div>
  );
}

export default DateCell;
