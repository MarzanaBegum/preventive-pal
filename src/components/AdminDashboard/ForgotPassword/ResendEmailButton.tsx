import api from '@/api';
import Loading from '@/components/Loading';
import { customErrorToast, customSuccessToast } from '@/utils/CustomToast';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ResendEmailButton() {
  const [timer, setTimer] = useState(() => {
    const item =
      typeof window !== 'undefined' && window.localStorage.getItem('timer');
    console.log(item);
    return Number(item) || 0;
  });
  const [loading, setLoading] = useState(false);

  const initialTimer = (num?: number) => {
    setTimer(num || 60);
    let timerVar = num || 60;
    const interval = setInterval(() => {
      if (timerVar === 0) {
        setTimer(0);
        localStorage.setItem('timer', '0');

        clearInterval(interval);
        return;
      }
      timerVar--;
      localStorage.setItem('timer', timerVar + '');
      setTimer(timerVar);
    }, 1000);
  };

  useEffect(() => {
    if (timer && timer > 0) {
      initialTimer(timer);
    }
  }, []);
  const router = useRouter();
  const handleResendEmail = async () => {
    if (loading) return;
    try {
      setLoading(true);

      await api.post('/v2/resend-email', router.query);

      setLoading(false);
      initialTimer();
      customSuccessToast('Email resend successfully');
    } catch (err: any) {
      const errMessage = err.response ? err.response.data.message : err.message;
      customErrorToast(errMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        disabled={timer != 0}
        onClick={handleResendEmail}
        className={cx(
          'w-[100%] h-[61px] text-[18px] border border-[#522580] bg-white enabled:hover:bg-primary enabled:hover:text-white transition-all duration-200 text-primary font-semibold cursor-pointer rounded-[8px] text-center',
          loading && '!bg-primary !text-white',
          timer !== 0 && 'opacity-[0.3]'
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loading color="#fff" />
            <div>Loading...</div>
          </div>
        ) : (
          'Resend Email'
        )}
      </button>
      {timer != 0 && (
        <h2 className="text-[18px] leading-[22px] mt-[20px] text-center font-medium text-primary-text">
          Resend email in 00:{timer}
        </h2>
      )}
    </div>
  );
}

export default ResendEmailButton;
