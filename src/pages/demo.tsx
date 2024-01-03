import Image from "next/image";
import { useDropzone } from 'react-dropzone';

const Demo = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noKeyboard: true });
  const files = acceptedFiles.map((file: any) => <li key={file.path}>{file.path}</li>);
  return (
    <>
      <section className="border border-dashed border-[#CEBDDE] w-[190px] h-[100ox] rounded-[8px] mx-auto mt-12">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="px-[12px] py-[18px] flex flex-col gap-[9px]">
            <Image className="mx-auto" src="/images/uploadFile.svg" alt="upload" width={24} height={24}></Image>
            <p className="font-normal text-[13px] leading-[15px] text-secondary-text">Drag & drop files or <span className="text-primary font-bold cursor-pointer underline">Browse</span></p>
            <p className="text-primary-text font-normal text-[10px] leading-[12px] text-center">Supported formats: PNG</p>
          </div>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    </>
  );
};

export default Demo;