import React, { useState, useRef, useEffect } from 'react';
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
import UploadAnimation from '../utils/UploadAnimation';
import LogoRedXs from '../utils/LogoRedXs';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

function TwibbonStyleOne() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const elementRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedTitle, setIsCheckedTitle] = useState(true);
  const [inputEventDescTitle, setInputEventDescTitle] = useState('CELEBRATING');
  const [inputEventDescSubTitle, setInputEventDescSubTitle] = useState('1 YEAR OF EXPERIENCE');
  const [inputPersonName, setInputPersonName] = useState('JARED PALMER');
  const [inputPersonPosition, setInputPersonPosition] = useState('Design Engineer');
  const [inputPersonCaption, setInputPersonCaption] = useState('Outstanding Contribution! Your relentless efforts and significant performance have made a huge impact on the success of us all.');
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

  const [sliderValueFontSize, setSliderValueFontSize] = useState(24);
  const handleSliderChangeFontSize = (event) => {
    setSliderValueFontSize(event.target.value);
  };

  const [sliderValueQuoteWidth, setSliderValueQuoteWidth] = useState(500);
  const handleSliderChangeQuoteWidth = (event) => {
    setSliderValueQuoteWidth(event.target.value);
  };

  const [sliderValueTranslateX, setSliderValueTranslateX] = useState(0);
  const handleSliderChangeTranslateX = (event) => {
    setSliderValueTranslateX(event.target.value);
  };

  const handleInputChangeEventDescTitle = (value) =>  {
    setInputEventDescTitle(value);
  };

  const handleInputChangeEventDescSubTitle = (value) => {
    setInputEventDescSubTitle(value);
  };

  const handleInputChangePersonName = (value) => {
    setInputPersonName(value);
  };

  const handleInputChangePersonPosition = (value) => {
    setInputPersonPosition(value);
  };

  const handleInputChangePersonCaption = (value) => {
    setInputPersonCaption(value);
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

  const stripTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const cleanText = stripTags(inputPersonName);

  const fullToolbarOptions = [
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['bold', 'italic', 'underline', 'strike'],
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
          <Input type="file" accept="image/jpeg,image/png,image/heic, .dng" onChange={handleImageChange} className='my-4' disabled={isDisable} />
          </div>
        </div>
      )}

      {isLoading && (
      <div className=' flex items-center justify-center w-full gap-x-2 text-sm py-4'>
        <Loader2 className='animate-spin h-4 w-4' />
        Loading... Please wait a moment
      </div>
      )}

      {previewURL && (
      <div className='mt-12'>
        <Link to='/' className='fixed z-[999]'>
          <Button variant="outline" size="icon" className='rounded-full'><ChevronLeft /></Button>
        </Link>

        <div className='sticky top-4 z-50 grid h-fit place-items-center'>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Image</MenubarTrigger>
              <MenubarContent>
                <div className='flex flex-col gap-4 px-2 pt-2 max-w-[300px]'>
                  <label className="inline-flex items-center cursor-pointer mb-1">
                    <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedTitle} onChange={() => setIsCheckedTitle(!isCheckedTitle)} />
                    <div id='StepName' className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Twibbon Layer</span>
                  </label>
                  <div className='flex flex-col gap-1'>
                    <p className='text-sm'>Zoom ({sliderValueScale})</p>
                    <input type="range" min={1} max={30} value={sliderValueScale} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeScale} />
                    <p className='text-xs opacity-70'>Jika gambar tidak bisa digeser maka zoom dulu, *issue di hosting </p>
                  </div>
                </div>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Event</MenubarTrigger>
              <MenubarContent>
                <div className="flex flex-col gap-2 px-2 py-1 w-[250px]">
                  <ReactQuill
                    theme="snow"
                    value={inputEventDescTitle}
                    onChange={handleInputChangeEventDescTitle}
                    modules={{ toolbar: fullToolbarOptions }}
                    className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                  />
                  <ReactQuill
                    theme="snow"
                    value={inputEventDescSubTitle}
                    onChange={handleInputChangeEventDescSubTitle}
                    modules={{ toolbar: fullToolbarOptions }}
                    className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                  />
                </div>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Person</MenubarTrigger>
              <MenubarContent>
                <div className="flex flex-col gap-2 px-2 py-1 w-[250px]">
                  <ReactQuill
                      theme="snow"
                      value={inputPersonName}
                      onChange={handleInputChangePersonName}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                    />
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>Font Size ({sliderValueFontSize}px)</p>
                      <input type="range" min={20} max={50} value={sliderValueFontSize} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeFontSize} />
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={inputPersonPosition}
                      onChange={handleInputChangePersonPosition}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                    />
                </div>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Desc</MenubarTrigger>
              <MenubarContent>
                <div className="flex flex-col gap-2 px-2 py-1 w-[250px]">
                  <ReactQuill
                    theme="snow"
                    value={inputPersonCaption}
                    onChange={handleInputChangePersonCaption}
                    modules={{ toolbar: fullToolbarOptions }}
                    className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                  />
                  <div className='flex flex-col gap-1'>
                    <p className='text-sm'>Width Size ({sliderValueQuoteWidth}px)</p>
                    <input type="range" min={200} max={600} value={sliderValueQuoteWidth} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeQuoteWidth} />
                  </div>
                </div>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={htmlToImageConvert}> <Download className='w-4 h-4 mr-2' /> Download</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className='text-rose-500' onClick={handleReset}> <RotateCcw className='w-4 h-4 mr-2' /> Reset</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className={`col-span-4 md:col-span-3 safe-area flex items-center justify-center w-full scale-[1] md:scale-[.85]`}>
          <div className={`w-[400px] md:w-[800px] aspect-square overflow-hidden relative shadow-2xl flex flex-col items-center justify-center bg-white renderthis` } ref={elementRef}>
            
            {previewURL && (
              <div className='cursor-grab bottom-0 absolute z-50' >
                <motion.div className="" ref={constraintsRef} />
                <motion.img src={previewURL} alt="Preview" className={`scale-${sliderValueScale}  translate-x-${sliderValueTranslateX} w-[400px]`}  drag dragConstraints={constraintsRef}/>
              </div>
            )}

            {isCheckedTitle ? ( 
              <div className='absolute z-50'>
                <img className='w-[400px] md:w-[800px] aspect-square' src='/twibbon/layer/1YearOfExcellence-v1.png' />
              </div>
            ) : null}

            {isCheckedTitle ? ( 
            <div className='absolute z-[999]'>
              <div className='w-[400px] md:w-[800px] aspect-square'>
                <div className='flex flex-col items-center w-full justify-center text-center mt-8'>
                  <LogoRedXs />
                  <div className='flex flex-col items-center mt-6 gap-2'>
                    <div className='poppins text-[34px] leading-[32px] font-bold text-[#bd0f0c]'>
                      <HtmlRenderer html={inputEventDescTitle} />
                    </div>
                    <div className='opensans text-[21px] leading-[21px] font-bold text-[#e7a23c]'>
                      <HtmlRenderer html={inputEventDescSubTitle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ) : null}

            {isCheckedTitle ? ( 
            <div className='absolute bottom-[75px] z-[999]'>
              <svg width="400" height="150" viewBox="0 0 400 150">
                <defs>
                  <path id="curvePath" d="M 10,40 Q 200,110 390,40" fill="transparent" />
                </defs>
                <text
                  fill="white"
                  fontSize={sliderValueFontSize}
                  fontWeight="bold"
                  className="leaguespartan"
                >
                  <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                    {cleanText}
                  </textPath>
                </text>
              </svg>
            </div>
            ) : null}

            {isCheckedTitle ? ( 
            <div className='absolute bottom-[90px] z-[999]'>
              <div className='leaguespartan text-[22.7px] leading-[22px] font-bold text-black'>
                  <HtmlRenderer html={inputPersonPosition} />
              </div>
            </div>
            ) : null}
            
            {isCheckedTitle ? ( 
            <div className='absolute top-[720px] z-[999] text-center' style={{ width: `${sliderValueQuoteWidth}px` }}>
              <div className='leaguespartan text-[17.7px] leading-[18px] font-light text-[#b22623]'>
                  <HtmlRenderer html={inputPersonCaption} />
              </div>
            </div>
            ) : null}
            
          </div>
        </div>
        
        {/* {previewURL && (
        <div className='col-span-4 md:col-span-1 bg-stone-50 dark:bg-stone-900 shadow-xl border p-6 rounded-2xl h-fit mt-0 md:mt-16 w-full -translate-y-[12vh]'>
          <div className='flex flex-col gap-y-2 justify-between h-full'>
            <div className='flex flex-col gap-y-3'>
              <h1 className='font-semibold text-xl mb-4'>Customize</h1>
              <label className="inline-flex items-center cursor-pointer mb-1">
                <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedTitle} onChange={() => setIsCheckedTitle(!isCheckedTitle)} />
                <div id='StepName' className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Twibbon Layer</span>
              </label>
              <p className='text-xs opacity-70 font-light'>Untuk mengatur posisi foto anda silahkan switch off dulu</p>
              <Tabs defaultValue="event" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="event">Event</TabsTrigger>
                  <TabsTrigger value="person">Person</TabsTrigger>
                  <TabsTrigger value="desc">Desc</TabsTrigger>
                </TabsList>
                <TabsContent value="event">
                  <div className='flex flex-col gap-4'>
                    <ReactQuill
                      theme="snow"
                      value={inputEventDescTitle}
                      onChange={handleInputChangeEventDescTitle}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                    />
                    <ReactQuill
                      theme="snow"
                      value={inputEventDescSubTitle}
                      onChange={handleInputChangeEventDescSubTitle}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                    />
                  </div>
                </TabsContent>
                <TabsContent value="person">
                  <div className='flex flex-col gap-4'>
                    <ReactQuill
                      theme="snow"
                      value={inputPersonName}
                      onChange={handleInputChangePersonName}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                    />
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>Font Size ({sliderValueFontSize}px)</p>
                      <input type="range" min={20} max={50} value={sliderValueFontSize} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeFontSize} />
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={inputPersonPosition}
                      onChange={handleInputChangePersonPosition}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                    />
                  </div>
                </TabsContent>
                <TabsContent value="desc">
                  <div className='flex flex-col gap-4'>
                    <ReactQuill
                      theme="snow"
                      value={inputPersonCaption}
                      onChange={handleInputChangePersonCaption}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                    />
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>Width Size ({sliderValueQuoteWidth}px)</p>
                      <input type="range" min={200} max={600} value={sliderValueQuoteWidth} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeQuoteWidth} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>Zoom ({sliderValueScale})</p>
                <input type="range" min={1} max={30} value={sliderValueScale} className="range w-full cursor-grabbing accent-black" step={1} onChange={handleSliderChangeScale} />
                <p className='text-xs opacity-70'>Jika gambar tidak bisa digeser maka zoom dulu</p>
              </div>
            </div>
            <div className='flex gap-2 w-full pt-12'>
              <Button variant='outline' className='w-full' onClick={handleReset} > <RotateCcw className='w-4 h-4 mr-2' /> Reset</Button>
              <Button className='w-full' onClick={htmlToImageConvert}> <Download className='w-4 h-4 mr-2' /> Download</Button>
            </div>
          </div>
        </div>
        )} */}
      </div>
      )}
      {previewURL && (
        <Walktour
          steps={[
            {selector: "#StepName", title: "Switch Off", description: "Untuk menggeser foto silahkan switch off terlebih dahulu, lalu geser foto anda"}
          ]}
        />
      )}
    </div>
  );
}

export default TwibbonStyleOne;
