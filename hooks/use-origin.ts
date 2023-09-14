import { useEffect, useState } from 'react';

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링(SSR) 등의 환경에서 window 객체가 정의되지 않았을 경우를 대비
  // window 객체가 정의되어 있으면(typeof window !== 'undefined')
  // 그리고 window.location.origin(현재 페이지의 원본 URL)이 존재하면
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  if (!mounted) {
    return '';
  }

  return origin;
};
