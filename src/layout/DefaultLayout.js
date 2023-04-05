import React, { useEffect } from "react";
import Navbar from "src/components/navbar/Navbar";
import DefaultFooter from "./defaultFooter";
import "./defaultLayout.scss";

const DefaultLayout = ({ children }) => {
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          entry.target.classList.remove('hidden');
        }else{
          entry.target.classList.remove('show');
          entry.target.classList.add('hidden');
        }
      })
    })
  
    const hiddenElements = document.querySelectorAll('.animate');
    console.log(hiddenElements)
    hiddenElements.forEach((el)=>observer.observe(el));
  })

  return (
    <div>
      <Navbar />
      <main className="main">
        {children}
        <DefaultFooter />
      </main>
    </div>
  );
};

export default DefaultLayout;
