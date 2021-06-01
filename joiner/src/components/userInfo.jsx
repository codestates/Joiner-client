import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import data from '../dummyData/userDummy';
axios.defaults.withCredentials = true;

const UserInfo = () => {
  const [inputs, setInputs] = useState({ userName: '', email: '' });
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(null);

  const { state, dispatch } = useUserContext();
  const { user, accessToken } = state;
  const { userName, email } = user;

  useEffect(() => {
    const updateUserInfo = async () => {
      let response = await axios.put('/user/userInfo/userInfoUpdate', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          inputs: inputs,
        },
        withCredentials: true,
        crossDomain: true,
      });
      dispatch({ type: 'UPDATE_USER', payload: response.data.inputs });
    };
    updateUserInfo(dispatch);
  }, [inputs.userName, inputs.email]);

  const isValidEmail = str => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str);
  };

  const handleClick = () => {
    setIsToggleOn({ isToggleOn: !isToggleOn });
  };

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = e => {
    // e.preventDefault();
    if (!inputs.userName || !inputs.email) {
      alert('누락된 항목이 있습니다');
    }
    if (!isValidEmail(inputs.email)) {
      alert('올바른 이메일 형식이 아닙니다');
    } else {
      // alert('수정 완료!');
      setSubmitted(true);
      window.location.reload();
      // setIsToggleOn({ isToggleOn: !isToggleOn });
    }
  };

  if (isToggleOn) {
    return (
      <div className="userInfo">
        <div className="userNameField">
          <p>{userName}</p>
          <span>
            <input
              id="userName"
              placeholder="이름"
              value={inputs.userName}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="emailField">
          <p>{email}</p>
          <span>
            <input
              id="email"
              placeholder="이메일"
              value={inputs.email}
              onChange={handleChange}
            />
          </span>
        </div>
        {submitted ? (
          <div>
            <button type="submit" onClick={handleSubmit}>
              완료
            </button>
            <p>수정 완료!</p>
          </div>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            완료
          </button>
        )}
      </div>
    );
  } else if (!isToggleOn) {
    return (
      <div className="userInfo">
        <div className="userNameText">
          <p>{userName}</p>
        </div>
        <div className="emailText">
          <p>{email}</p>
        </div>
        <button onClick={handleClick}>정보 수정</button>
      </div>
    );
  }
};

export default UserInfo;
