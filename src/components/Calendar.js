import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as scheduleActions } from '../redux/modules/schedule';


const Calendar = (props) => {
  const dispatch = useDispatch();
  const { _openModal, _setModify, allScheduleYn } = props;
  let schedule_list = useSelector(state => state.schedule.list);
  /* 완료 일정 보기 */
  if (!allScheduleYn) {
    schedule_list = schedule_list.filter(v=> v.finished === true)
  }
  React.useEffect(() => {
    if (schedule_list.length === 0) {
      dispatch(scheduleActions.getScheduleFB());  
    }
  }, [schedule_list, allScheduleYn]);

  //refetchEvents()

  const updateModal = (e) => {
    const scheduleObj = e.event._def.extendedProps;
    dispatch(scheduleActions.readSchedule(scheduleObj));
    _setModify();
    _openModal();
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
        eventClick={updateModal}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 90%;
  width : 90%;
    a {
      cursor: pointer;
    }
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
