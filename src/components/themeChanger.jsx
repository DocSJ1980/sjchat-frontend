import React, { useEffect, useState } from 'react'
import { UilMoon } from '@iconscout/react-unicons'
import { UilBrightness } from '@iconscout/react-unicons'


const ThemeChanger = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }, [])

    useEffect(() => {
        console.log('Theme:', theme);
        console.log('Class name:', document.documentElement.className);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="theme-changer">
            {theme === "light" ? <UilMoon color="#fca61f" size="24" className="hover:gray-500 cursor-pointer rounded-full" onClick={handleThemeSwitch} /> : <UilBrightness color="#fca61f" size="24" className="hover:gray-500 cursor-pointer rounded-full" onClick={handleThemeSwitch} />}
        </div>
    )
}

export default ThemeChanger