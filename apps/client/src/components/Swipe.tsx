import React from "react";
import Cross from "../assets/Cross";

interface IProps {
  children?: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  heading?: string;
}

const Drawer = ({ children, isOpen, setIsOpen, heading }: IProps) => (
  <main
    className={`fixed overflow-hidden z-99 bg-opacity-25 inset-0 transform ease-in-out ${
      isOpen
        ? " transition-opacity opacity-100 duration-500 translate-x-0  "
        : " transition-all delay-500 opacity-0 translate-x-full  "
    }`}
  >
    <section
      className={`w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ${
        isOpen ? " translate-x-0 " : " translate-x-full "
      }`}
    >
      <article className="relative w-screen max-w-lg p-6 flex flex-col overflow-y-scroll h-full">
        <div className="flex items-center justify-between mb-10">
          <header className="font-semibold text-2xl">{heading}</header>
          <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <Cross />
          </div>
        </div>
        {children}
      </article>
    </section>
    <section
      className="w-screen h-full cursor-pointer"
      onClick={() => {
        setIsOpen(false);
      }}
    />
  </main>
);

export default Drawer;
