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

import { motion } from "framer-motion";
import { Walktour } from 'walktour'
import UploadAnimation from '../utils/UploadAnimation';
import LogoRedXs from '../utils/LogoRedXs';
import LogoWhiteXs from '../utils/LogoWhiteXs';

function TibbonStyleThree() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const elementRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedTitle, setIsCheckedTitle] = useState(true);
  const [inputEventDescTitle, setInputEventDescTitle] = useState('CELEBRATING');
  const [inputEventDescSubTitle, setInputEventDescSubTitle] = useState('3 Year Dedication');
  const [inputPersonName, setInputPersonName] = useState('Jared Palmer');
  const [inputPersonPosition, setInputPersonPosition] = useState('Design Engineer');
  const [inputPersonCaption, setInputPersonCaption] = useState('Congratulations for receiving the Achievement Award for Outstanding Contribution! Your relentless efforts and significant achievements have greatly contributed to our success.');
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
      <div>
        <Link to='/' className='absolute mt-2 md:mt-6'>
          <Button variant="outline" size="icon" className='rounded-full'><ChevronLeft /></Button>
        </Link>
        <div className='gap-6 mt-16 grid md:grid-cols-4 grid-cols-1'>
          <div className={`col-span-4 md:col-span-3 safe-area flex items-start justify-start w-full scale-[1] md:scale-[.85]`}>
            <div className={`w-[400px] md:w-[800px] aspect-square overflow-hidden relative shadow-2xl flex flex-col items-center justify-center bg-white renderthis` } ref={elementRef}>
              
              {previewURL && (
                <div className='cursor-grab top-[200px] left-0 absolute z-50' >
                  <motion.div className="" ref={constraintsRef} />
                  <motion.img src={previewURL} alt="Preview" className={`scale-${sliderValueScale}  translate-x-${sliderValueTranslateX} w-[400px]`}  drag dragConstraints={constraintsRef}/>
                </div>
              )}

              {isCheckedTitle ? ( 
                <div className='absolute z-50'>
                  <img className='w-[400px] md:w-[800px] aspect-square' src='/twibbon/layer/1YearOfExcellence-3.png' />
                </div>
              ) : null}

              {isCheckedTitle ? ( 
              <div className='absolute z-[999]'>
                <div className='w-[400px] md:w-[700px] aspect-square'>
                  <div className='flex flex-col items-end w-full justify-center text-right mt-8'>
                    <LogoWhiteXs />
                    <div className='flex flex-col items-end mt-6 gap-2'>
                      <div className='poppins text-[48px] leading-[48px] font-semibold text-[#e6c661]'>
                        <HtmlRenderer html={inputEventDescTitle} />
                      </div>
                      <div className='iansui text-[38px] leading-[38px] font-bold text-white'>
                        <HtmlRenderer html={inputEventDescSubTitle} />
                      </div>
                    </div>
                    <div className='leaguespartan text-[32px] leading-[32px] font-light text-white max-w-[360px] pt-10'>
                      <HtmlRenderer html={inputPersonCaption} />
                    </div>
                  </div>
                </div>
              </div>
              ) : null}

              {isCheckedTitle ? ( 
              <div className='absolute caveat right-12 bottom-[108px] z-[999] text-white text-[48px] leading-[48px]'>
                <HtmlRenderer html={inputPersonName} />
              </div>
              ) : null}

              {isCheckedTitle ? ( 
              <div className='absolute bottom-[40px] right-12 z-[999]'>
                <div className='leaguespartan text-[22.7px] leading-[22px] font-bold text-white'>
                    <HtmlRenderer html={inputPersonPosition} />
                </div>
              </div>
              ) : null}
              
              
            </div>
          </div>
          {previewURL && (
          <div className='col-span-4 md:col-span-1 bg-stone-50 dark:bg-stone-900 shadow-xl border p-6 rounded-2xl h-fit mt-0 md:mt-16 w-full -translate-y-[12vh]'>
            <div className='flex flex-col gap-y-2 justify-between h-full'>
              <div className='flex flex-col gap-y-3'>
                <h1 className='font-semibold text-xl mb-4'>Costumize</h1>
                <label className="inline-flex items-center cursor-pointer mb-1">
                  <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedTitle} onChange={() => setIsCheckedTitle(!isCheckedTitle)} />
                  <div id='StepName' className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Twibbon Layer</span>
                </label>
                <p className='text-xs opacity-70 font-light pb-4'>Untuk mengatur posisi foto anda silahkan switch off dulu</p>
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
                <ReactQuill
                  theme="snow"
                  value={inputPersonName}
                  onChange={handleInputChangePersonName}
                  modules={{ toolbar: fullToolbarOptions }}
                  className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                />
                <ReactQuill
                  theme="snow"
                  value={inputPersonPosition}
                  onChange={handleInputChangePersonPosition}
                  modules={{ toolbar: fullToolbarOptions }}
                  className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                />
                <ReactQuill
                  theme="snow"
                  value={inputPersonCaption}
                  onChange={handleInputChangePersonCaption}
                  modules={{ toolbar: fullToolbarOptions }}
                  className='quill-editor rounded-xl bg-white h-[100px] overflow-y-scroll'
                />
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
          )}
        </div>
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

export default TibbonStyleThree;
