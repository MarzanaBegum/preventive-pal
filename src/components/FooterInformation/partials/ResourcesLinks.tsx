import { FDataType, FLinkType } from "@/utils/types";

type Props = {
    data: FDataType;
    setData: (data: any) => void;
    setReversedData: (reversedData: any) => void;
    newResField: FLinkType;
    setNewResField: (newInfoField: any) => void;
    addMoreField: boolean;
    setAddMoreField: (addMoreField: boolean) => void;
};

const ResourcesLinks = ({ data, setData, setReversedData, newResField, setNewResField, addMoreField, setAddMoreField }: Props) => {
    return (<></>
        // <>
        //     <CustomInputField
        //         label="Section Heading"
        //         placeholder="Section Heading"
        //         type="text"
        //         name="resText"
        //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //             setData({
        //                 ...data,
        //                 resourcesLinks: {
        //                     ...data.resourcesLinks,
        //                     text: e.target.value,
        //                 },
        //             })
        //         }
        //         value={data.resourcesLinks.text}
        //     />

        //     <div className="ml-[27px]">
        //         {data.resourcesLinks.links.map((item: FLinkType, index: number) => (<div key={item._id} className='my-[20px]'>
        //             <ReUsedLinkField
        //                 valueText={item.text}
        //                 isHidden={item.isHidden}
        //                 onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
        //                     setData((prevData: FDataType) => {
        //                         const updatedLinks = [...prevData.resourcesLinks.links];
        //                         updatedLinks[index].text = e.target.value;

        //                         return {
        //                             ...prevData,
        //                             resourcesLinks: {
        //                                 ...prevData.resourcesLinks,
        //                                 links: updatedLinks,
        //                             },
        //                         };
        //                     })
        //                 }
        //                 valueLink={item.link}
        //                 onChangeLink={(e: React.ChangeEvent<HTMLInputElement>) => {
        //                     setData((prevData: FDataType) => {
        //                         const updatedLinks = [...prevData.resourcesLinks.links];
        //                         updatedLinks[index].link = e.target.value;

        //                         return {
        //                             ...prevData,
        //                             resourcesLinks: {
        //                                 ...prevData.resourcesLinks,
        //                                 links: updatedLinks,
        //                             },
        //                         };
        //                     })

        //                     setReversedData((prevData: FDataType) => {
        //                         const updatedLinks = [...prevData.resourcesLinks.links];
        //                         updatedLinks[index].link = e.target.value;

        //                         return {
        //                             ...prevData,
        //                             resourcesLinks: {
        //                                 ...prevData.resourcesLinks,
        //                                 links: updatedLinks,
        //                             },
        //                         };
        //                     });
        //                 }}

        //                 handleHidden={() => {
        //                     setData((prevData: FDataType) => {
        //                         const updatedLinks = [...prevData.resourcesLinks.links];
        //                         updatedLinks[index].isHidden = !updatedLinks[index].isHidden;

        //                         return {
        //                             ...prevData,
        //                             resourcesLinks: {
        //                                 ...prevData.resourcesLinks,
        //                                 links: updatedLinks,
        //                             },
        //                         };
        //                     })

        //                     setReversedData((prevData: FDataType) => {
        //                         const updatedLinks = [...prevData.resourcesLinks.links];
        //                         updatedLinks[index].isHidden = !updatedLinks[index].isHidden;

        //                         return {
        //                             ...prevData,
        //                             resourcesLinks: {
        //                                 ...prevData.resourcesLinks,
        //                                 links: updatedLinks,
        //                             },
        //                         };
        //                     });
        //                 }}
        //             />
        //         </div>))}

        //         {/* add more field */}
        //         {addMoreField ? (<div className='mb-[20px]'>
        //             <ReUsedLinkField
        //                 valueText={newResField.text}
        //                 isHidden={newResField.isHidden}
        //                 onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => setNewResField({ ...newResField, text: e.target.value })}
        //                 valueLink={newResField.link}
        //                 onChangeLink={(e: React.ChangeEvent<HTMLInputElement>) => setNewResField({ ...newResField, link: e.target.value })}
        //                 handleHidden={() => setNewResField({ ...newResField, isHidden: !newResField.isHidden })}
        //             />
        //         </div>) : null}

        //         <AddMoreBtn
        //             onClick={() => {
        //                 setAddMoreField(!addMoreField);
        //                 setNewResField(footerDefaultLink)
        //             }}
        //             addMoreField={addMoreField}
        //         />
        //     </div>
        // </>
    )
}

export default ResourcesLinks