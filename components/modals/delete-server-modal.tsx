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

import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push('/');
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
            서버 삭제
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            정말로{' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{' '}
            서버를 삭제시키실 겁니까?
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
