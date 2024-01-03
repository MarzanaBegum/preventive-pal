import api from '@/api';
import Loading from '@/components/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CustomInput from '../CustomInput';


interface Props {
    setSectionState: (sectionState: string) => void;
}

const DataSchema = yup.object().shape({
    code: yup.string().required('code is required field'),

});
const VerifyCurrentEmailByOtp = ({ setSectionState }: Props) => {
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, control, reset, formState: { errors } } = useForm<any>({
        resolver: yupResolver(DataSchema)
    });

    /* Submit form */
    const onSubmit = async (data: any) => {
        setLoading(true);
        // form action
        console.log(data, "code")
        try {
            const response = await api.post('/v2/email-verify', { verificationCode: Number(data.code) });
            if (response.status === 200) {
                toast.success(response.data.message);
                setLoading(false);
                setSectionState("change-email")
            } else {
                toast.error("Something went wrong !")
                setLoading(false)
            }
        } catch (err: any) {
            toast.error(err?.response ? err.response.data?.message : err.message);
            setLoading(false)
        }

    }

    return (
        <div className="bg-[#F2EBF9] rounded-[12px] h-auto">
            <div className="p-[40px]">
                <div className="max-w-[424px] mx-auto text-center">
                    <h2 className="text-[#444444] font-medium text-[32px] leading-[38px]">Verify your current email</h2>
                    <p className="mt-[16px] text-primary-text font-normal text-[16px] leading-[24px]">Enter your email address and we will send you link to reset your password.</p>
                </div>

                {/* input field  */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-[472px] mx-auto mt-[40px]">
                        <CustomInput
                            {...register('code')}
                            label="Verification code"
                            placeholder="Enter 6 digit code"
                            className="border border-[#E5DDED] !rounded-[6px]"
                            maxLength={6}
                            type="number"

                        />
                        {errors.code && (
                            <p className="text-[14px] text-[red]">
                                {errors?.code?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div className="mt-[40px] flex justify-center md:justify-end gap-[20px]">
                        <button
                            type="button"
                            onClick={() => {
                                setSectionState("personal-information");
                                // setIsDropdownOpen(false);
                            }}
                            className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loading color="#fff" />
                                    <div>Loading...</div>
                                </div>
                            ) : (
                                'Next'
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyCurrentEmailByOtp;