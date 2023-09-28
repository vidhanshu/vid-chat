import React from "react";

export function scrollInView<T extends HTMLElement>(T: React.RefObject<T>) {
  const element = T.current;
  if (element) {
    console.log("scrollInView")
    element.scrollIntoView({ behavior: "smooth" });
  }
}
