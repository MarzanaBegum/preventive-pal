import cx from 'classnames';
import gsap from 'gsap';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react'; /* prettier-ignore */
import { UseControllerProps, useController } from 'react-hook-form'; /* prettier-ignore */
/* prettier-ignore */ type MenuWrapProps = { isHidden?: boolean; children?: ReactNode; head?: string; wrap?: boolean; };
/* prettier-ignore */ function MenuWrapper({ isHidden, children, head, wrap: w }: MenuWrapProps) { const [wrap, setWrap] = useState(w || false); const wrapperRef = useRef(null); useEffect(() => { const wrapper = wrapperRef.current; gsap.to(wrapper, { duration: 0.5, height: wrap ? 'auto' : 0 }); }, [wrap]); return (<div className={cx(isHidden && '')}> <div className={cx('bg-[#F2EBF9] rounded-[12px] mb-[30px]')}> <div onClick={() => setWrap(!wrap)} className={cx('flex gap-[20px] cursor-pointer items-center flex-row justify-between px-[30px] py-[22px]', isHidden && 'opacity-50')} > <h2 className="text-[24px] leading-[140%] font-semibold text-[#444444]"> {head || 'Add custom link'} </h2> <Image src="/images/arrow-down.svg" width={24} height={24} alt="arrow-down" className={cx('cursor-pointer transition-all duration-500', !wrap && 'rotate-180')} /> </div> <div ref={wrapperRef} className="overflow-hidden h-0"> <div className="px-[30px] pb-[26px]">{children}</div> </div> </div> </div>); }
/* prettier-ignore */ type SHFprops = {} & UseControllerProps<any>;
/* prettier-ignore */ export function ShowHiddenField(props: SHFprops) { const { field } = useController({ ...props, defaultValue: false }); return (<div onClick={() => field.onChange(!field.value)} className="flex cursor-pointer gap-[10px] items-center" > <Image src={field.value ? '/images/eye-slash.svg' : '/images/eye.svg'} width={20} height={20} alt="eye" className="cursor-pointer" /> <div className='text-lg font-semibold'>{field.value ? 'Hide' : 'Show'}</div>  </div>); }
/* prettier-ignore */ export default MenuWrapper;
