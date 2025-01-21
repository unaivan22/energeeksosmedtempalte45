import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocPost from "./doc/DocPost";
import DocRell from "./doc/DocReel";
import Footer from "./Footer";
import Header from "./Header";

export default function Documentation() {
  return (
    <div>
      <Header />
      <div>
        <div className="h-[50vh] grid place-items-center rounded-3xl bg-stone-100 dark:bg-stone-900 radialpattern">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-semibold text-3xl pt-16">Doc here</h1>
            <p className="text-sm opacity-70 font-light w-full px-[20vw] text-center">
              Dirancang untuk mempermudah administrator media sosial dalam
              melakukan templating konten. Dengan adanya template yang telah
              tersedia, diharapkan mampu menjadi standarisasi dan mempercepat
              pekerjaan admin, sehingga tidak perlu menunggu bantuan dari
              desainer UI/UX jika mereka tengah ditimbun load kerja yang tinggi.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full">Changelog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Changelog</DialogTitle>
                  <DialogDescription>
                    Perubahan yang dilakukan
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4 overflow-y-scroll gap-6">
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">06 Desember 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Penambahan konten - grayscale
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">21 November 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Improve sharpen image result
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">08 November 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Change textarea to wysiwyg quill
                      </li>
                      <li className="text-sm font-light italic opacity-70">
                        Improve UX{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">07 November 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Fixing zoom and draggable image
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">05 November 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Change asset url deploy
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col h-fit">
                    <h5 className="font-semibold">30 Oktober 2024</h5>
                    <ul className="list-disc list-inside">
                      <li className="text-sm font-light italic opacity-70">
                        Pertama deploy
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="grid place-items-center px-[12vw] mt-12">
        <Tabs
          defaultValue="post"
          className="w-full p-6 w-[60%] border rounded-xl mb-12"
        >
          <TabsList className="grid w-full grid-cols-2 w-[200px]">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="reel">reel</TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <DocPost />
          </TabsContent>
          <TabsContent value="reel">
            <DocRell />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
