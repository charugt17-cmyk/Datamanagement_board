import  React, {useState} from 'react';
import './WeeklyCalender.css'

const WeeklyCalender = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    console.log(currentDate, 'currentDate')

    const getstartweek = (val) => {
        const dates = new Date(val);
        const day = dates.getDay();
        console.log(dates, 'dates')
        console.log(day, 'day')
        dates.setDate(dates.getDate() - day)
        return dates;
    }

    const startofweek = getstartweek(currentDate);
    console.log(startofweek, 'startofweek')
    const days = [...Array(7)].map((val, i) => {
        const d = new Date(currentDate);
        d.setDate(startofweek.getDate() + i);
        return d
         
    })

    console.log(days, 'days')

    const handlePrevious = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() - 7);
        setCurrentDate(prev);
    }

     const handleNext = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() + 7);
        setCurrentDate(prev);
    }
    return (
        <div>
            <button onClick={() => handlePrevious()}>
                Prev
            </button>
            <button onClick={() => handleNext()}>
                Next
            </button>
            <div className='calenderGrid'>
           { days.map((day, index) => (
            <div key={index}>
                <div>
                    {day.toDateString()}
                </div>
            </div>
           ))}
           </div>
        </div>

    )

}

export default WeeklyCalender;