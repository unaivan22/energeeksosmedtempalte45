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

function PostStyleFive() {
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
        <div className={`safe-area flex items-start justify-start w-full scale-[.7] -translate-y-[8vh] -translate-x-[10vw]`}>
          <div className={`w-[1000px] h-[1000px] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center bg-white renderthis` } ref={elementRef}>
            {previewURL && (
              // <img src={previewURL} alt="Preview" className='w-full object-cover' />
              <div className='cursor-grab top-0' id='StepName'>
                <motion.div className="" ref={constraintsRef} />
                <motion.img src={previewURL} alt="Preview" className={`absolute bottom-0 left-0 scale-${sliderValueScale}`}  drag dragConstraints={constraintsRef}/>
              </div>
            )}
            

            {isCheckedOverlay && (
              <div className='absolute top-8 left-1 z-50'>
                <svg width="282" height="59.24" viewBox="0 0 310 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_38_135" maskUnits="userSpaceOnUse" x="0" y="0" width="310" height="82">
                  <path d="M309.78 0H0.779785V82H309.78V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_38_135)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.96436 40.8563C2.63386 39.7596 2.57206 38.4681 2.89136 37.2791C5.63116 27.1726 11.9142 20.1206 21.4932 15.9283C23.6253 14.9956 25.4484 15.6208 26.2312 17.4248C26.9934 19.1878 26.1179 20.8586 23.9343 21.7913C13.2429 26.3628 7.14526 36.8793 8.62846 48.1851C10.0499 58.9988 18.8049 67.7113 30.0319 69.4743C42.4434 71.4218 54.6798 63.6831 58.2127 51.6598C61.7147 39.7186 55.6583 27.0291 44.0502 21.9656C43.494 21.7298 42.9069 21.5248 42.4228 21.1866C41.1765 20.3256 40.7748 18.5421 41.4649 17.2096C42.2271 15.7336 43.8751 15.0878 45.554 15.7233C51.322 17.9373 56.0188 21.5658 59.6547 26.5268C73.2404 45.0281 62.4151 71.6166 39.7345 75.5116C21.8331 78.5763 5.92986 67.6806 2.36606 49.9276C2.28366 49.5381 2.49996 49.0153 1.96436 48.7693C1.96436 46.1351 1.96436 43.4906 1.96436 40.8563Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M177.981 78.464C176.941 78.013 175.88 77.603 174.86 77.1212C171.286 75.4402 169.452 72.601 169.164 68.6957C169.082 67.64 169.463 67.4452 170.369 67.6195C171.07 67.7527 171.791 67.8552 172.501 67.927C173.943 68.0807 175.117 68.2447 175.488 70.1512C175.849 72.0065 177.631 72.8572 179.382 73.3595C181.885 74.0667 184.408 74.0257 186.901 73.339C189.96 72.4882 191.783 70.3665 192.421 67.353C192.895 65.1185 192.906 62.8122 192.813 60.1882C190.619 62.392 188.353 63.991 185.469 64.3907C179.773 65.18 174.963 63.6732 171.543 58.825C166.908 52.2445 166.805 41.646 171.286 34.963C176.117 27.747 186.262 26.6912 192.411 32.7695C192.607 32.954 192.73 33.2102 192.978 33.569C193.585 32.667 193.4 31.8675 193.328 31.1807C193.184 29.8175 193.75 29.551 194.996 29.5715C198.849 29.633 198.849 29.5817 198.849 33.3845C198.849 42.5685 198.849 51.7422 198.838 60.9262C198.838 63.2325 198.622 65.5285 198.251 67.8142C197.417 72.9597 194.306 76.0962 189.517 77.8285C188.981 78.0232 188.569 78.3102 187.91 78.464C184.614 78.464 181.297 78.464 177.981 78.464ZM193.276 46.8017C193.297 45.2027 193.204 43.6242 192.864 42.056C191.824 37.218 188.271 33.938 183.862 33.7945C179.691 33.651 176.127 36.3775 174.85 40.867C173.665 45.0387 173.768 49.2515 175.087 53.372C176.343 57.2875 179.701 59.6552 183.656 59.6757C187.622 59.686 190.866 57.349 192.298 53.454C193.091 51.2912 193.318 49.067 193.276 46.8017Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M36.0985 3.24951C37.4272 4.25401 37.8083 5.55576 37.7877 7.21626C37.7053 14.0325 37.7568 20.8487 37.7465 27.665C37.7465 28.3825 37.6641 28.9975 38.6529 29.2845C44.1325 30.863 46.656 34.922 47.686 40.1905C48.0671 42.1482 47.9847 44.1265 48.0671 46.1047C48.1186 47.2322 47.7066 47.4577 46.6663 47.4475C39.7035 47.4065 32.751 47.468 25.7882 47.386C24.2844 47.3655 24.099 47.837 24.305 49.1695C25.5616 57.308 31.9373 60.9365 40.2803 58.21C42.1652 57.595 43.8441 56.57 45.6981 55.3605C45.6981 56.9492 45.6672 58.3022 45.7084 59.645C45.7393 60.3522 45.2552 60.6085 44.7814 60.8545C39.0649 63.868 33.1218 64.4112 27.0654 62.0845C23.8312 60.8442 21.5755 58.3637 20.288 55.1965C18.0117 49.5795 17.7954 43.8395 20.1129 38.1815C21.9875 33.6202 25.3247 30.453 30.1966 29.1717C31.3193 28.8745 31.3502 28.3005 31.3399 27.4292C31.3193 20.613 31.3605 13.7967 31.2987 6.98051C31.2884 5.36101 31.6901 4.10026 33.1012 3.23926C34.1106 3.24951 35.1097 3.24951 36.0985 3.24951ZM33.4617 42.8452C36.1088 42.8452 38.7559 42.8555 41.4133 42.835C41.8562 42.835 42.3506 43.0297 42.4742 42.2097C42.9583 38.899 40.373 34.6862 37.0976 33.569C31.4223 31.642 24.9127 35.9982 24.4389 41.9842C24.3668 42.8452 24.7479 42.8452 25.3556 42.8452C28.0542 42.8452 30.7631 42.8452 33.4617 42.8452Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M142.127 54.0993C140.252 60.977 135.236 64.995 128.232 65.3025C126.079 65.3948 123.926 65.3539 121.825 64.7901C116.304 63.3141 112.699 59.7881 111.103 54.3761C109.671 49.5279 109.723 44.5976 111.247 39.7699C113.493 32.6154 119.683 28.4539 127.264 28.8536C134.772 29.2534 140.303 33.999 141.818 41.3688C142.209 43.2548 142.281 45.1819 142.405 47.0986C142.487 48.3594 142.034 48.6669 140.808 48.6566C133.186 48.6054 125.574 48.6874 117.952 48.5849C116.263 48.5644 116.171 49.1999 116.397 50.4914C116.953 53.6586 118.076 56.5184 120.744 58.5479C125.832 62.4224 132.784 60.5979 135.462 54.6016C135.936 53.5356 136.441 53.2076 137.533 53.4126C139.067 53.6996 140.592 53.8738 142.127 54.0993ZM126.429 43.7674C129.293 43.7674 132.166 43.7775 135.03 43.757C135.524 43.757 136.204 43.9723 136.06 42.9985C135.741 40.805 135.226 38.6936 133.742 36.9409C131.209 33.9581 127.099 32.9024 123.216 34.2246C119.642 35.4444 116.881 39.1036 116.644 42.7629C116.583 43.7981 117.098 43.7775 117.819 43.7775C120.692 43.757 123.556 43.7674 126.429 43.7674Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M260.453 48.626C256.642 48.626 252.831 48.6875 249.02 48.5953C247.629 48.5543 247.496 49.0668 247.681 50.2148C248.392 54.653 250.194 58.3328 254.736 59.942C259.804 61.7358 264.573 59.655 266.736 54.6838C267.282 53.4333 267.92 53.1668 269.084 53.4435C269.62 53.5665 270.176 53.6383 270.722 53.6998C273.74 54.0483 273.75 54.0483 272.525 56.7645C270.207 61.8793 266.139 64.616 260.618 65.2208C258.094 65.4975 255.55 65.4258 253.058 64.7595C246.713 63.0785 242.552 58.1278 241.697 51.0758C241.213 47.0578 241.367 43.0603 242.716 39.196C245.096 32.4105 251.317 28.4028 258.671 28.8538C266.087 29.3048 271.505 33.907 273.081 41.1435C273.513 43.132 273.647 45.1615 273.73 47.191C273.781 48.3903 273.328 48.6568 272.205 48.6465C268.291 48.585 264.377 48.626 260.453 48.626ZM257.6 43.7675C260.525 43.7675 263.45 43.7675 266.375 43.7675C266.911 43.7675 267.539 43.9008 267.385 42.968C267.014 40.7335 266.509 38.5605 264.923 36.7975C262.317 33.907 258.3 32.923 254.489 34.2453C250.925 35.4855 248.227 39.073 247.949 42.8245C247.877 43.747 248.299 43.788 248.999 43.7778C251.863 43.7573 254.736 43.7675 257.6 43.7675Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M223.96 48.6263C220.098 48.6263 216.225 48.6673 212.362 48.6058C211.229 48.5853 211.003 48.9441 211.085 50.0203C211.631 56.8468 216.688 61.2031 223.177 60.3523C226.72 59.8911 228.925 57.6976 230.212 54.5713C230.676 53.4541 231.242 53.1876 232.303 53.4233C232.89 53.5566 233.498 53.6181 234.106 53.7103C237.288 54.1921 237.35 53.5361 235.846 56.9288C233.591 61.9923 229.46 64.6368 224.012 65.2313C221.54 65.4978 219.037 65.4568 216.606 64.811C210.735 63.2531 207.109 59.4196 205.616 53.6488C204.462 49.2106 204.545 44.7211 205.801 40.2931C207.923 32.8208 214.268 28.3928 222.106 28.8541C229.759 29.3051 235.362 34.3788 236.66 41.9741C236.938 43.6038 236.969 45.2541 237.082 46.8941C237.175 48.2266 236.825 48.6981 235.383 48.6571C231.582 48.5546 227.771 48.6263 223.96 48.6263ZM220.932 43.7678C223.806 43.7678 226.669 43.7166 229.543 43.7883C230.624 43.8191 230.83 43.4706 230.727 42.4661C230.192 37.3206 226.35 33.7023 221.303 33.6716C216.297 33.6306 212.105 37.3718 211.456 42.3431C211.291 43.5628 211.703 43.8191 212.836 43.7883C215.524 43.7166 218.233 43.7678 220.932 43.7678Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M309.007 64.6063C306.7 64.6063 304.661 64.5448 302.621 64.6371C301.684 64.6781 301.395 64.1041 301.004 63.5096C297.409 57.9746 293.825 52.4396 290.117 46.7303C288.84 47.9603 287.645 49.1493 286.409 50.3076C285.925 50.7586 286.028 51.3018 286.028 51.8348C286.018 55.6273 285.997 59.4198 286.038 63.2123C286.048 64.1963 285.935 64.7601 284.73 64.6268C283.216 64.4526 281.177 65.2726 280.301 64.2886C279.549 63.4481 280.054 61.4698 280.054 59.9938C280.044 45.9718 280.064 31.9601 280.023 17.9381C280.023 16.6773 280.301 16.1546 281.63 16.3083C282.608 16.4211 283.628 16.4108 284.606 16.3083C285.832 16.1751 286.028 16.6978 286.028 17.7946C285.987 26.3021 286.007 34.8198 286.007 43.4401C286.687 43.2761 286.965 42.7841 287.315 42.4253C291.229 38.4688 295.133 34.5021 299.016 30.5148C299.634 29.8793 300.242 29.5411 301.159 29.5718C303.136 29.6436 305.124 29.5923 307.133 29.5923C307.236 30.3508 306.607 30.5558 306.257 30.9043C302.765 34.3483 299.305 37.8231 295.7 41.1543C294.474 42.2921 294.525 43.0198 295.432 44.3421C299.665 50.5126 303.775 56.7651 307.926 62.9766C308.266 63.4378 308.554 63.8991 309.007 64.6063Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M80.924 34.2763C85.7444 29.0385 91.1313 27.5625 97.0229 29.6433C101.184 31.1193 103.409 34.1225 103.708 38.3763C104.295 46.771 103.842 55.1863 103.975 63.5913C103.986 64.401 103.697 64.6573 102.915 64.606C101.328 64.4933 99.3301 65.2313 98.2692 64.319C97.3422 63.5298 98.022 61.531 98.0014 60.0653C97.9087 53.7513 98.2383 47.4168 97.8366 41.113C97.4761 35.3628 93.2222 32.6568 87.6602 34.43C83.602 35.7318 81.6244 38.7145 81.5523 44.0958C81.4596 50.3073 81.4802 56.5188 81.5523 62.7303C81.5729 64.155 81.3051 64.8623 79.7189 64.6163C78.3799 64.4113 76.5671 65.2108 75.774 64.2985C75.1148 63.5298 75.5577 61.7873 75.5577 60.4753C75.5474 50.6865 75.5783 40.908 75.5268 31.1295C75.5165 29.9508 75.7328 29.5408 77.0306 29.5613C80.8313 29.633 80.8313 29.5715 80.8828 33.3845C80.8725 33.5998 80.8931 33.8048 80.924 34.2763Z" fill="#E74C3C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M154.126 34.5944C154.641 33.7846 154.899 33.3644 155.177 32.9544C158.009 28.6186 162.006 27.6449 166.599 30.1254C167.382 30.5456 167.619 30.9454 167.238 31.7859C166.733 32.8826 166.311 34.0204 165.95 35.1684C165.683 36.0294 165.322 36.0396 164.519 35.7321C159.76 33.9281 156.577 35.6194 155.311 40.5291C154.785 42.5689 154.662 44.6496 154.662 46.7406C154.651 52.1834 154.631 57.6261 154.682 63.0586C154.693 64.2169 154.497 64.8011 153.168 64.6269C151.716 64.4321 149.759 65.2521 148.914 64.2784C148.193 63.4481 148.667 61.5621 148.667 60.1374C148.657 50.4716 148.688 40.7956 148.636 31.1196C148.626 29.9101 148.904 29.5411 150.181 29.5616C153.972 29.6231 153.972 29.5616 154.054 33.3951C154.044 33.6514 154.075 33.9076 154.126 34.5944Z" fill="#E74C3C"/>
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
              <div className='z-50 pb-6 absolute top-44 w-[796.1px]'>
                <div className='flex flex-col text-center gap-5 htmlrender-detail'>
                  <p className='text-[#E74C3C] w-full text-[1.5rem]'>{isCheckedSubTitle ? ( <div><HtmlRenderer html={inputEventDescSubTitle} /></div> ) : null}</p>
                  <h1 className='text-[#E74C3C] text-[2.8rem] w-full font-bold leading-none' id='title'>{isCheckedTitle ? ( <div><HtmlRenderer html={inputEventDescTitle} /></div> ) : null} </h1>
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
              <div className='absolute top-0 left-0 h-[800px] w-full'>
                <div className='bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#E74C3C00] h-full'></div>
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

export default PostStyleFive;
