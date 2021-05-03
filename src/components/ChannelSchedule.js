import React, { useState, useContext, useEffect } from "react";
import { ChannelsContext } from "../context/ChannelsContext";
import styles from "../styles/ChannelScheduleS.module.css";

const ChannelSchedule = (props) => {
  const { getChannelSchedule, schedule, setSchedule } = useContext(
    ChannelsContext
  );
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
  const clearInput = () => {
    setSchedule(null);
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
      <div className={styles.schedule_main_wrapper}>
        {schedule.schedule.map((program, index) => (
          <div key={index} className={styles.schedule_card}>
            <div className={styles.image_wrapper}>
              <img src={program.imageurl} alt={program.title} />
            </div>
            <div className={styles.info_wrapper}>
              <p>{program.title}</p>
              <p>{program.description}</p>
              <p>startar: {program.starttimeutc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  let content = <h3 className={styles.h3}>Var god sök på en tablå...</h3>;

  if (schedule) {
    console.log("schedule", schedule);
    content = renderSchedule();
  }
  return (
    <div className={styles.main_wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="År..."
          value={year}
          onChange={handleYearChange}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Månad..."
          value={month}
          onChange={handleMonthChange}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Dag..."
          min="1"
          max="2"
          value={day}
          onChange={handleDayChange}
        />
      </form>
      <div className={styles.button_container}>
        <button onClick={clearInput}>Rensa</button>
        <button onClick={handleSubmit}>Sök</button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ChannelSchedule;
