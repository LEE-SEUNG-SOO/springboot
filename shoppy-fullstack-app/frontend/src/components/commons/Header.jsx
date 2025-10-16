import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../../feature/auth/authAPI.js";

//<IoCartOutline />
export function Header(){
    // const nav = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector( state => state.auth.isLogin );
    const cartCount = useSelector( state => state.cart.cartCount );

    const handleLogout = () => {
        const succ = dispatch(getLogout());
        const loginInfo = localStorage.getItem("loginInfo");

        if(succ && !loginInfo){
            alert("로그아웃");
            // nav("/");
        };
    }

    return(
        <div className="header-outer">
            <div className="header">
                <Link to="/" className="header-left">
                    <FiShoppingBag />
                    <span>Shoppy-redux(toolkit)::fullstack</span>
                </Link>
                <nav className="header-right">
                    <Link to="/all">Products</Link>
                    <Link to="/cart" className="header-icons-cart-link">
                        <IoCartOutline className="header-icons"/>
                        <span className="header-icons-cart">{cartCount}</span>
                    </Link>
                    { isLogin ?
                        <Link to="/"><button type="button" onClick={ handleLogout }>Logout</button></Link>
                        : <Link to="/login"><button type="button">Login</button></Link>
                    }
                    <Link to="/signup">
                        <button type="button">Singup</button>
                    </Link>
                    { isLogin ?
                        <Link to="/support">
                            <button type="button">support</button>
                        </Link>
                        : ""
                    }
                </nav>
            </div>
        </div>
    )
}