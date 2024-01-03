import Image from 'next/image';
import { toast } from 'react-toastify';

export function customSuccessToast(message: string) {
  toast.success(message, {
    icon: (
      <Image src="/images/tick-circle.svg" alt="image" width={24} height={24} />
    ),
    className: 'custom-toast-icon',
  });
}
export function customErrorToast(message: string) {
  toast.error(message, {
    icon: (
      <Image src="/images/info-circle.svg" alt="image" width={24} height={24} />
    ),
    className: 'custom-toast-icon',
  });
}
