import { useRouter } from 'next/router';
import en from '../utils/en';
import spa from '../utils/spa';

const useGetContent = () => {
  const router = useRouter();
  const { locale } = router;

  const content = locale === 'en' ? en : spa;

  return content;
};

export default useGetContent;
