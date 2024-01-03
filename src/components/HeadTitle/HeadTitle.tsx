import Head from "next/head";

type Props = {
    subTitle: string;
}

const HeadTitle = ({ subTitle }: Props) => {
    return (
        <Head>
            <title key="title">
                {subTitle
                    ? `Prevention ${subTitle && ' - ' + subTitle}`
                    : 'Prevention'}
            </title>
            <meta
                name="description"
                content={
                    subTitle
                        ? `Prevention ${subTitle && ' - ' + subTitle}`
                        : 'Prevention'
                }
            />
        </Head>
    )
}

export default HeadTitle