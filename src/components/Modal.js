import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { MdClear } from "react-icons/md";
import { Input, Text, Button } from '../elements/index';
import moment from 'moment';

const Modal = (props) => {
  const { visible, _closeModal } = props;
  const [content, setContent] = useState('');
  const dateInfo = React.useRef();
  
  const changeContent = (e) => {
    setContent(e.target.value);
  }
  
  const addSchedule = () => {
    const dateValue = dateInfo.current.value;
    const formatDate = moment(dateValue).format('yyyy-MM-dd HH:mm');
    console.log('날짜 정보', dateValue);
    console.log('날짜 포멧', formatDate)
  }
  return (
    <>
    <ModalContainer visible={visible}>
      <ModalOveraly>
        <ModalInner>
          <ContentsArea>
            <ClearButton onClick={_closeModal}>
              <MdClear />
            </ClearButton>
              <Text>일정 내용</Text>
              <Input value={content} _onChange={changeContent} multiline/>
              <Text>일시</Text>
              <input type="datetime-local" ref={dateInfo}/>
            </ContentsArea>
            <Button text="취소" _onClick={_closeModal}/>
            <Button text="등록" _onClick={addSchedule}/>
        </ModalInner>
      </ModalOveraly>
    </ModalContainer>
    </>
  )
}

Modal.defaultProps = {
  visible: false,
  modalType : 'add',
  _closeModal: () => {},
}

const ModalContainer = styled.div`
   display: ${(props) => (props.visible ? "block" : "none")};
`

const ModalOveraly = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 15px;
  z-index: 2;
`

const ModalInner = styled.div`
  width: 60vw;
  height: 50vh;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, .3);
  background-color: #fff;
  overflow-y:auto;
  position: relative;
  @media screen and (max-width: 496px){
    width: 90%;
  }
`

const ContentsArea = styled.div`
  margin-top: 50px;
`

const ClearButton = styled.div`
  width: 45px;
  height: 45px;
  font-size: 30px;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`


export default Modal
