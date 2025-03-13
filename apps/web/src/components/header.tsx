"use client"

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeSidebar = () => setIsSidebarOpen(false);
    return (
        <>
            <header className="w-full shadow-md px-24 py-6 flex justify-between">
                <div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="translate-y-1 mr-5 rounded-full hover:bg-gray-100">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <Link href="/" className="text-xl">Course Selling Platform</Link>
                </div>
                <nav>
                    <Link href="#" className="mx-3">Sign In</Link>
                    <Link href="#" className="mx-3">Sign Up</Link>
                </nav>
            </header>

            {isSidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}

            <aside className={`fixed top-0 left-0 h-full bg-white border p-5 pt-6 transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-between items-center pb-6 border-b-2">
                    <h3 className="text-xl">Expense Tracker</h3>
                    <button onClick={closeSidebar} className="rounded-full hover:bg-gray-100 ml-5">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
                        </svg>
                    </button>
                </div>
                <nav className="mt-6 flex flex-col gap-4">
                    <Link href="/dashboard" className="hover:bg-gray-200 p-2 rounded" onClick={closeSidebar}>Dashboard</Link>
                    <Link href="/dashboard/addtransaction" className="hover:bg-gray-200 p-2 rounded" onClick={closeSidebar}>Add Transaction</Link>
                    <Link href="/dashboard/alltransactions" className="hover:bg-gray-200 p-2 rounded" onClick={closeSidebar}>All Transactions</Link>
                </nav>
            </aside>
        </>
    );
};