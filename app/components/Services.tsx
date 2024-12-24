"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Services() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <section
      id="expertise"
      className="w-full bg-[#cdb4db] px-[8rem] py-10 mx-auto rounded-lg flex flex-col"
    >
      <h1 className="mx-auto text-3xl font-semibold mb-7">OUR SERVICES</h1>
      <div className="flex justify-start items-start">
        <nav className=" p-2 rounded-t-lg">
          <ul className="flex flex-col list-none font-medium text-sm m-0 p-0 w-full gap-2.5">
            {tabs.map((item) => (
              <motion.li
                key={item.label}
                initial={false}
                animate={{
                  backgroundColor: item === selectedTab ? "#eee" : "#eee0",
                }}
                className="rounded-md px-3 py-2 flex justify-center items-center w-full cursor-pointer"
                onClick={() => setSelectedTab(item)}
              >
                <div className="flex justify-center items-center flex-col gap-2">
                  <span>{item.icon}</span>
                  <span
                    className={`text-black opacity-[0.5] ${
                      item === selectedTab ? "opacity-[1] underline" : ""
                    } `}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </nav>
        <main className="flex justify-center items-center flex-1 pb-10 w-[60%] text-center mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[18px] w-full px-10"
            >
              {selectedTab ? selectedTab.desc : "😋"}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </section>
  );
}

export const allIngredients = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 28C34.6774 33.3333 29.8387 33.3333 25 28"
          stroke="black"
        ></path>
        <path d="M24.5 21.5L34 18.5L40.5 22" stroke="black"></path>
        <rect
          x="9.5"
          y="18.5"
          width="4"
          height="29"
          rx="0.5"
          fill="#F6EBE7"
          stroke="black"
        ></rect>
        <rect
          x="13.5"
          y="5.5"
          width="2"
          height="8"
          rx="0.5"
          fill="white"
          stroke="black"
        ></rect>
        <path
          d="M9.35233 4.52505C9.41922 3.38791 10.3609 2.5 11.5 2.5C12.6391 2.5 13.5808 3.38791 13.6477 4.52505L14.4386 17.9706C14.4555 18.2578 14.2271 18.5 13.9394 18.5H9.06055C8.77287 18.5 8.54452 18.2578 8.56141 17.9706L9.35233 4.52505Z"
          fill="#F6EBE7"
          stroke="black"
        ></path>
        <rect
          x="16.25"
          y="8.25"
          width="2.5"
          height="0.5"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="16.25"
          y="6.25"
          width="2.5"
          height="0.5"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="16.25"
          y="10.25"
          width="2.5"
          height="0.5"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="16.25"
          y="12.25"
          width="2.5"
          height="0.5"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="32.25"
          y="32.25"
          width="0.5"
          height="3.5"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="29.1584"
          y="31.3595"
          width="0.5"
          height="4.1606"
          transform="rotate(30 29.1584 31.3595)"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="26.2776"
          y="29.7809"
          width="0.5"
          height="4.28339"
          transform="rotate(43.0533 26.2776 29.7809)"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="-0.0915063"
          y="0.341506"
          width="0.5"
          height="4.1606"
          transform="matrix(-0.866025 0.5 0.5 0.866025 35.5247 31.1095)"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
        <rect
          x="-0.0120102"
          y="0.353349"
          width="0.5"
          height="4.28339"
          transform="matrix(-0.730719 0.682678 0.682678 0.730719 38.4055 29.531)"
          fill="black"
          stroke="black"
          strokeWidth="0.5"
        ></rect>
      </svg>
    ),
    label: "BROW",
    desc: (
      <div className="flex justify-around w-full">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">HAIR BOTOX</h2>
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center gap-5">
              <p className="font-medium">Men - Crown area</p>
              <span>&#8377; 3999 /-</span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <p className="font-medium">Men - Upto Neck</p>
              <span>&#8377; 4499 /-</span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <p className="font-medium">Women - Upto Shoulder</p>
              <span>&#8377; 6999 /-</span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <p className="font-medium">Women - Below Shoulder</p>
              <span>&#8377; 7499 /-</span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <p className="font-medium">Women - Upto Waist</p>
              <span>&#8377; 7999 /-</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">NANOPLASTIA</h2>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Upto Shoulder</p>
                <span>&#8377; 6999 /-</span>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Below Shoulder</p>
                <span>&#8377; 7999 /-</span>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Upto Waist</p>
                <span>&#8377; 8999 /-</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">CERAMIDE TREATMENT</h2>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Men</p>
                <span>&#8377; 1999 /-</span>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Upto Shoulder</p>
                <span>&#8377; 1999 /-</span>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Below Shoulder</p>
                <span>&#8377; 3499 /-</span>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-medium">Women - Upto Waist</p>
                <span>&#8377; 4999 /-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M31 25.8V35.5C31 37.7 29.2 39.5 27 39.5H22C19.8 39.5 18 37.7 18 35.5V25.8C19.9 26.9 22.2 27.5 24.5 27.5C26.8 27.5 29.1 26.9 31 25.8Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M37 14C37 18.1 35 21.7 32 24C31.8 24.1 31.7 24.2 31.5 24.4C31.3 24.5 31.2 24.6 31 24.7C29.1 25.9 26.9 26.5 24.5 26.5C22.1 26.5 19.9 25.8 18 24.7C17.8 24.6 17.7 24.5 17.5 24.4C17.3 24.3 17.2 24.2 17 24C14 21.7 12 18.1 12 14C12 7.1 17.6 1.5 24.5 1.5C31.4 1.5 37 7.1 37 14Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M24.5 8.5C21.5 8.5 19 11 19 14C19 17 21.5 19.5 24.5 19.5C27.5 19.5 30 17 30 14C30 11 27.5 8.5 24.5 8.5ZM24.5 18.5C22 18.5 20 16.5 20 14C20 11.5 22 9.5 24.5 9.5C27 9.5 29 11.5 29 14C29 16.5 27 18.5 24.5 18.5Z"
          fill="black"
        ></path>
        <path
          d="M24.5 18.5C26.9853 18.5 29 16.4853 29 14C29 11.5147 26.9853 9.5 24.5 9.5C22.0147 9.5 20 11.5147 20 14C20 16.4853 22.0147 18.5 24.5 18.5Z"
          fill="white"
        ></path>
        <path
          d="M27.8002 40L27.5002 40.7L26.5002 43.1C26.3002 43.7 25.7002 44 25.1002 44H23.9002C23.3002 44 22.7002 43.6 22.5002 43.1L21.5002 40.7L21.2002 40H27.8002Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M24.5 0.5C17.1 0.5 11 6.6 11 14C11 18.7 13.4 22.8 17 25.2V35.5C17 37.9 18.7 39.8 20.9 40.4L22.1 43.3C22.4 44.1 23.1 44.5 23.9 44.5H24V47.5H25V44.5H25.1C25.9 44.5 26.6 44 26.9 43.3L28.1 40.4C30.3 39.9 32 37.9 32 35.5V25.2C35.6 22.8 38 18.7 38 14C38 6.6 31.9 0.5 24.5 0.5ZM26 42.9C25.8 43.3 25.5 43.5 25.1 43.5H23.9C23.5 43.5 23.1 43.3 23 42.9L22 40.5H27L26 42.9ZM31 35.5C31 37.7 29.2 39.5 27 39.5H22C19.8 39.5 18 37.7 18 35.5V25.8C19.9 26.9 22.2 27.5 24.5 27.5C26.8 27.5 29.1 26.9 31 25.8V35.5ZM32 24C31.8 24.1 31.7 24.2 31.5 24.4C31.3 24.5 31.2 24.6 31 24.7C29.1 25.9 26.9 26.5 24.5 26.5C22.1 26.5 19.9 25.8 18 24.7C17.8 24.6 17.7 24.5 17.5 24.4C17.3 24.3 17.2 24.2 17 24C14 21.7 12 18.1 12 14C12 7.1 17.6 1.5 24.5 1.5C31.4 1.5 37 7.1 37 14C37 18.1 35 21.7 32 24Z"
          fill="black"
        ></path>
      </svg>
    ),
    label: "HAIR",
    desc: "Stylish hair cuts, gorgeous styling, incredible color services and best hair treatments. Choose your dream service!",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.5"
          y="28.5"
          width="30"
          height="17"
          rx="0.5"
          fill="#F6EBE7"
          stroke="black"
        ></rect>
        <rect
          x="0.587637"
          y="0.392336"
          width="7.99994"
          height="28"
          rx="0.5"
          transform="matrix(0.980566 -0.196188 0.194708 0.980861 31.1772 18.2832)"
          fill="#F6EBE7"
          stroke="black"
        ></rect>
        <rect
          x="4.5"
          y="22.5"
          width="26"
          height="6"
          rx="0.5"
          fill="#F6EBE7"
          stroke="black"
        ></rect>
        <rect x="4" y="26" width="27" height="1" fill="black"></rect>
        <rect x="4" y="24" width="27" height="1" fill="black"></rect>
        <path
          d="M10.3729 10.7921C11.5938 12.1786 9.37646 13.8731 9.37646 13.8731C3.41986 17.5704 4.86385 21.0622 6.12737 22.5H28.9539C31 16 24.5948 16.6347 18.5 15C12.4052 13.3653 9.15201 9.40563 10.3729 10.7921Z"
          fill="white"
          stroke="black"
        ></path>
      </svg>
    ),
    label: "COSMETOLOGY",
    desc: "Indulge a little longer with a customized facial to help achieve your skin goals in 60-90 minutes.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M29.75 25.4999H29.25V25.9999V43.4999C29.25 45.6999 31.05 47.4999 33.25 47.4999C35.45 47.4999 37.25 45.6999 37.25 43.4999V25.9999V25.4999H36.75H29.75Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M28.7499 14.4999H28.1499L28.2499 15.0999L28.6499 18.5999L29.1499 25.0999V25.5999H29.6499H36.8499H37.3499V25.0999L37.8499 18.5999L38.2499 15.0999L38.3499 14.4999H37.7499H28.7499V14.4999Z"
          fill="white"
        ></path>
        <path
          d="M28.3501 14.5L23.8501 6.09998L24.1501 5.79998C28.9501 -0.300024 38.1501 -0.100024 42.7501 6.09998L38.2501 14.6H28.3501V14.5Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M23.55 6.49995L27.75 14.4L28.25 18.6L28.75 26V43.5C28.75 46 30.75 48 33.25 48C35.75 48 37.75 46 37.75 43.5V26L38.35 18.6L38.85 14.4L43.25 5.99995L43.05 5.69995C40.75 2.59995 37.35 0.799951 33.45 0.699951C29.55 0.699951 26.05 2.29995 23.65 5.39995L23.25 5.99995L23.35 6.19995L23.55 6.49995ZM24.45 5.99995C26.65 3.19995 29.95 1.69995 33.45 1.69995C36.85 1.79995 39.95 3.29995 42.05 5.99995L37.85 14H36.05L38.25 9.39995L37.35 8.99995L34.95 14H33.75V8.99995H32.75V14H31.45L29.05 8.99995L28.15 9.39995L30.35 14H28.55L24.45 5.99995ZM36.75 43.5C36.75 45.4 35.15 47 33.25 47C31.35 47 29.75 45.4 29.75 43.5V26H36.75V43.5ZM37.35 18.5L36.85 25H29.65L29.15 18.5L28.75 15H32.75H33.75H37.75L37.35 18.5Z"
          fill="black"
        ></path>
        <path
          d="M5.75 31.4999H16.75C17.05 31.4999 17.25 31.6999 17.25 31.9999V45.9999C17.25 46.2999 17.05 46.4999 16.75 46.4999H5.75C5.45 46.4999 5.25 46.2999 5.25 45.9999V31.9999C5.25 31.6999 5.45 31.4999 5.75 31.4999Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M6.75 14.4999H15.75C16.05 14.4999 16.25 14.6999 16.25 14.9999V30.9999C16.25 31.2999 16.05 31.4999 15.75 31.4999H6.75C6.45 31.4999 6.25 31.2999 6.25 30.9999V14.9999C6.25 14.6999 6.45 14.4999 6.75 14.4999Z"
          fill="#F6EBE7"
        ></path>
        <path
          d="M14.25 14.4999H8.25V8.89994C8.25 8.19994 8.35 7.39994 9.05 6.69994C9.75 5.99994 10.95 5.29994 13.35 4.99994C13.45 4.99994 13.45 4.99994 13.45 4.99994C13.45 4.99994 13.55 5.09994 13.65 5.29994C13.85 5.59994 13.95 6.19994 14.05 6.99994C14.25 8.59994 14.25 10.9999 14.25 14.4999Z"
          fill="white"
        ></path>
        <path
          d="M16.75 30.9999V14.9999C16.75 14.3999 16.35 13.9999 15.75 13.9999H14.75C14.75 10.6999 14.75 8.49994 14.55 6.99994C14.45 6.09994 14.35 5.49994 14.15 5.09994C14.05 4.89994 13.95 4.69994 13.85 4.59994C13.75 4.49994 13.55 4.49994 13.35 4.49994C11.15 4.79994 9.65 5.39994 8.75 6.39994C8.05 7.09994 7.75 7.89994 7.75 8.89994V13.9999H6.75C6.15 13.9999 5.75 14.3999 5.75 14.9999V30.9999C5.15 30.9999 4.75 31.3999 4.75 31.9999V45.9999C4.75 46.5999 5.15 46.9999 5.75 46.9999H16.75C17.35 46.9999 17.75 46.5999 17.75 45.9999V31.9999C17.75 31.3999 17.35 30.9999 16.75 30.9999ZM8.75 8.89994C8.75 8.09994 8.95 7.49994 9.45 6.99994C10.15 6.19994 11.45 5.69994 13.25 5.39994C13.35 5.59994 13.45 5.99994 13.55 6.89994C13.75 8.49994 13.75 10.6999 13.75 13.9999H8.75V8.89994ZM6.75 14.9999H7.75H14.75H15.75V30.9999H6.75V14.9999ZM16.75 45.9999H5.75V31.9999V31.4999V31.9999H6.75H15.75H16.75V45.9999Z"
          fill="black"
        ></path>
      </svg>
    ),
    label: "MAKEUP",
    desc: "Complete your service with beautiful makeup and simply be amazing with complete look.",
  },
];

const [BROW, HAIR, COSMETOLOGY, MAKEUP] = allIngredients;
const tabs = [BROW, HAIR, COSMETOLOGY, MAKEUP];
