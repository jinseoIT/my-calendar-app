import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const Input = (props) => {

  const { placeholder, label, _onChange, type, multiline, value } = props;

  if(multiline){
    return(
        <>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea value={value} rows={5} placeholder={placeholder} onChange={_onChange}></ElTextarea>
        </>
    );
}
  
  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput type={type} placeholder={placeholder} onChange={_onChange}/>
    </>
  )
  
}

Input.defaultProps = {
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  type: "text",
  _onChange:()=>{},
  value:"",
  };
  
  const ElInput = styled.input`
    border: 1px solid #212121;
      width: 100%;
      padding: 12px 4px;
      box-sizing: border-box;
  `;
  
  const ElTextarea = styled.textarea`
   border: 1px solid #212121;
      width: 100%;
      padding: 12px 4px;
      box-sizing: border-box;
  `;

export default Input
