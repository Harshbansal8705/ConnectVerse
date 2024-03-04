import React from 'react'
import "./Dashboard.css";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <main className='main w-full-screen min-h-screen flex justify-center items-center before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:opacity-20'>
            <section className="cursor-pointer rounded-md min-w-72 min-h-96 bg-white flex flex-col items-center drop-shadow-lg hover:scale-105 active:scale-95 transition">
                <div className='relative h-32 w-72'>
                    <div className='absolute bg-orange-400 opacity-80 w-full h-full rounded-t-md'></div>
                    <img src="https://images.unsplash.com/photo-1632377082529-611764ce0fef?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDg4MjU5NTF8&ixlib=rb-4.0.3&q=85" alt="card cover" className='w-full h-full object-cover rounded-t-md' />
                </div>
                <div className="-m-9 z-10 bg-white rounded-full"><img src={user.pic || "/profile.png"} alt="profile image" className='w-24 h-24 rounded-full object-cover p-2' /></div>
                <div className='text-center mt-12'>
                    <h1 className='mb-1 text-xl font-medium dark:text-gray-900'>{user.name}</h1>
                    <p className='text-sm text-gray-400 dark:text-gray-500'>{user.country}</p>
                </div>
                <div className='flex gap-4 justify-around px-8 pt-4 w-full'>
                    <p className='text-sm text-gray-400 dark:text-gray-500 flex flex-col items-center'><span className='mb-1 text-xl font-medium dark:text-gray-900'>0</span> Followers</p>
                    <p className='text-sm text-gray-400 dark:text-gray-500 flex flex-col items-center'><span className='mb-1 text-xl font-medium dark:text-gray-900'>0</span> Following</p>
                </div>
                <button onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                }}>Logout</button>
                <ul className='absolute flex gap-6 -bottom-4'>
                    <a href={`mailto:${user.email}`}>
                        <li className='w-10 h-10 bg-orange-600 rounded-full grid place-items-center' title='Email'><svg viewBox="0 0 512 512" width="20" title="envelope" fill='white'>
                            <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                        </svg></li>
                    </a>
                </ul>
            </section>
        </main>
    )
}
