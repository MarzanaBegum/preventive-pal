import { FDataType, FLinkType } from '@/utils/types';

type Props = {
    data: FDataType;
    setData: (data: any) => void;
    setReversedData: (reversedData: any) => void;
    newInfoField: FLinkType;
    setNewInfoField: (newInfoField: any) => void;
    addMoreField: boolean;
    setAddMoreField: (addMoreField: boolean) => void;
};

const InformationLinks = ({ data, setData, setReversedData, newInfoField, setNewInfoField, addMoreField, setAddMoreField }: Props) => {
    return (
        <>
            {/* <CustomInputField
                label="Section Heading"
                placeholder="Section Heading"
                type="text"
                name="infoText"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        informationLinks: {
                            ...data.informationLinks,
                            text: e.target.value,
                        },
                    })
                }
                value={data.informationLinks.text}
            />

            <div className="ml-[27px]">
                {data.informationLinks.links.map((item: FLinkType, index: number) => (<div key={item._id} className='my-[20px]'>
                    <ReUsedLinkField
                        valueText={item.text}
                        isHidden={item.isHidden}
                        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData((prevData: FDataType) => {
                                const updatedLinks = [...prevData.informationLinks.links];
                                updatedLinks[index].text = e.target.value;

                                return {
                                    ...prevData,
                                    informationLinks: {
                                        ...prevData.informationLinks,
                                        links: updatedLinks,
                                    },
                                };
                            })
                        }
                        valueLink={item.link}
                        onChangeLink={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData((prevData: FDataType) => {
                                const updatedLinks = [...prevData.informationLinks.links];
                                updatedLinks[index].link = e.target.value;

                                return {
                                    ...prevData,
                                    informationLinks: {
                                        ...prevData.informationLinks,
                                        links: updatedLinks,
                                    },
                                };
                            });

                            setReversedData((prevData: FDataType) => {
                                const updatedLinks = [...prevData.informationLinks.links];
                                updatedLinks[index].link = e.target.value;

                                return {
                                    ...prevData,
                                    informationLinks: {
                                        ...prevData.informationLinks,
                                        links: updatedLinks,
                                    },
                                };
                            });
                        }}
                        handleHidden={() => {
                            setData((prevData: FDataType) => {
                                const updatedLinks = [...prevData.informationLinks.links];
                                updatedLinks[index].isHidden = !updatedLinks[index].isHidden;

                                return {
                                    ...prevData,
                                    informationLinks: {
                                        ...prevData.informationLinks,
                                        links: updatedLinks,
                                    },
                                };
                            })

                            setReversedData((prevData: FDataType) => {
                                const updatedLinks = [...prevData.informationLinks.links];
                                updatedLinks[index].isHidden = !updatedLinks[index].isHidden;

                                return {
                                    ...prevData,
                                    informationLinks: {
                                        ...prevData.informationLinks,
                                        links: updatedLinks,
                                    },
                                };
                            });
                        }}
                    />
                </div>
                ))}


                {/* add more field */}
            {/* {addMoreField ? (<div className='mb-[20px]'>
                    <ReUsedLinkField
                        valueText={newInfoField.text}
                        isHidden={newInfoField.isHidden}
                        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => setNewInfoField({ ...newInfoField, text: e.target.value })}
                        valueLink={newInfoField.link}
                        onChangeLink={(e: React.ChangeEvent<HTMLInputElement>) => setNewInfoField({ ...newInfoField, link: e.target.value })}
                        handleHidden={() => setNewInfoField({ ...newInfoField, isHidden: !newInfoField.isHidden })}
                    />
                </div>) : null} */}

            {/* <AddMoreBtn
                    onClick={() => {
                        setAddMoreField(!addMoreField);
                        setNewInfoField(footerDefaultLink)
                    }}
                    addMoreField={addMoreField}
                /> 
            </div> */}
        </>
    );
};

export default InformationLinks;
