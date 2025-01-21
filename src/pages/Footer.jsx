import React, { useEffect, useState, useRef } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { CalendarDays, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Footer() {
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

        card.style.setProperty('--ratio-x', ratioX);
        card.style.setProperty('--ratio-y', ratioY);
      }
    };

    document.body.addEventListener('pointermove', updatePosition);

    return () => {
      document.body.removeEventListener('pointermove', updatePosition);
    };
  }, []);
  return (
    <div className='bg-stone-100 dark:bg-stone-900 w-full h-[80px] '>
      <div className='container grid h-full place-items-center'>
        <div className='flex w-full'>
          <p className='text-sm text-muted-foreground'>Built by 
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className='px-1'>@designer</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  {/* <AvatarImage src="https://pbs.twimg.com/profile_images/1853471587829428224/DIC4Vf1S_400x400.jpg" /> */}
                  <AvatarFallback>DSG</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Designer</h4>
                  <p className="text-sm">
                    Energeek Social Media Template – created and maintained by @designer.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Build in October 2024
                    </span>
                  </div>
                  <div className='pt-4 flex gap-x-2'>
                    {/* <Link to='https://github.com/unaivan22' target='_blank'>
                      <Button> <Github className='h-4 w-4 mr-2' /> Github</Button>
                    </Link> */}
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          . The source code is available on <a href='https://gitlab.com/energeek' target='_blank' className='opacity-100 underline font-semibold'>GitLab</a>.</p>
        </div>
      </div>
    </div>
  )
}
