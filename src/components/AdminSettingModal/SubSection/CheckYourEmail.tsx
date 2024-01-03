import api from "@/api";
import Loading from "@/components/Loading";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    setSectionState: (sectionState: string) => void;
    inputEmail: string;
    token: string;
}

const CheckYourEmail = ({ setSectionState, inputEmail, token }: Props) => {
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

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            await api.post('/v2/resend-email', { email: inputEmail, token: token });
            setLoading(false);
            initialTimer();
            toast.success('Email resend successfully');
        } catch (err: any) {
            const errMessage = err.response ? err.response.data.message : err.message;
            toast.error(errMessage);
            setLoading(false);
        }
    }
    return (
        <>
            <div className="bg-[#F2EBF9] rounded-[12px] h-auto">
                <div className="p-[40px]">
                    <div className="">
                        <div className="mb-[16px] mx-auto w-[48px] h-[48px]">
                            <Image src="/images/sms-tracking.svg" alt="logo" width={48} height={48} />
                        </div>
                        <h1 className="text-[32px] leading-[38px] font-medium text-[#444444] text-center">
                            Check Your Email
                        </h1>
                        <h3 className="text-[16px] leading-[25px] my-[16px] font-normal text-[#272D2C] text-center">
                            Please check the email address{' '}
                            <span className="font-semibold">{inputEmail}</span> for
                            instructions to reset your password.
                        </h3>
                    </div>
                    {/* <ResendEmailButton /> */}
                    <div className="mt-[40px] flex justify-center md:justify-center gap-[20px]">
                        <button
                            type="button"
                            onClick={() => {
                                setSectionState("password-setting")
                            }}
                            className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
                        >
                            Back
                        </button>
                        {/* <button onClick={handleResendEmail}
                            className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-[#5A2F84] hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
                        >
                            Resend email
                        </button> */}

                        <button
                            type="button"
                            disabled={timer != 0}
                            onClick={handleResendEmail}
                            className={classNames(
                                'w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center'
                            )}
                        >
                            {timer !== 0 ? (
                                `Wait ${timer} sec`
                            ) : (
                                <>
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loading color="#fff" />
                                            <div>Loading...</div>
                                        </div>
                                    ) : (
                                        'Resend Email'
                                    )}
                                </>
                            )}
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
};

export default CheckYourEmail;