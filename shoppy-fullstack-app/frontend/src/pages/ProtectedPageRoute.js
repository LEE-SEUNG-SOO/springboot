import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedPageRoute({ children }) {
    const isLogin = useSelector( state => state.auth.isLogin);
    const isAlert = useRef(false);

    if( isLogin ){ // 로그인 상태
        isAlert.current = true; // Protected 페이지에 해당하는 페이지에서 로그아웃시 로그인 필요 alert 방지.
        return children;
    } else { // 로그인 아님
        if(!isAlert.current) {
            // 로그인 정보가 남아있음.(브라우저 종료 전까지)
            if(localStorage.getItem("loginInfo")){
                return <Navigate to="/"/> // 실시간 페이지 이동 return 필요.
            } else {
                alert("2로그인 필요.\n로그인 페이지로 이동");
                return <Navigate to="/login"/> // 실시간 페이지 이동 return 필요.
            }
        }

    }
}

