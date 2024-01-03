import Image from 'next/image';
import { UseControllerProps, useController } from 'react-hook-form';

function FooterSocialIcon(props: UseControllerProps<any>) {
    const { field } = useController(props)
    return (
        <div>
            <Image src={`/social/${field.value}.svg`} height={32} width={32} alt="icon" />

        </div>
    )
}

export default FooterSocialIcon