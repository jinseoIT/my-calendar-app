import React from 'react'
import styled from 'styled-components';
import { IoIosAdd } from "react-icons/io";
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as scheduleActions} from '../redux/modules/schedule';

const Main = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('add');

  const openModal = (type) => {
    /* 일정추가 modal*/
    if (type === 'add') {
      dispatch(scheduleActions.readSchedule({}));
    }
    setModalType(type);
    setVisible(true);
  }

  return (
    <Container>
      <CalendarArea>
        {/* 캘린더 */}
        <Calendar
          _openModal={() => openModal('modify')}
          _setModify={() => setModalType('modify')}
        />
      </CalendarArea>
      <AddButton onClick={() => openModal('add')}>
        <IconArea>
          <IoIosAdd />
        </IconArea>
      </AddButton>
      <Modal
        visible={visible}
        modalType={modalType}
        _closeModal={() => setVisible(false)} />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

const CalendarArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`
const AddButton = styled.div`
  background-color: #3788d9;
  position: fixed;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  bottom: 10px;
  right : 10px;
  z-index: 2;
`
const IconArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
` 

export default Main
