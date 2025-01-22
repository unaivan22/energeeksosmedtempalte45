import React, { useState, useRef, useEffect } from 'react';
import EXIFR from 'exifr';
import { Input } from '@/components/ui/input';
import { toPng } from 'html-to-image';
import heic2any from "heic2any";
import Footer from '../../Footer';
import { Button } from '@/components/ui/button';
import { Camera, ChevronLeft, Download, Edit, Loader2, RotateCcw, Upload, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { motion } from "framer-motion";
import { Walktour } from 'walktour'
import UploadAnimation from '../utils/UploadAnimation';
import TypefaceTitle from '../utils/TypefaceTitle';
import LogoWhite from '../utils/LogoWhite';


function QuoteStyleOne() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(true);
  const elementRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isExample, setIsExample] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedCaption, setIsCheckedCaption] = useState(false);
  const [isCheckedDesc, setIsCheckedDesc] = useState(true);
  const [isCheckedPersonName, setIsCheckedPersonName] = useState(true);
  const [isCheckedJabatanPerson, setIsCheckedJabatanPerson] = useState(true);
  const [isCheckedCopyright, setIsCheckedCopyright] = useState(true);

  const [inputEventDescDesc, setInputEventDescDesc] = useState('Enter title text');
  const [inputEventDescPerson, setInputEventDescPerson] = useState('Enter person name');
  const [inputEventDescJabatan, setInputEventDescJabatan] = useState('Enter jabatan');
  const [inputEventDescCopyright, setInputEventDescCopyright] = useState('Google | Pinterest : ');
  const constraintsRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      try {
        if (fileType === 'image/heic' || fileType === 'image/heif' || fileName.endsWith('.heic')) {
          const blob = await heic2any({ blob: file, toType: 'image/png' });
          const url = URL.createObjectURL(blob);
          setPreviewURL(url);
        } else if (fileType === 'image/jpeg' || fileType === 'image/png') {
          const reader = new FileReader();
          reader.onload = (e) => setPreviewURL(e.target.result);
          reader.readAsDataURL(file);
        } else {
          alert("Only JPG, PNG, and HEIC formats are supported.");
        }
      } catch (error) {
        console.error("Error converting HEIC image:", error);
        alert("Failed to display HEIC image.");
      }
    }
  };

  const htmlToImageConvert = () => {
    const element = elementRef.current;
    const scale = 2.16; // Scale factor
  
    toPng(element, { cacheBust: false, quality: 1, pixelRatio: scale }) // quality ranges from 0 to 1
      .then((dataUrl) => {
        const img = new window.Image(); // Specify `window.Image` to avoid scope conflicts
        img.src = dataUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = element.offsetWidth * scale;
          canvas.height = element.offsetHeight * scale;
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = true; // Enable image smoothing for HD
          ctx.imageSmoothingQuality = 'high';
          // Draw the image onto the canvas at the desired scale
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          // Convert the canvas to a PNG and trigger the download
          canvas.toBlob((blob) => {
            const link = document.createElement("a");
            link.download = "export.png";
            link.href = URL.createObjectURL(blob);
            link.click();
          }, "image/png");
        };
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  const handleReset = () => {
    window.location.reload();
  };

  const [sliderValueScale, setSliderValueScale] = useState(1);
  const handleSliderChangeScale = (event) => {
    setSliderValueScale(event.target.value);
  };

  const handleInputChangeEventDesc = (value) => {
    setInputEventDescDesc(value);
  };

  const handleInputChangeEventPerson = (value) => {
    setInputEventDescPerson(value);
  };

  const handleInputChangeEventDescJabatan = (value) => {
    setInputEventDescJabatan(value);
  };

  const handleInputChangeEventCopyright = (value) => {
    setInputEventDescCopyright(value);
  };

  const HtmlRenderer = ({ html }) => {
    const parsedHtml = parse(html, {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          // Remove leading and trailing whitespaces
          return domNode.data.trim();
        }
      },
    });
  
    return <>{parsedHtml}</>;
  };

  const fullToolbarOptions = [
    // [{ 'header': '1'}, { 'header': '2'}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],
    // [{ 'indent': '-1'}, { 'indent': '+1' }],
    // [{ 'direction': 'rtl' }],
    // [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    // [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    // ['link'],
    ['clean']
  ];

  return (
    <div className='container flex flex-col justify-center'>
      {!previewURL && (
        <div className='grid h-screen place-items-center'>
          <div className='w-[320px] relative bg-stone-100 dark:bg-stone-900 p-6 rounded-2xl shadow flex flex-col items-center justify-center gap-2 border'>
            <Link to='/' className='absolute top-3 left-3'>
              <Button variant='outline' size='icon' className='rounded-full bg-stone-50 dark:bg-stone-900'><X /></Button>
            </Link>
            {/* <Upload className='w-12 h-12' /> */}
            <UploadAnimation />
            <p className='text-lg font-semibold'>Pilih file dahulu</p>
            <p className='text-center text-xs opacity-70 font-light'>Pastikan gambar menggunakan format .png/.jpg/.jpeg/.heic</p>
          <Input type="file" accept="image/jpeg,image/png,image/heic, .dng" onChange={handleImageChange} className='my-4' disabled={isDisable} id='StepName' />
          </div>
        </div>
      )}
      {/* {isExample && (
      <img src='https://raw.githubusercontent.com/unaivan22/assets/main/frame/frame.png' />
      )} */}

      {isLoading && (
      <div className=' flex items-center justify-center w-full gap-x-2 text-sm py-4'>
        <Loader2 className='animate-spin h-4 w-4' />
        Loading... Please wait a moment
      </div>
      )}

      {previewURL && (
      <div className='relative gap-6 mt-12'>
        <Link to='/' className='absolute'>
          <Button variant="outline" size="icon" className='rounded-full'><ChevronLeft /></Button>
        </Link>
        <div className={`safe-area flex items-start justify-start w-full scale-[.7] -translate-y-[20vh] -translate-x-[10vw]`}>
          <div className={`w-[1200px] h-[1500px] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center renderthis bg-[#E74C3C]` } ref={elementRef}>
            {/* {previewURL && (
              <div className='cursor-grab' id='StepName'>
                <motion.div className="absolute bottom-0 left-0" ref={constraintsRef} />
                <motion.img src={previewURL} alt="Preview" className={` absolute bottom-0 left-0 z-50 scale-${sliderValueScale}`}  drag dragConstraints={constraintsRef}/>
              </div>
            )} */}
            
            {previewURL && (
              <div className='absolute top-10 left-20 z-50'>
                <LogoWhite />
              </div>
            )}

            {previewURL && (
              <div className='z-50 absolute w-[1040px] grid h-[1000px] place-items-center'>
                {isCheckedDesc && (
                  <div className='mb-12 pr-[20px]'>
                    <div className='flex flex-col text-left htmlrender-detail min-w-[940px]'>
                      <h1 className='text-white text-[128px] w-full text-left leading-[0] mt-32'>"</h1>
                      <h1 className='text-white text-[3.5rem] leading-[3.5rem] w-full text-right leading-tight' id='title'>{isCheckedDesc ? ( <div><HtmlRenderer html={inputEventDescDesc} /></div> ) : null} </h1>
                      <h1 className='text-white text-[128px] w-full text-right leading-tight -translate-y-[16px]'>"</h1>
                    </div>
                    <div className='flex flex-col text-left'>
                      <h1 className='text-white text-[2.5rem] w-full text-right font-bold leading-none'>{isCheckedPersonName ? ( <div><HtmlRenderer html={inputEventDescPerson} /></div> ) : null} </h1>
                      <p className='text-white w-full text-[2rem] font-light text-right'>{isCheckedJabatanPerson ? ( <div><HtmlRenderer html={inputEventDescJabatan} /></div> ) : null}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

          <div className='z-50 absolute bottom-12 right-[100px]'>
            <div className='mb-12'>
              <div className='flex flex-col text-left'>
              <p className='text-white w-full text-[2rem] font-light text-right'>{isCheckedCopyright ? ( <div className='flex items-center gap-2 justify-end'><Camera className='w-8 h-8' /><HtmlRenderer html={inputEventDescCopyright} /></div> ) : null}</p>
              </div>
            </div>
          </div>

            {/* {previewURL && (
              <div className='z-50 p-6 absolute bottom-40 w-[900px] z-50'>
                <div className='flex flex-col text-left'>
                  <h1 className='text-white text-[2rem] w-full text-right font-bold leading-none'>{isCheckedPersonName ? ( <div><HtmlRenderer html={inputEventDescPerson} /></div> ) : null} </h1>
                  <p className='text-white w-full text-[1.5rem] font-light text-right'>{isCheckedJabatanPerson ? ( <div><HtmlRenderer html={inputEventDescJabatan} /></div> ) : null}</p>
                </div>
              </div>
            )} */}

            {/* <img className='w-72 absolute -bottom-12 -right-20 z-[10]' src='/radial-2.svg' /> */}

            <svg className='absolute -bottom-24 -right-40 z-[10]' width="576" height="576" viewBox="0 0 1026 1026" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M512.723 1025.5C795.856 1025.5 1025.38 795.975 1025.38 512.843C1025.38 229.71 795.856 0.185547 512.723 0.185547C229.591 0.185547 0.0664062 229.71 0.0664062 512.843C0.0664062 795.975 229.591 1025.5 512.723 1025.5Z" fill="url(#paint0_radial_38_133)"/>
              <defs>
              <radialGradient id="paint0_radial_38_133" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512.723 512.843) rotate(90) scale(512.657)">
              <stop stop-color="#FF978B"/>
              <stop offset="1" stop-color="#FF978B" stop-opacity="0"/>
              </radialGradient>
              </defs>
            </svg>

            
            <div className='absolute bottom-0 left-0 h-64 w-full'>
              <div className='bg-gradient-to-t from-[#E74C3C] via-[#E74C3C] to-[#E74C3C00] h-64'></div>
            </div>
            
          </div>
        </div>
        {previewURL && (
        <div className='  absolute translate-y-[10vh] max-w-[400px] top-0 right-0 bg-stone-50 dark:bg-stone-900 shadow-xl border p-6 rounded-2xl'>
          <div className='flex flex-col gap-y-2 justify-between h-full'>
            <div className='flex flex-col gap-y-3'>
              <h1 className='font-semibold text-xl mb-4'>Costumize</h1>
              <Tabs defaultValue="deskripsi" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                  <TabsTrigger value="nama">Nama</TabsTrigger>
                  <TabsTrigger value="jabatan">Jabatan</TabsTrigger>
                  <TabsTrigger value="copyright">Copyright</TabsTrigger>
                </TabsList>
                <TabsContent value="deskripsi">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center justify-between mb-2">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedDesc} onChange={() => setIsCheckedDesc(!isCheckedDesc)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Deskripsi</span>
                        </label>
                        <TypefaceTitle />
                    </div>
                    {isCheckedDesc? ( 
                        <ReactQuill
                          theme="snow"
                          value={inputEventDescDesc}
                          onChange={handleInputChangeEventDesc}
                          modules={{ toolbar: fullToolbarOptions }}
                          className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                          />
                      ) : null} 
                  </div>
                </TabsContent>
                <TabsContent value="nama">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedPersonName} onChange={() => setIsCheckedPersonName(!isCheckedPersonName)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</span>
                        </label>
                    </div>
                    {isCheckedPersonName? ( 
                        <ReactQuill
                        theme="snow"
                        value={inputEventDescPerson}
                        onChange={handleInputChangeEventPerson}
                        modules={{ toolbar: fullToolbarOptions }}
                        className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                        />
                      ) : null} 
                  </div>
                </TabsContent>
                <TabsContent value="jabatan">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedJabatanPerson} onChange={() => setIsCheckedJabatanPerson(!isCheckedJabatanPerson)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Jabatan</span>
                        </label>
                    </div>
                    {isCheckedJabatanPerson? ( 
                        <ReactQuill
                        theme="snow"
                        value={inputEventDescCopyright}
                        onChange={handleInputChangeEventDescJabatan}
                        modules={{ toolbar: fullToolbarOptions }}
                        className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                        />
                      ) : null} 
                  </div>
                </TabsContent>
                <TabsContent value="copyright">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedCopyright} onChange={() => setIsCheckedCopyright(!isCheckedCopyright)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Copyright</span>
                        </label>
                    </div>
                    {isCheckedCopyright? ( 
                        <ReactQuill
                        theme="snow"
                        value={inputEventDescCopyright}
                        onChange={handleInputChangeEventCopyright}
                        modules={{ toolbar: fullToolbarOptions }}
                        className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                        />
                      ) : null} 
                  </div>
                </TabsContent>
              </Tabs>
              <div className='flex flex-col gap-1'>
                {/* <p className='text-sm'>Zoom ({sliderValueScale})</p> */}
                {/* <input type="range" min={1} max={30} value={sliderValueScale} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeScale} /> */}
                {/* <p className='text-xs opacity-70'>Jika gambar tidak bisa digeser maka zoom dulu, *issue di hosting </p> */}
              </div>
            </div>
            <div className='flex gap-2 w-full'>
              <Button variant='outline' className='w-full' onClick={handleReset} > <RotateCcw className='w-4 h-4 mr-2' /> Reset</Button>
              <Button className='w-full' onClick={htmlToImageConvert}> <Download className='w-4 h-4 mr-2' /> Download</Button>
            </div>
          </div>
        </div>
        )}
      </div>
      )}
    </div>
  );
}

export default QuoteStyleOne;
