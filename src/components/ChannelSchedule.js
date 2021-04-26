import React, { useState, useContext, useEffect } from "react";
import { ChannelsContext } from "../context/ChannelsContext";
const ChannelSchedule = (props) => {
  const { getChannelSchedule, schedule } = useContext(ChannelsContext);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  let channelId = props.channelId;
  //Fetch the schedule based on the chosen date
  const handleSubmit = async (e) => {
    e.preventDefault();
    let searchDate = `${year}-${month}-${day}`;
    console.log("searchDate: ", searchDate, "and channelId", channelId);
    getChannelSchedule(channelId, searchDate);
  };

  useEffect(() => {
    console.log("schedule - ", schedule);
  }, []);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const renderSchedule = () => {
    return (
      <div>
        {schedule.schedule.map((program) => (
          <div>
            <p>{program.title}</p>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    );
  };
  let content = <h3>Var god sök på en tablå</h3>;

  if (schedule) {
    console.log("schedule", schedule);
    content = renderSchedule();
  }
  return (
    <div>
      <h1>Channel schedule component</h1>
      <h2>channelId {props.channelId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleYearChange}
        />
        <input
          type="text"
          placeholder="Enter month"
          value={month}
          onChange={handleMonthChange}
        />
        <input
          type="text"
          placeholder="Enter day"
          min="1"
          max="2"
          value={day}
          onChange={handleDayChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <h3>Här är content</h3>
      <div>{content}</div>
    </div>
  );
};

export default ChannelSchedule;
