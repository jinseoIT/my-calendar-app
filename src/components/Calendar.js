import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Calendar = () => {
  
  
  const test = (e) => {
    console.log('click');
    console.log(e.event._def);
  }
  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale="ko"
        events={[
          { title: '01:00 밥먹기', date: '2021-10-02', color:'#378006', textColor : '#000'},
          { title: '10:00 밥먹기', date: '2021-10-02', color:'#378006', textColor : '#000'},
          { title: '09:00 밥먹기', date: '2021-10-02', color:'#378006', textColor : '#000'},
          { title: '11:00 밥먹기', date: '2021-10-02', color:'blue', textColor : '#000' },
          { title: '15:00 밥먹기', date: '2021-07-02', color:'blue', textColor : '#000' },
          { title: '13:00 밥먹기', date: '2021-08-02', color:'blue', textColor : '#000' },
          { title: '14:00 밥먹기', date: '2021-09-02', color:'red', textColor : '#000' },
        ]}
        eventClick={test}
      />
    </>
  )
}
export default Calendar
