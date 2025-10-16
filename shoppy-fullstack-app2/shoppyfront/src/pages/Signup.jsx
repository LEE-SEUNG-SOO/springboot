import '../styles/cgvSignup.css';
import { useState, useRef, useContext } from 'react';
import { validateCheck } from '../utils/validate.js';
import { createInit } from '../utils/init.js';
import { AuthContext } from '../context/AuthContext.js';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const { setUser } = useContext(AuthContext);
    const initArray = ['id', 'pwd', 'cpwd', 'name', 'phone', 'emailName', 'emailDomain'];
    const initForm = createInit(initArray, "", ""); 
    const initMsg = createInit(initArray, "Msg", "");
    const initRef = createInit(initArray, "Ref", useRef(null));
    const { handleLogin } = useAuth();
    const nav = useNavigate();

    console.log("initForm2", initForm);
    console.log("initMsg2", initMsg);
    console.log("initRef2", initRef);

    const [form, setForm] = useState(initForm);
    const [msg, setMsg] = useState(initMsg);
    const [ref, setRef] = useState(initRef);

    console.log('form', form);
    console.log('msg', form);
    console.log('ref', form);
    
    const submitForm = (e) => {
        e.preventDefault();
        if(validateCheck(form, setMsg, ref)){
            setMsg(initMsg);
            setUser(form);
            alert('회원가입성공');
            handleLogin();
            nav('/');
        };
    }

    const handleResetForm = () => {
        setForm(initForm);
        setMsg(initMsg);
        setRef(initRef);
    }

    const handleChangeForm = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }

    return (
    <div className="content">
        <div className="join-form center-layout">
            <h1 className="center-title">회원가입(React)</h1>
            <form onSubmit={submitForm}>
                <ul>
                    <li>
                        <label for="" ><b>아이디</b></label><span>{msg.idMsg}</span>
                        <div>
                            <input type="text" 
                                    name="id"                        
                                    placeholder = "아이디 입력(6~20자)" 
                                    onChange={handleChangeForm}
                                    value={form.id}
                                    ref={ref.idRef}/>
                            <button type="button" 
                                  > 중복확인</button>
                            <input type="hidden" id="idCheckResult" value="default" />
                        </div>
                    </li>
                    <li>
                        <label for=""><b>비밀번호</b></label><span>{msg.pwdMsg}</span>
                        <div>
                            <input type="password" 
                                    name="pwd"
                                    placeholder="비밀번호 입력(문자,숫자,특수문자 포함 6~12자)"
                                    onChange={handleChangeForm}
                                    value={form.pwd}
                                    ref={ref.pwdRef}/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>비밀번호 확인</b></label><span>{msg.cpwdMsg}</span>
                        <div>
                            <input type="password" 
                                    name="cpwd"
                                    placeholder="비밀번호 재입력"
                                    onChange={handleChangeForm}
                                    value={form.cpwd}
                                    ref={ref.cpwdRef}/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>이름</b></label><span>{msg.nameMsg}</span>
                        <div>
                            <input type="text" 
                                    name="name"
                                    placeholder="이름을 입력해주세요"
                                    onChange={handleChangeForm}
                                    value={form.name}
                                    ref={ref.nameRef}/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>전화번호</b></label><span>{msg.phoneMsg}</span>
                        <div>
                            <input type="text" 
                                    name="phone"
                                    placeholder="휴대폰 번호 입력('-' 포함)"
                                    onChange={handleChangeForm}
                                    value={form.phone}
                                    ref={ref.phoneRef}/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>이메일 주소</b></label><span>{msg.emailNameMsg}{msg.emailDomainMsg}</span>
                        <div>
                            <input type="text" 
                                    name="emailName"
                                    placeholder="이메일 주소"
                                    onChange={handleChangeForm}
                                    value={form.emailName}
                                    ref={ref.emailNameRef}/>
                            <span>@</span>       
                            <select name="emailDomain"
                                    onChange={handleChangeForm}
                                    value={form.emailDomain}
                                >
                                <option value="default">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <button type="submit">가입하기</button>
                        <button type="button" onClick={handleResetForm}>가입취소</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    );
}

