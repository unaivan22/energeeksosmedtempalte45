import React, { useEffect, useState, useRef } from "react";
import data from "../pages/data.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";
import Footer from "./Footer";

import Lottie from "react-lottie-player";
import welcomeData from "./lottie/welcome.json";
import Header from "./Header";

export default function Welcome() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const cardRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    const updatePosition = (event) => {
      const card = cardRef.current;
      if (card) {
        const bounds = card.getBoundingClientRect();
        const posX = event.clientX - bounds.x;
        const posY = event.clientY - bounds.y;
        const ratioX = posX / bounds.width;
        const ratioY = posY / bounds.height;

        card.style.setProperty("--ratio-x", ratioX);
        card.style.setProperty("--ratio-y", ratioY);
      }
    };

    document.body.addEventListener("pointermove", updatePosition);

    return () => {
      document.body.removeEventListener("pointermove", updatePosition);
    };
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Tabs
          defaultValue="post"
          className="full mt-32 mb-24 flex flex-col items-start justify-center px-[12vw]"
        >
          <TabsList className="grid w-full grid-cols-5 w-[380px]">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="reel">Reel</TabsTrigger>
            <TabsTrigger value="fact">Fact</TabsTrigger>
            <TabsTrigger value="joke">Joke</TabsTrigger>
            <TabsTrigger value="quote">Quote</TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <div className="flex flex-col w-full mt-8">
              <p className="font-semibold text-3xl mb-1">
                Post Template
              </p>
              <p className="text-light opacity-50 text-sm mb-2">
                Hasil export menggunakan ukuran 4:5
              </p>
              <div
                className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-[1px]"
                id="template"
                ref={myRef}
              >
                {data.PostProjects.map((projectExp, i) => {
                  return (
                    <div className="flex flex-col">
                      <Link
                        key={projectExp.id}
                        to={projectExp.link}
                        className="relative flex-shirk-0 w-auto justify-center overflow-y-hidden"
                      >
                        <img
                          src={projectExp.src}
                          className="w-full object-cover border"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reel">
            <div className="flex flex-col w-full mt-8">
              <p className="font-semibold text-3xl mb-1">
                Reel Template
              </p>
              <p className="text-light opacity-50 text-sm mb-2">
                Hasil export menggunakan ukuran 1080x1920
              </p>
              <div
                className="grid grid-cols-2 lg:grid-cols-4 mt-4"
                id="template"
                ref={myRef}
              >
                {data.ReelProjects.map((projectExp, i) => {
                  return (
                    <div className="flex flex-col">
                      <Link
                        key={projectExp.id}
                        to={projectExp.link}
                        className="relative flex-shirk-0 w-auto justify-center overflow-y-hidden"
                      >
                        <img
                          src={projectExp.src}
                          className="w-full object-cover"
                        />
                      </Link>
                      {/* <div className="flex justify-between">
                        <p className="font-base text-sm text-stone-600">
                          {projectExp.projectname}
                        </p>
                        <p className="font-light text-sm text-stone-400 capitalize px-3 py-1 rounded-2xl bg-stone-100">
                          {projectExp.type}
                        </p>
                      </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="fact">
            <div className="flex flex-col w-full mt-8">
              <p className="font-semibold text-3xl mb-1">
                Fact Template
              </p>
              <p className="text-light opacity-50 text-sm mb-2">
                Hasil export menggunakan ukuran 4:5
              </p>
              <div
                className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-[1px]"
                id="template"
                ref={myRef}
              >
                {data.FactProjects.map((projectExp, i) => {
                  return (
                    <div className="flex flex-col">
                      <Link
                        key={projectExp.id}
                        to={projectExp.link}
                        className="relative flex-shirk-0 w-auto justify-center overflow-y-hidden"
                      >
                        <img
                          src={projectExp.src}
                          className="w-full object-cover border"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="joke">
            <div className="flex flex-col w-full mt-8">
              <p className="font-semibold text-3xl mb-1">
                Joke Template
              </p>
              <p className="text-light opacity-50 text-sm mb-2">
                Hasil export menggunakan ukuran 4:5
              </p>
              <div
                className="grid grid-cols-2 gap-1 lg:grid-cols-3 mt-4"
                id="template"
                ref={myRef}
              >
                {data.JokeProjects.map((projectExp, i) => {
                  return (
                    <div className="flex flex-col">
                      <Link
                        key={projectExp.id}
                        to={projectExp.link}
                        className="relative flex-shirk-0 w-auto justify-center overflow-y-hidden"
                      >
                        <img
                          src={projectExp.src}
                          className="w-full object-cover border"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="quote">
            <div className="flex flex-col w-full mt-8">
              <p className="font-semibold text-3xl mb-1">
                Quote Template
              </p>
              <p className="text-light opacity-50 text-sm mb-2">
                Hasil export menggunakan ukuran 4:5
              </p>
              <div
                className="grid grid-cols-2 gap-1 lg:grid-cols-3 mt-4"
                id="template"
                ref={myRef}
              >
                {data.QuoteProjects.map((projectExp, i) => {
                  return (
                    <div className="flex flex-col">
                      <Link
                        key={projectExp.id}
                        to={projectExp.link}
                        className="relative flex-shirk-0 w-auto justify-center overflow-y-hidden"
                      >
                        <img
                          src={projectExp.src}
                          className="w-full object-cover border"
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
