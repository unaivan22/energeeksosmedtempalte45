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
import TypefaceTitle from '../utils/TypefaceTitle';
import UploadAnimation from '../utils/UploadAnimation';

function PostStyleSix() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const elementRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isCheckedOverlay, setIsCheckedOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const [rotateValueScale, setRotateValueScale] = useState(1);
  const handleRotateChangeScale = (event) => {
    setRotateValueScale(event.target.value);
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
        <div className={`safe-area flex items-start justify-start w-full scale-[.7] -translate-y-[8vh] -translate-x-[10vw]`}>
          <div className={`w-[1000px] h-[1000px] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center renderthis bg-[#E74C3C]` } ref={elementRef}>
            {previewURL && (
              // <img src={previewURL} alt="Preview" className='w-full object-cover' />
              <div className='cursor-grab top-0' id='StepName'>
                <motion.div className="" ref={constraintsRef} />
                <motion.img src={previewURL} alt="Preview" className={`absolute bottom-0 -rotate-[12deg] left-0 w-[90%] scale-${sliderValueScale} rotate-1 rotate-${rotateValueScale}`}  drag dragConstraints={constraintsRef}/>
              </div>
            )}
            

            {isCheckedOverlay && (
              <div className='absolute top-8 left-1 z-50'>
                <svg width="282" height="59.24" viewBox="0 0 310 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_38_85" maskUnits="userSpaceOnUse" x="0" y="0" width="310" height="83">
                  <path d="M309.78 0.5H0.779785V82.9H309.78V0.5Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_38_85)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.96436 41.5562C2.63386 40.4541 2.57206 39.1563 2.89136 37.9615C5.63116 27.8057 11.9141 20.7193 21.4931 16.5066C23.6252 15.5693 25.4483 16.1976 26.2311 18.0104C26.9933 19.782 26.1178 21.4609 23.9342 22.3982C13.2428 26.992 7.14526 37.5598 8.62846 48.9207C10.0498 59.7872 18.8048 68.5422 30.0318 70.3138C42.4433 72.2708 54.6797 64.4943 58.2126 52.4124C61.7146 40.4129 55.6582 27.6615 44.0501 22.5733C43.4939 22.3364 42.9068 22.1304 42.4227 21.7905C41.1764 20.9253 40.7747 19.1331 41.4648 17.7941C42.227 16.3109 43.875 15.662 45.5539 16.3006C51.3219 18.5254 56.0187 22.1716 59.6546 27.1568C73.2403 45.7483 62.415 72.4665 39.7344 76.3805C21.833 79.4602 5.92986 68.5113 2.36606 50.6717C2.28366 50.2803 2.49996 49.755 1.96436 49.5078C1.96436 46.8607 1.96436 44.2033 1.96436 41.5562Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M177.981 79.3468C176.94 78.8936 175.88 78.4816 174.86 77.9975C171.286 76.3083 169.452 73.4552 169.164 69.5309C169.082 68.47 169.463 68.2743 170.369 68.4494C171.069 68.5833 171.79 68.6863 172.501 68.7584C173.943 68.9129 175.117 69.0777 175.488 70.9935C175.849 72.8578 177.631 73.7127 179.382 74.2174C181.884 74.9281 184.408 74.8869 186.901 74.1968C189.96 73.3419 191.783 71.2098 192.421 68.1816C192.895 65.9362 192.905 63.6187 192.813 60.9819C190.619 63.1964 188.353 64.8032 185.469 65.2049C179.773 65.998 174.963 64.4839 171.543 59.612C166.908 52.9994 166.805 42.3492 171.286 35.6336C176.116 28.3824 186.262 27.3215 192.411 33.4294C192.607 33.6148 192.73 33.8723 192.978 34.2328C193.585 33.3264 193.4 32.523 193.328 31.8329C193.184 30.463 193.75 30.1952 194.996 30.2158C198.849 30.2776 198.849 30.2261 198.849 34.0474C198.849 43.2762 198.849 52.4947 198.838 61.7235C198.838 64.041 198.622 66.3482 198.251 68.6451C197.417 73.8157 194.306 76.9675 189.517 78.7082C188.981 78.9039 188.569 79.1923 187.91 79.3468C184.614 79.3468 181.297 79.3468 177.981 79.3468ZM193.276 47.5301C193.297 45.9233 193.204 44.3371 192.864 42.7612C191.824 37.8996 188.27 34.6036 183.862 34.4594C179.691 34.3152 176.127 37.055 174.85 41.5664C173.665 45.7585 173.768 49.9918 175.086 54.1324C176.343 58.067 179.701 60.4463 183.656 60.4669C187.622 60.4772 190.866 58.1288 192.298 54.2148C193.091 52.0415 193.317 49.8064 193.276 47.5301Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M36.0985 3.76518C37.4272 4.77458 37.8083 6.08268 37.7877 7.75128C37.7053 14.6008 37.7568 21.4503 37.7465 28.2998C37.7465 29.0208 37.6641 29.6388 38.6529 29.9272C44.1325 31.5134 46.656 35.5922 47.686 40.8864C48.0671 42.8537 47.9847 44.8416 48.0671 46.8295C48.1186 47.9625 47.7066 48.1891 46.6663 48.1788C39.7035 48.1376 32.751 48.1994 25.7882 48.117C24.2844 48.0964 24.099 48.5702 24.305 49.9092C25.5616 58.0874 31.9373 61.7336 40.2803 58.9938C42.1652 58.3758 43.8441 57.3458 45.6981 56.1304C45.6981 57.7269 45.6672 59.0865 45.7084 60.4358C45.7393 61.1465 45.2552 61.404 44.7814 61.6512C39.0649 64.6794 33.1218 65.2253 27.0654 62.8872C23.8312 61.6409 21.5755 59.1483 20.288 55.9656C18.0117 50.3212 17.7954 44.5532 20.1129 38.8676C21.9875 34.2841 25.3247 31.1014 30.1966 29.8139C31.3193 29.5152 31.3502 28.9384 31.3399 28.0629C31.3193 21.2134 31.3605 14.3639 31.2987 7.51438C31.2884 5.88698 31.6901 4.62008 33.1012 3.75488C34.1106 3.76518 35.1097 3.76518 36.0985 3.76518ZM33.4617 43.5541C36.1088 43.5541 38.7559 43.5644 41.4133 43.5438C41.8562 43.5438 42.3506 43.7395 42.4742 42.9155C42.9583 39.5886 40.373 35.3553 37.0976 34.2326C31.4223 32.2962 24.9127 36.6737 24.4389 42.6889C24.3668 43.5541 24.7479 43.5541 25.3556 43.5541C28.0542 43.5541 30.7631 43.5541 33.4617 43.5541Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M142.127 54.8632C140.252 61.7745 135.236 65.8121 128.232 66.1211C126.079 66.2138 123.926 66.1726 121.825 65.6061C116.304 64.1229 112.699 60.5797 111.103 55.1413C109.671 50.2694 109.723 45.3151 111.247 40.4638C113.493 33.2744 119.683 29.0926 127.264 29.4943C134.772 29.896 140.303 34.6649 141.818 42.0706C142.209 43.9658 142.281 45.9022 142.405 47.8283C142.487 49.0952 142.034 49.4042 140.808 49.3939C133.186 49.3424 125.574 49.4248 117.952 49.3218C116.263 49.3012 116.171 49.9398 116.397 51.2376C116.953 54.4203 118.076 57.294 120.744 59.3334C125.832 63.2268 132.784 61.3934 135.462 55.3679C135.936 54.2967 136.441 53.9671 137.533 54.1731C139.067 54.4615 140.592 54.6366 142.127 54.8632ZM126.429 44.4808C129.293 44.4808 132.166 44.4911 135.03 44.4705C135.524 44.4705 136.204 44.6868 136.06 43.7083C135.741 41.5041 135.226 39.3823 133.742 37.621C131.209 34.6237 127.099 33.5628 123.216 34.8915C119.642 36.1172 116.881 39.7943 116.644 43.4714C116.583 44.5117 117.098 44.4911 117.819 44.4911C120.692 44.4705 123.556 44.4808 126.429 44.4808Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M260.453 49.3633C256.642 49.3633 252.831 49.4251 249.02 49.3324C247.629 49.2912 247.495 49.8062 247.681 50.9598C248.392 55.4197 250.194 59.1174 254.736 60.7345C259.804 62.537 264.573 60.4461 266.736 55.4506C267.282 54.194 267.92 53.9262 269.084 54.2043C269.62 54.3279 270.176 54.4 270.722 54.4618C273.74 54.812 273.75 54.812 272.524 57.5415C270.207 62.6812 266.138 65.4313 260.618 66.039C258.094 66.3171 255.55 66.245 253.057 65.5755C246.713 63.8863 242.551 58.9114 241.697 51.825C241.212 47.7874 241.367 43.7704 242.716 39.8873C245.096 33.0687 251.317 29.0414 258.671 29.4946C266.087 29.9478 271.505 34.5725 273.081 41.8443C273.513 43.8425 273.647 45.8819 273.73 47.9213C273.781 49.1264 273.328 49.3942 272.205 49.3839C268.291 49.3221 264.377 49.3633 260.453 49.3633ZM257.6 44.4811C260.525 44.4811 263.45 44.4811 266.375 44.4811C266.911 44.4811 267.539 44.615 267.385 43.6777C267.014 41.4323 266.509 39.2487 264.923 37.4771C262.317 34.5725 258.3 33.5837 254.489 34.9124C250.925 36.1587 248.227 39.7637 247.949 43.5335C247.877 44.4605 248.299 44.5017 248.999 44.4914C251.863 44.4708 254.736 44.4811 257.6 44.4811Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M223.96 49.3636C220.097 49.3636 216.225 49.4048 212.362 49.343C211.229 49.3224 211.003 49.6829 211.085 50.7644C211.631 57.6242 216.688 62.0017 223.177 61.1468C226.72 60.6833 228.925 58.4791 230.212 55.3376C230.676 54.2149 231.242 53.9471 232.303 54.184C232.89 54.3179 233.498 54.3797 234.105 54.4724C237.288 54.9565 237.35 54.2973 235.846 57.7066C233.59 62.7948 229.46 65.4522 224.011 66.0496C221.539 66.3174 219.037 66.2762 216.606 65.6273C210.735 64.0617 207.109 60.2095 205.616 54.4106C204.462 49.9507 204.544 45.4393 205.801 40.9897C207.923 33.481 214.268 29.0314 222.106 29.4949C229.759 29.9481 235.362 35.0466 236.66 42.6789C236.938 44.3166 236.969 45.9749 237.082 47.6229C237.175 48.9619 236.825 49.4357 235.383 49.3945C231.582 49.2915 227.771 49.3636 223.96 49.3636ZM220.932 44.4814C223.805 44.4814 226.669 44.4299 229.543 44.502C230.624 44.5329 230.83 44.1827 230.727 43.1733C230.191 38.0027 226.35 34.3668 221.303 34.3359C216.297 34.2947 212.105 38.0542 211.456 43.0497C211.291 44.2754 211.703 44.5329 212.836 44.502C215.524 44.4299 218.233 44.4814 220.932 44.4814Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M309.007 65.4212C306.7 65.4212 304.66 65.3594 302.621 65.4521C301.684 65.4933 301.395 64.9165 301.004 64.3191C297.409 58.7571 293.825 53.1951 290.117 47.458C288.84 48.694 287.645 49.8888 286.409 51.0527C285.925 51.5059 286.028 52.0518 286.028 52.5874C286.018 56.3984 285.997 60.2094 286.038 64.0204C286.048 65.0092 285.935 65.5757 284.73 65.4418C283.216 65.2667 281.177 66.0907 280.301 65.1019C279.549 64.2573 280.054 62.2694 280.054 60.7862C280.044 46.6958 280.064 32.6157 280.023 18.5253C280.023 17.2584 280.301 16.7331 281.63 16.8876C282.608 17.0009 283.628 16.9906 284.606 16.8876C285.832 16.7537 286.028 17.279 286.028 18.3811C285.987 26.9301 286.007 35.4894 286.007 44.1517C286.687 43.9869 286.965 43.4925 287.315 43.132C291.229 39.1562 295.133 35.1701 299.016 31.1634C299.634 30.5248 300.242 30.1849 301.159 30.2158C303.136 30.2879 305.124 30.2364 307.132 30.2364C307.235 30.9986 306.607 31.2046 306.257 31.5548C302.765 35.0156 299.304 38.5073 295.699 41.8548C294.474 42.9981 294.525 43.7294 295.432 45.0581C299.665 51.2587 303.775 57.5417 307.926 63.7835C308.266 64.247 308.554 64.7105 309.007 65.4212Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M80.924 34.9429C85.7444 29.6796 91.1313 28.1964 97.0229 30.2873C101.184 31.7705 103.409 34.7884 103.707 39.0629C104.295 47.4986 103.841 55.9549 103.975 64.4009C103.986 65.2146 103.697 65.4721 102.914 65.4206C101.328 65.3073 99.3301 66.0489 98.2692 65.1322C97.3422 64.3391 98.022 62.3306 98.0014 60.8577C97.9087 54.5129 98.2383 48.1475 97.8366 41.813C97.4761 36.0347 93.2222 33.3155 87.6602 35.0974C83.602 36.4055 81.6244 39.4028 81.5523 44.8103C81.4596 51.0521 81.4802 57.2939 81.5523 63.5357C81.5729 64.9674 81.3051 65.6781 79.7189 65.4309C78.3799 65.2249 76.5671 66.0283 75.774 65.1116C75.1148 64.3391 75.5577 62.5881 75.5577 61.2697C75.5474 51.4332 75.5783 41.607 75.5268 31.7808C75.5165 30.5963 75.7328 30.1843 77.0306 30.2049C80.8313 30.277 80.8313 30.2152 80.8828 34.0468C80.8725 34.2631 80.8931 34.4691 80.924 34.9429Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M154.126 35.2624C154.641 34.4487 154.899 34.0264 155.177 33.6144C158.009 29.2575 162.006 28.279 166.599 30.7716C167.382 31.1939 167.619 31.5956 167.238 32.4402C166.733 33.5423 166.311 34.6856 165.95 35.8392C165.683 36.7044 165.322 36.7147 164.519 36.4057C159.76 34.5929 156.577 36.2924 155.311 41.2261C154.785 43.2758 154.662 45.3667 154.662 47.4679C154.651 52.9372 154.631 58.4065 154.682 63.8655C154.693 65.0294 154.497 65.6165 153.168 65.4414C151.716 65.2457 149.759 66.0697 148.914 65.0912C148.193 64.2569 148.667 62.3617 148.667 60.93C148.657 51.2171 148.688 41.4939 148.636 31.7707C148.626 30.5553 148.904 30.1845 150.181 30.2051C153.972 30.2669 153.972 30.2051 154.054 34.0573C154.044 34.3148 154.075 34.5723 154.126 35.2624Z" fill="white"/>
                  </g>
                </svg>
              </div>
            )}

            {/* {previewURL && (
              <div className='absolute top-0 left-0 h-[200px] w-full'>
                <img className='w-full' src='/post/styleone/styleonetop.svg' />
              </div>
            )} */}

            {isCheckedOverlay && (
              <div className='z-50 pb-6 absolute top-36 w-[796.1px]'>
                <div className='flex flex-col text-left gap-5 htmlrender-detail'>
                  <h1 className='text-white text-[2.8rem] w-full font-bold leading-none italic' id='title'>{isCheckedTitle ? ( <div><HtmlRenderer html={inputEventDescTitle} /></div> ) : null} </h1>
                  <p className='text-white w-full text-[1.5rem]'>{isCheckedSubTitle ? ( <div><HtmlRenderer html={inputEventDescSubTitle} /></div> ) : null}</p>
                </div>
              </div>
            )}

            {isCheckedOverlay && (
                <div className='z-50 pb-6 absolute bottom-8 w-[896.1px] z-[999]'>
                  <div className='flex flex-col text-center gap-2 htmlrender-detail'>
                    <p className='text-white w-full text-[1.4rem] font-light text-center'> {isCheckedCopyright ? ( <div className='flex items-center gap-2 justify-start'><Camera className='w-8 h-8' /> <HtmlRenderer html={inputEventDescCopyright} /></div> ) : null}</p>
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

            <svg className='absolute -bottom-32 -left-48 z-[10] opacity-70' width="576" height="576" viewBox="0 0 1026 1026" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M512.723 1025.5C795.856 1025.5 1025.38 795.975 1025.38 512.843C1025.38 229.71 795.856 0.185547 512.723 0.185547C229.591 0.185547 0.0664062 229.71 0.0664062 512.843C0.0664062 795.975 229.591 1025.5 512.723 1025.5Z" fill="url(#paint0_radial_38_133)"/>
              <defs>
              <radialGradient id="paint0_radial_38_133" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512.723 512.843) rotate(90) scale(512.657)">
              <stop stop-color="#FF978B"/>
              <stop offset="1" stop-color="#FF978B" stop-opacity="0"/>
              </radialGradient>
              </defs>
            </svg>

            <svg width="1154" height="1154" className='scale-[.5] absolute -bottom-[460px] -right-[500px] opacity-70' viewBox="0 0 577 577" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>Rotate ({rotateValueScale})</p>
                <input type="range" min={1} max={5} value={rotateValueScale} className="range w-full cursor-grabbing" step={1} onChange={handleRotateChangeScale} />
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

export default PostStyleSix;
