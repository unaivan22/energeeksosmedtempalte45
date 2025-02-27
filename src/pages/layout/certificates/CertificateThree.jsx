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
import LogoRed from '../utils/LogoRed';
import LogoRedSm from '../utils/LogoRedSm';


function CertificateThree() {
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

  const [inputEventCertificateName, setInputEventCertificateName] = useState('PENGHARGAAN');
  const [inputEventDescDesc, setInputEventDescDesc] = useState('PEGAWAI TER-DETAIL ORIENTED');
  const [inputEventDescPerson, setInputEventDescPerson] = useState('Emanuel Labubu');
  const [inputEventDescJabatan, setInputEventDescJabatan] = useState('Product Manager');
  const [inputEventDescAcara, setInputEventDescAcara] = useState('Dalam Acara Energeek Annual Summit 2025');
  const [inputEventDescAcaraDate, setInputEventDescAcaraDate] = useState('08 Maret 2025');
  const [inputEventDescJabatanName, setInputEventDescJabatanName] = useState('Zulmi Adi Rizky');
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
    const scale = 5; // Scale factor
  
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

  const handleInputChangeEventCertificateName = (value) => {
    setInputEventCertificateName(value);
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

  const handleInputChangeEventDescJabatanName = (value) => {
    setInputEventDescJabatanName(value);
  };

  const handleInputChangeEventDescAcara = (value) => {
    setInputEventDescAcara(value);
  };

  const handleInputChangeEventDescAcaraDate = (value) => {
    setInputEventDescAcaraDate(value);
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
            <UploadAnimation />
            <p className='text-lg font-semibold'>Pilih file dahulu</p>
            <p className='text-center text-xs opacity-70 font-light'>Pastikan gambar menggunakan format .png/.jpg/.jpeg/.heic</p>
          <Input type="file" accept="image/jpeg,image/png,image/heic, .dng" onChange={handleImageChange} className='my-4' disabled={isDisable} id='StepName' />
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
      <div className='relative gap-6 mt-12'>
        <Link to='/' className='absolute'>
          <Button variant="outline" size="icon" className='rounded-full'><ChevronLeft /></Button>
        </Link>
        <div className={`safe-area flex items-start justify-start w-full scale-[.7] -translate-x-[5vw]`}>
          <div className={`w-[842px] h-[595px] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center renderthis certificate-one bg-[#F5F0E2]` } ref={elementRef}>
            
            {previewURL && (
            <div className='absolute left-1/2 transform -translate-x-1/2 top-2 z-50'>
                <LogoRedSm />
            </div>
            )}
            
            <div className='z-50 absolute left-1/2 transform -translate-x-1/2 grid place-items-center w-[80%] h-fit'>
                {isCheckedDesc && (
                  <div className='mb-12  -translate-y-[20px]'>
                    <div className='flex flex-col'>
                      <h1 className='text-black text-[48px] leading-[3.5rem] w-full text-center josefin-sans font-bold leading-tight' id='title'>{isCheckedDesc ? ( <div><HtmlRenderer html={inputEventCertificateName} /></div> ) : null} </h1>
                      <h1 className='text-black text-[32px] leading-[3.5rem] w-full text-center josefin-slab font-light leading-tight' >{isCheckedDesc ? ( <div><HtmlRenderer html={inputEventDescDesc} /></div> ) : null} </h1>
                    </div>
                    <h1 className='text-black text-[20px] pt-8 pb-2 w-full text-center josefin-slab font-light leading-tight' >Diberikan kepada : </h1>
                    <div className='flex flex-col text-left'>
                      <h1 className='text-[#1F305C] text-[55px] w-full text-center font-bold leading-none allison'>{isCheckedPersonName ? ( <div><HtmlRenderer html={inputEventDescPerson} /></div> ) : null} </h1>
                    </div>
                    <div className='flex flex-col text-left pt-4 gap-0'>
                      <p className='text-black text-[20px] py-2 w-full text-center josefin-slab font-light leading-tight'><div><HtmlRenderer html={inputEventDescAcara} /></div> </p>
                      <p className='text-black text-[18px] py-2 w-full text-center josefin-slab font-light leading-tight -translate-y-[10px]'><div><HtmlRenderer html={inputEventDescAcaraDate} /></div> </p>
                    </div>
                  </div>
                )}
              </div>
            
            <div className='bottom-6 absolute left-1/2 transform -translate-x-1/2 '>
                <div className='flex items-start justify-center w-[600px]'>
                    <div className='flex flex-col gap-y-20'>
                        <p className='text-black w-full text-[20px] font-light text-center josefin-slab font-semibold'>{isCheckedJabatanPerson ? ( <div><HtmlRenderer html={inputEventDescJabatan} /></div> ) : null}</p>
                        <p className='text-black w-full text-[24px] leading-[30px] font-semibold text-center josefin-sans'>{isCheckedPersonName ? ( <div><HtmlRenderer html={inputEventDescJabatanName} /></div> ) : null}</p>
                    </div>
                    {/* <div className='flex flex-col gap-y-16'>
                        <p className='text-black w-full text-[20px] font-light text-center josefin-slab'>Peserta</p>
                        <p className='text-black w-full text-[24px] leading-[30px] font-semibold text-center josefin-sans'>{isCheckedPersonName ? ( <div><HtmlRenderer html={inputEventDescPerson} /></div> ) : null}</p>
                    </div> */}
                </div>
            </div>
            

            {/* <div className='z-50 absolute bottom-12 right-[100px]'>
                <div className='mb-12'>
                <div className='flex flex-col text-left'>
                <p className='text-white w-full text-[2rem] font-light text-right'>{isCheckedCopyright ? ( <div className='flex items-center gap-2 justify-end'><Camera className='w-8 h-8' /><HtmlRenderer html={inputEventDescCopyright} /></div> ) : null}</p>
                </div>
                </div>
            </div> */}

            <div className='absolute top-0 left-0 z-50'>
                <img src='/certificate/one/certificate-one-1.svg'/>
            </div>

            <div className='absolute top-0 right-0'>
                <img src='/certificate/one/certificate-one-2.svg'/>
            </div>

            <div className='absolute top-0 left-0'>
                <img src='/certificate/one/certificate-one-4.svg'/>
            </div>

            <div className='absolute bottom-0 right-0'>
                <img src='/certificate/one/certificate-one-3.svg'/>
            </div>

            {/* <div className='absolute left-1/2 transform -translate-x-1/2 bottom-0 right-0'>
                <img src='/certificate/one/certificate-one-5.svg'/>
            </div> */}

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
                  <TabsTrigger value="acara">Acara</TabsTrigger>
                  <TabsTrigger value="jabatan">Pejabat</TabsTrigger>
                  {/* <TabsTrigger value="copyright">Copyright</TabsTrigger> */}
                </TabsList>
                <TabsContent value="deskripsi">
                  <div className='flex flex-col gap-1'>
                    <div className="flex items-center justify-between">
                        {/* <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedDesc} onChange={() => setIsCheckedDesc(!isCheckedDesc)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Deskripsi</span>
                        </label> */}
                        {/* <TypefaceTitle /> */}
                    </div>
                    {isCheckedDesc? ( 
                        <ReactQuill
                          theme="snow"
                          value={inputEventCertificateName}
                          onChange={handleInputChangeEventCertificateName}
                          modules={{ toolbar: fullToolbarOptions }}
                          className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                          />
                      ) : null} 

                        <ReactQuill
                          theme="snow"
                          value={inputEventDescDesc}
                          onChange={handleInputChangeEventDesc}
                          modules={{ toolbar: fullToolbarOptions }}
                          className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                          />
                  </div>
                </TabsContent>
                <TabsContent value="nama">
                  <div className='flex flex-col gap-1'>
                    {/* <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedPersonName} onChange={() => setIsCheckedPersonName(!isCheckedPersonName)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</span>
                        </label>
                    </div> */}
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
                <TabsContent value="acara">
                  <div className='flex flex-col gap-1'>
                    {/* <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedPersonName} onChange={() => setIsCheckedPersonName(!isCheckedPersonName)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</span>
                        </label>
                    </div> */}
                    <ReactQuill
                      theme="snow"
                      value={inputEventDescAcara}
                      onChange={handleInputChangeEventDescAcara}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                    />
                    <ReactQuill
                      theme="snow"
                      value={inputEventDescAcaraDate}
                      onChange={handleInputChangeEventDescAcaraDate}
                      modules={{ toolbar: fullToolbarOptions }}
                      className='quill-editor rounded-xl bg-white h-[250px] overflow-y-scroll'
                    />
                  </div>
                </TabsContent>
                <TabsContent value="jabatan">
                  <div className='flex flex-col gap-1'>
                    {/* <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer mb-1">
                        <input type="checkbox" value="" className="sr-only peer"  checked={isCheckedJabatanPerson} onChange={() => setIsCheckedJabatanPerson(!isCheckedJabatanPerson)} />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Jabatan</span>
                        </label>
                    </div> */}
                    {isCheckedJabatanPerson? ( 
                        <ReactQuill
                            theme="snow"
                            value={inputEventDescJabatan}
                            onChange={handleInputChangeEventDescJabatan}
                            modules={{ toolbar: fullToolbarOptions }}
                            className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                            />
                    ) : null} 
                    {isCheckedJabatanPerson? ( 
                        <ReactQuill
                            theme="snow"
                            value={inputEventDescJabatanName}
                            onChange={handleInputChangeEventDescJabatanName}
                            modules={{ toolbar: fullToolbarOptions }}
                            className='quill-editor rounded-xl bg-white h-[150px] overflow-y-scroll'
                            />
                    ) : null} 
                  </div>
                </TabsContent>
                {/* <TabsContent value="copyright">
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
                </TabsContent> */}
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

export default CertificateThree;
