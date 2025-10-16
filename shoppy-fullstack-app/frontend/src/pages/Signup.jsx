import '../styles/cgvSignup.css';
import { useState, useRef, useContext } from 'react';
import { validateCheck } from '../utils/validate.js';
import { createInit } from '../utils/init.js';
import { AuthContext } from '../context/AuthContext.js';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { axiosPost } from  "../utils/fetchData.js";

export function Signup() {
    const { setUser } = useContext(AuthContext);
    const initArray = ['id', 'pwd', 'cpwd', 'name', 'phone', 'emailName', 'emailDomain'];
    const initForm = createInit(initArray, "", ""); 
    const initMsg = createInit(initArray, "Msg", "");
    const initRef = createInit(initArray, "Ref", useRef(null));
    const { handleLogin } = useAuth();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState(initForm);
    const [msg, setMsg] = useState(initMsg);
    const [ref, setRef] = useState(initRef);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if(validateCheck(form, setMsg, ref)){
            const formData = { ...form, email: form.emailName.concat("@", form.emailDomain)};
            console.log("formData: ", formData);

            /**
            * SpringBoot - @RestController, @PostMapping("member/login")
            * formData.id, formData.pwd 파라미터 전송
            * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
            * axiosAPI 사용
            */
            const url = "http://localhost:8080/member/signup";
            const result = await axiosPost(url, formData);
            console.log("result : ", result);

            if(result){
                setMsg(initMsg);
                setUser(form);
                alert('회원가입 성공');
                handleLogin();
                nav('/login');
            } else {
                alert('회원가입 실패');
                }
        };
    }

    const handleResetForm = () => {
        setForm(initForm);
        setMsg(initMsg);
        setRef(initRef);
    }

    const handleChangeForm = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }
    const handleDuplicateIdCheck = async () => {
        /**
        * SpringBoot - @RestController, @PostMapping("member/login")
        * formData.id, formData.pwd 파라미터 전송
        * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
        * axiosAPI 사용
        */
        const data = {"id": form.id };
        const url = "http://localhost:8080/member/checkDuplicateId";
        const result = await axiosPost(url, data);

        alert(result);
    }

    return (
    <div className="content">
        <div className="join-form center-layout">
            <h1 className="center-title">회원가입(React)</h1>
            <form onSubmit={handleSubmitForm}>
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
                                  onClick={handleDuplicateIdCheck}> 중복확인</button>
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

