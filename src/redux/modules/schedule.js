import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../config/firebase';

const SET_SCHEDULE = 'SET_SCHEDULE';
const ADD_SCHEDULE = 'ADD_SCHEDULE';
const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const READ_SCHEDULE = 'READ_SCHEDULE';
const UPDATE_CONFIRM = 'UPDATE_CONFIMR';

const setSchedule = createAction(SET_SCHEDULE, (schedule_list) => ({ schedule_list }));
const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({ schedule }));
const updateSchedule =createAction(UPDATE_SCHEDULE, (doc_id, schedule) => ({doc_id, schedule }));
const deleteSchedule =createAction(DELETE_SCHEDULE, (doc_id) => ({doc_id}));
const readSchedule = createAction(READ_SCHEDULE, (scheduleInfo) => ({ scheduleInfo }));
const updateConfirm = createAction(UPDATE_CONFIRM, (doc_id, toggleYn) => ({ doc_id, toggleYn }));


const initailState = {
  list : [],
  finishedList: [],
  modal_scheduleInfo: {}
}

const getScheduleFB = () => {
  return async function (dispatch) { 
    const scheduleDB = firestore.collection('schedule_db')
    const scheduleList = [];

    await scheduleDB.get()
      .then(docs => {
        docs.forEach((doc) => {
          const obj = doc.data();
          scheduleList.push({ 'doc_id': doc.id, 'date_info': obj.date , ...obj });
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

const updateScheduleFB = (scheduleInfo, doc_id) => {
  return async function (dispatch) {
    const ScheduleDB = firestore.collection('schedule_db');
    await ScheduleDB
      .doc(doc_id)
      .update({ ...scheduleInfo })
      .then(() => {
        dispatch(updateSchedule(doc_id, { ...scheduleInfo }))
      })
      .catch(err => {
        console.log('update err' ,err); 
        window.alert('수정에 실패하였습니다.');
      })
  }
}

const deleteScheduleFB = (doc_id) => {
  return function (dispatch) {
    const ScheduleDB = firestore.collection('schedule_db');
    ScheduleDB
      .doc(doc_id)
      .delete()
      .then((doc) => {
        dispatch(deleteSchedule(doc_id))
      })
      .catch(err => {
        console.log('delete err');
        window.alert('삭제에 실패하였습니다.');
      })
  }
}

const updateConfirmFB = (doc_id, toggleYn) => {
  return function (dispatch) {
    const ScheduleDB = firestore.collection('schedule_db');
    ScheduleDB
      .doc(doc_id)
      .update({'finished': toggleYn })
      .then(doc => {
        dispatch(updateConfirm(doc_id, toggleYn))
      })
      .catch(err => {
        console.log('일정완료 오류', err);
        window.alert('일정상태 변경에 실패하였습니다.');
      })
  }
}

export default handleActions(
  {
    /* 스케줄 List */
    [SET_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const dbList = action.payload.schedule_list;
      const newList = dbList.map(v => {
        const obj = { ...v, 'title': `${v.time_info} ${v.contents}` }
        if (v.finished) {
          obj['color'] = '#757984';
        }
        return obj;
      })
      draft.list.push(...newList);
    }),
    /* 스케줄 추가 */
    [ADD_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const scheduleInfo = action.payload.schedule;
      draft.list.push({ ...scheduleInfo, 'title': `${scheduleInfo.time_info} ${scheduleInfo.contents}` });
    }),
    /* 스케줄 업데이트 */
    [UPDATE_SCHEDULE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex(v => v.doc_id === action.payload.doc_id);
      const schedule = action.payload.schedule;
      draft.list[idx] = { ...draft.list[idx], ...action.payload.schedule, 'title': `${schedule.time_info} ${schedule.contents}`};
    }),
    /* 스케줄 삭제 */
    [DELETE_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const newList = draft.list.filter(v => v.doc_id !== action.payload.doc_id);
      draft.list = newList;
    }),
    /* 스케줄 상세 */
    [READ_SCHEDULE]: (state, action) => produce(state, (draft) => {
      const scheduleInfo = action.payload.scheduleInfo;
      draft.modal_scheduleInfo = {...scheduleInfo}
    }),
    /* 일정 완료 | 미완료 */
    [UPDATE_CONFIRM]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex(v => v.doc_id === action.payload.doc_id);
      const schedule = draft.list[idx];
      if (action.payload.toggleYn) {
        schedule['color'] = '#757984'
        draft.list[idx] = {
          ...schedule,
          'title': `${schedule.time_info} ${schedule.contents}`,
          'finished' : true
        }
      }  else {
        draft.list[idx] = {
          ...schedule,
          'title': `${schedule.time_info} ${schedule.contents}`,
          'finished': false,
          'color': '#3788d9'
        }
      }
      draft.modal_scheduleInfo = {...draft.modal_scheduleInfo, 'finished': action.payload.toggleYn}
    }),
  }, initailState
)

const actionCreators = {
  addSchedule,
  readSchedule,
  updateConfirmFB,
  getScheduleFB,
  addScheduleFB,
  updateScheduleFB,
  deleteScheduleFB
}

export {actionCreators}