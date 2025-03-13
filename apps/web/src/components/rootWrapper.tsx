"use client"
import { RecoilRoot } from "@course-selling-platform/store";

export default function RootWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </>
    );
};