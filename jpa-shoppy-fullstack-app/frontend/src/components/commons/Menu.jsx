export function Menu({href, menuName, style, isIcon, icon, handleClick, type}){
    return(
        <a href={href}
            className={style}
            onClick={ () => handleClick(type) }>{isIcon === "true" ? icon : ""}{menuName}</a>
    )
}