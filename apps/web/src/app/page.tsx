"use client"

import { Button } from "@course-selling-platform/ui";
import { themeAtom, useRecoilValue } from "@course-selling-platform/store";
import { useState } from "react";

export default function Home() {
  const theme = useRecoilValue(themeAtom);
  console.log(theme);
  const [themeIs, setThemeIs] = useState(theme);
  const handleClick = () => {
    setThemeIs((prevData) => {
      if (prevData === "light") {
        return "dark"
      }
      return "light"
    })
  }
  return (
    <>
      {themeIs === "light" && <p>Light Theme</p>}
      {themeIs === "dark" && <p>Dark Theme</p>}
      <button onClick={handleClick}>Change Theme</button>
      <Button />
    </>
  );
};
