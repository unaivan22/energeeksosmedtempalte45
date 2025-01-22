import React, { useState, useRef, useEffect } from 'react';
import EXIFR from 'exifr';
import { Input } from '@/components/ui/input';
import { toPng } from 'html-to-image';
import heic2any from "heic2any";
import Footer from '../../Footer';
import { Button } from '@/components/ui/button';
import { Camera, ChevronLeft, Download, Edit, Image, Loader2, RotateCcw, Upload, X } from 'lucide-react';
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
import LogoWhite from '../utils/LogoWhite';
import LogoRed from '../utils/LogoRed';
import TypefaceTitle from '../utils/TypefaceTitle';
import UploadAnimation from '../utils/UploadAnimation';

function PostStyleNine() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const elementRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isCheckedOverlay, setIsCheckedOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedCaption, setIsCheckedCaption] = useState(false);
  const [isCheckedTitle, setIsCheckedTitle] = useState(true);
  const [isCheckedSubTitle, setIsCheckedSubTitle] = useState(true);

  const [inputEventDescTitle, setInputEventDescTitle] = useState('Enter title text');
  const [inputEventDescSubTitle, setInputEventDescSubTitle] = useState('Enter subtitle text');
  const constraintsRef = useRef(null);
  const [isCheckedCopyright, setIsCheckedCopyright] = useState(true);
  const [inputEventDescCopyright, setInputEventDescCopyright] = useState('Google | Pinterest : ');

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

  const handleInputChangeEventDescTitle = (value) => {
    setInputEventDescTitle(value);
  };

  const handleInputChangeEventDescSubTitle = (value) => {
    setInputEventDescSubTitle(value);
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
            <p></p>
          <Input type="file" accept="image/jpeg,image/png,image/heic, .dng" onChange={handleImageChange} className='my-4' disabled={isDisable} />
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
          <div className={`w-[1200px] h-[1500px] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center bg-white renderthis` } ref={elementRef}>
            {previewURL && (
              <div className='cursor-grab top-0' id='StepName'>
                <motion.div className="" ref={constraintsRef} />
                <motion.img src={previewURL} alt="Preview" className={`absolute bottom-0 left-0 scale-${sliderValueScale}`}  drag dragConstraints={constraintsRef}/>
              </div>
            )}
            

            {isCheckedOverlay && (
              <div className='absolute top-10 left-20 z-50'>
                <LogoRed />
              </div>
            )}

            {isCheckedOverlay && (
              <div className='z-50 pb-6 absolute top-[250px] w-[940px]'>
                <div className='flex flex-col text-left gap-5 htmlrender-detail'>
                  <h1 className='text-[#E74C3C] text-[3.2rem] w-full font-bold leading-none' id='title'>{isCheckedTitle ? ( <div><HtmlRenderer html={inputEventDescTitle} /></div> ) : null} </h1>
                  <p className='text-[#E74C3C] w-full text-[1.8rem]'>{isCheckedSubTitle ? ( <div><HtmlRenderer html={inputEventDescSubTitle} /></div> ) : null}</p>
                </div>
              </div>
            )}

            {isCheckedOverlay && (
              <div className='z-[999] pb-6 absolute bottom-10 w-[1040px]'>
                <div className='flex flex-col text-center gap-2 htmlrender-detail'>
                  <p className='text-white w-full text-[2rem] font-light text-center'> {isCheckedCopyright ? ( <div className='flex items-center gap-2 justify-start'><Camera className='w-8 h-8' /> <HtmlRenderer html={inputEventDescCopyright} /></div> ) : null}</p>
                </div>
              </div>
            )}

            <svg width="1154" height="1154" className='z-50 scale-[.5] absolute -top-[460px] -right-[500px] opacity-20' viewBox="0 0 577 577" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_38_123)">
              <path d="M288.38 576.413C447.469 576.413 576.436 447.446 576.436 288.357C576.436 129.268 447.469 0.300781 288.38 0.300781C129.291 0.300781 0.324219 129.268 0.324219 288.357C0.324219 447.446 129.291 576.413 288.38 576.413Z" fill="url(#paint0_radial_38_123)"/>
              </g>
              <defs>
              <radialGradient id="paint0_radial_38_123" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(288.38 288.357) rotate(90) scale(288.056)">
              <stop stop-color="#B33022"/>
              <stop offset="1" stop-color="#B33022" stop-opacity="0"/>
              </radialGradient>
              <clipPath id="clip0_38_123">
              <rect width="577" height="577" fill="white"/>
              </clipPath>
              </defs>
            </svg>


            <svg width="1154" height="1154" className='scale-[.4] absolute -bottom-[460px] -left-[500px]' viewBox="0 0 577 577" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_38_123)">
              <path d="M288.38 576.413C447.469 576.413 576.436 447.446 576.436 288.357C576.436 129.268 447.469 0.300781 288.38 0.300781C129.291 0.300781 0.324219 129.268 0.324219 288.357C0.324219 447.446 129.291 576.413 288.38 576.413Z" fill="url(#paint0_radial_38_123)"/>
              </g>
              <defs>
              <radialGradient id="paint0_radial_38_123" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(288.38 288.357) rotate(90) scale(288.056)">
              <stop stop-color="#B33022"/>
              <stop offset="1" stop-color="#B33022" stop-opacity="0"/>
              </radialGradient>
              <clipPath id="clip0_38_123">
              <rect width="577" height="577" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <svg width="1154" height="1154" className='scale-[.5] absolute -bottom-[460px] -right-[500px]' viewBox="0 0 577 577" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_38_123)">
              <path d="M288.38 576.413C447.469 576.413 576.436 447.446 576.436 288.357C576.436 129.268 447.469 0.300781 288.38 0.300781C129.291 0.300781 0.324219 129.268 0.324219 288.357C0.324219 447.446 129.291 576.413 288.38 576.413Z" fill="url(#paint0_radial_38_123)"/>
              </g>
              <defs>
              <radialGradient id="paint0_radial_38_123" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(288.38 288.357) rotate(90) scale(288.056)">
              <stop stop-color="#B33022"/>
              <stop offset="1" stop-color="#B33022" stop-opacity="0"/>
              </radialGradient>
              <clipPath id="clip0_38_123">
              <rect width="577" height="577" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            {isCheckedOverlay && (
              <div className='absolute bottom-0 left-0 h-[140px] w-full'>
                <div className='bg-gradient-to-t from-[#E74C3C] via-[#E74C3C26] to-[#E74C3C00] h-full'></div>
              </div>
            )}

            {isCheckedOverlay && (
              <div className='absolute top-0 left-0 h-[1000px] w-full'>
                <div className='bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#ffffff00] h-full'></div>
              </div>
            )}
            
          </div>
        </div>
        {previewURL && (
        <div className='absolute translate-y-[10vh] max-w-[400px] top-0 right-0 bg-stone-50 dark:bg-stone-900 shadow-xl border p-6 rounded-2xl'>
          <div className='flex flex-col gap-y-2 justify-between h-full'>
            <div className='flex flex-col gap-y-3'>
              <div className="flex items-center items-center justify-between">
                <h1 className='font-semibold text-xl mb-4'>Costumize</h1>
                <label className="inline-flex items-center cursor-pointer mb-1">
                  <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedOverlay} onChange={() => setIsCheckedOverlay(!isCheckedOverlay)} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Overlay</span>
                </label>
              </div>
              <Tabs defaultValue="title" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="title">Title</TabsTrigger>
                  <TabsTrigger value="subtitle">Sub Title</TabsTrigger>
                  <TabsTrigger value="copyright">Copyright</TabsTrigger>
                </TabsList>
                <TabsContent value="title">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center justify-between mb-2">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                          <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedTitle} onChange={() => setIsCheckedTitle(!isCheckedTitle)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Title</span>
                        </label>
                        <TypefaceTitle />
                    </div>
                    {isCheckedTitle? ( 
                        <ReactQuill
                          theme="snow"
                          value={inputEventDescTitle}
                          onChange={handleInputChangeEventDescTitle}
                          modules={{ toolbar: fullToolbarOptions }}
                          className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                          />
                      ) : null} 
                  </div>
                </TabsContent>
                <TabsContent value="subtitle">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center">
                        {/* <input id="textSubTitle" type="checkbox" value="" checked={isCheckedSubTitle} onChange={() => setIsCheckedSubTitle(!isCheckedSubTitle)}  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="textSubTitle" className="ms-2 text-sm font-medium ">Sub Title</label> */}
                        <label className="inline-flex items-center cursor-pointer mb-1">
                          <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedSubTitle} onChange={() => setIsCheckedSubTitle(!isCheckedSubTitle)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sub Title</span>
                        </label>
                    </div>
                    {isCheckedSubTitle? ( 
                        <ReactQuill
                        theme="snow"
                        value={inputEventDescSubTitle}
                        onChange={handleInputChangeEventDescSubTitle}
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
                <p className='text-sm'>Zoom ({sliderValueScale})</p>
                <input type="range" min={1} max={30} value={sliderValueScale} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeScale} />
                <p className='text-xs opacity-70'>Jika gambar tidak bisa digeser maka zoom dulu, *issue di hosting </p>
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
      {previewURL && (
        <Walktour
          steps={[
            {selector: "#StepName", title: "Drag Photo", description: "Grab and hold photo to reposition"}
          ]}
        />
      )}
    </div>
  );
}

export default PostStyleNine;
