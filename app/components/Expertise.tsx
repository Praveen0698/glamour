"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Expertise() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <section
      id="expertise"
      className="w-[90%] sm:w-[75%] lg:w-[60%] py-10 md:py-16 mx-auto rounded-lg bg-white flex flex-col"
    >
      <h1 className="mx-auto text-3xl md:text-5xl font-semibold text-center">
        OUR EXPERTISE
      </h1>
      <nav className="bg-[#fdfdfd] p-2 border-b border-gray-200 rounded-t-lg my-10">
        <ul className="flex flex-wrap w-full list-none font-medium text-sm md:text-base m-0 p-0">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="rounded-md px-3 py-2 flex justify-center items-center w-full md:w-auto cursor-pointer"
              onClick={() => setSelectedTab(item)}
            >
              <div className="flex justify-center items-center flex-col gap-2">
                <span>{item.icon}</span>
                <span
                  className={`text-black opacity-50 ${
                    item === selectedTab ? "opacity-100 underline" : ""
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="flex justify-center items-center flex-1 pb-10 w-[90%] sm:w-[75%] lg:w-[60%] text-center mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.desc : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-base md:text-lg"
          >
            {selectedTab ? selectedTab.desc : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </section>
  );
}

const tabs = [
  {
    icon: "💅",
    label: "NAILS",
    desc: "Get your nails done for great mood. Simple pleasures can make your week, not just day.",
  },
  {
    icon: "👁️",
    label: "BROW",
    desc: "Brows can change it all. Try out styling and tinting your brows and see the difference.",
  },
  {
    icon: "💇",
    label: "HAIR",
    desc: "Take care of your hair. You’re never fully dressed without great hair!",
  },
];
