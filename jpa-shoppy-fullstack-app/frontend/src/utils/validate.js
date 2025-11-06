
export function validateFormCheck(idRef, pwdRef, setText){
    let result = true;

    if(idRef.current.value === "") {
        setText({'id':"아이디를 입력해주세요."});
        idRef.current.focus();
        result = false;
    } else if(pwdRef.current.value === "") {
        setText({'pwd':"패스워드 입력를 입력해주세요."});
        pwdRef.current.focus();
        result = false;
    }

    return result;
}

export function validateLoginCheck(refs, setMsg){
    let  result = true;

    if(refs.idRef.current.value === ""){
        refs.idRef.current.focus();
        // refs.idmsgRef.current.innerText = "아이디를 입력해주세요.";
        setMsg({id: "아이디를 입력해주세요."});
        result = false;
    } else if(refs.passRef.current.value === ""){
        refs.passRef.current.focus();
        // refs.passmsgRef.current.innerText = "패스워드를 입력해주세요.";
        setMsg({pass: "패스워드를 입력해주세요."});
        result = false;
    }

    return result;
}

export function validateCheck(form, setMsg, ref){
    let result = true;

    if(form.id === ""){
        result = false;
        setMsg({idMsg:"아이디를 입력해주세요."});
        ref.idRef.current.focus();
    } else if(form.pwd === ""){
        result = false;
        setMsg({pwdMsg:"패스워드를 입력해주세요."});
        ref.pwdRef.current.focus();
    } else if(form.cpwd === ""){
        result = false;
        setMsg({cpwdMsg:"패스워드 재입력을 입력해주세요."});
        ref.cpwdRef.current.focus();
    } else if(form.pwd !== form.cpwd) {
        result = false;
        setMsg({cpwdMsg:"패스워드와 일치하지 않습니다. 재입력해주세요."});
        ref.cpwdRef.current.focus();
    }
    else if(form.name === ""){
        result = false;
        setMsg({nameMsg:"이름을 입력해주세요."});
        ref.nameRef.current.focus();
    } else if(form.phone === ""){
        result = false;
        setMsg({phoneMsg:"핸드폰번호를 입력해주세요."});
        ref.phoneRef.current.focus();
    } else if(form.emailName === ""){
        result = false;
        setMsg({emailNameMsg:"이메일주소를 입력해주세요."});
        ref.emailNameRef.current.focus();
    } else if(form.emailDomain === "" || form.emailDomain === "default"){
        result = false;
        setMsg({emailDomainMsg:"이메일도메인을 선택해주세요."});
    }

    return result;
}
