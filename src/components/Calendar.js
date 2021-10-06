import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import styled from 'styled-components';

const Calendar = () => {
  
  
  const test = (e) => {
    console.log('click');
    console.log(e.event._def);
  }
  return (
    <Container>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        height= "100%"
        expandRows="true"
        locale="ko"
        headerToolbar= {{
          left: 'today',
          center: 'title',
          right: 'prev,next',
        }}
        dayMaxEvents= "true"
        events={[
          { title: '01:00 밥먹기', date: '2021-10-02', color:'#378006', textColor : '#fff'},
          { title: '02:00 밥먹기', date: '2021-10-03', color:'#378006', textColor : '#fff'},
          { title: '03:00 밥먹기', date: '2021-10-04', color:'#378006', textColor : '#fff'},
          { title: '08:00 밥먹기', date: '2021-10-09', color:'#378006', textColor : '#fff'},
        ]}
        eventClick={test}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 90%;
  width : 90%;
  
  .fc-col-header-cell {
    background-color: #757984;
    color: #fff;
    &.fc-day-sat {
      background-color: #2f74b5;
    }
    &.fc-day-sun {
      background-color: #ca5973;
    }
  }

`


export default Calendar
