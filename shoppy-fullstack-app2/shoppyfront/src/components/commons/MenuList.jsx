import { Menu } from './Menu.jsx';
import { useState } from 'react';

export function MenuList({menus, filterList}){
    const [active, setActive] = useState('all');

    const handleClick = (type) => {
        setActive(type);
        filterList(type);
    }

    // !menus <- menus가 존재 하는가 아닌가 체크 존재할경우만 작동 !menus ||
    return(
        <ul className="menu-list">
            { !menus || menus.map( (menu) => 
                    <li className="menu-list-item">
                        <Menu href={menu.href}
                                menuName={menu.menuName}
                                style={ active === menu.type ? "support-content-menu support-active" : "support-content-menu"}
                                isIcon={menu.isIcon}
                                icon={menu.icon}
                                handleClick={handleClick}
                                type={menu.type}
                            />
                        { menu.isBorder ==="true" ? 
                            <span className="menu-list-item-border"></span>
                           : ""
                        }
                    </li>
                )
            }
        </ul>
    );
}