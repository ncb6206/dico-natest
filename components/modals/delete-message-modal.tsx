'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import qs from 'query-string';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteMessage';
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            채널 삭제
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            정말로 채팅을 삭제시키실 겁니까? <br />
            메세지는 완전히 삭제될 것입니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full ">
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
              className="py-4 px-9 font-semibold"
            >
              네
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
              className="py-4 px-6 font-semibold"
            >
              아니요
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
