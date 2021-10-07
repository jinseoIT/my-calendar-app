import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../config/firebase';

const SET_SCHEDULE = 'SET_SCHEDULE';
const ADD_SCHEDULE = 'ADD_SCHEDULE';

const setSchedule = createAction(SET_SCHEDULE, (schedule_list) => ({ schedule_list }));
const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({ schedule }));

const initailState = {
  list : []
}

const getScheduleFB = () => {
  return async function (dispatch) { 
    const scheduleDB = firestore.collection('schedule_db')
    const scheduleList = [];

    await scheduleDB.get()
      .then(docs => {
        docs.forEach((doc) => {
          scheduleList.push({ ...doc.data() });
        })
      })
    dispatch(setSchedule(scheduleList));
  }
}

const addScheduleFB = (scheduleInfo) => {
  return async function (dispatch) {
    const ScheduleDB = firestore.collection('schedule_db');
    await ScheduleDB
      .add({ ...scheduleInfo})
      .then(doc => {
        let schedule = { ...scheduleInfo, id: doc.id };
        dispatch(addSchedule(schedule))
      })
      .catch(err => {
        window.alert('일정 등록에 문제가 있습니다.')
        console.log('addSchedule err', err);
      })
  }
}

export default handleActions(
  {
    [SET_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const dbList = action.payload.schedule_list;
      const newList = dbList.map(v => {
        return { ...v, 'title': `${v.time_info} ${v.contents}` };
      })
      draft.list.push(...newList);
    }),
    [ADD_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const scheduleInfo = action.payload.schedule;
      draft.list.push({ ...scheduleInfo, 'title': `${scheduleInfo.time_info} ${scheduleInfo.contents}`});
    })
  }, initailState
)

const actionCreators = {
  addSchedule,
  getScheduleFB,
  addScheduleFB
}

export {actionCreators}