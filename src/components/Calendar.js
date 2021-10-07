import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scheduleActions} from '../redux/modules/schedule';


const Calendar = () => {
  const dispatch = useDispatch();
  const schedule_list = useSelector(state => state.schedule.list);
  console.log(schedule_list);

  React.useEffect(() => {
    dispatch(scheduleActions.getScheduleFB());
  }, []);

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
        events={schedule_list}
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
