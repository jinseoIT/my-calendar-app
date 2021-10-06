import React from 'react'
import styled from 'styled-components';
import { IoIosAdd } from "react-icons/io";
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'

import { useState } from 'react';

const Main = () => {
  
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <CalendarArea>
        {/* 캘린더 */}
        <Calendar />
      </CalendarArea>
      <AddButton onClick={() => setVisible(true)}>
        <IconArea>
          <IoIosAdd />
        </IconArea>
      </AddButton>
      <Modal
        visible={visible}
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
  background-color: royalblue;
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
  color: #000;
  font-size: 40px;
` 

export default Main
