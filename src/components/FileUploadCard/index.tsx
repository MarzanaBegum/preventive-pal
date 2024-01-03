import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  image?: any;
  setImage?: (image: string) => void;
}

const FileUploadCard = ({ image, setImage }: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImage && setImage(file);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'image/png': ['.png', '.svg'],
        'text/html': ['.html', '.htm'],
      },
      maxFiles: 1,
    });
  // const files = acceptedFiles.map((file: any) => <li key={file.path}>{file.path}</li>);

  // const [previewImage, setPreviewImage] = useState(null);

  const imgSrc =
    typeof image == 'string'
      ? image
      : image instanceof File
      ? URL.createObjectURL(image)
      : '';

  return (
    <>
      <section className="border border-dashed border-[#CEBDDE] w-full h-full md:h-[calc(180px-50px)] xl:h-full  rounded-[8px] ">
        <div
          {...getRootProps({
            className: `dropzone h-full flex item-center justify-center ${
              isDragActive ? 'active' : ''
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="px-[12px] items-center justify-center py-[18px] flex flex-col gap-[9px]">
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc}
                alt="Preview"
                className="w-full h-full xl:h-auto"
              />
            ) : (
              <>
                <Image
                  className="mx-auto"
                  src="/images/uploadFile.svg"
                  alt="upload"
                  width={24}
                  height={24}
                ></Image>
                <p className="font-normal text-[13px] leading-[15px] text-secondary-text text-center">
                  Drag & drop files or{' '}
                  <span className="text-primary font-bold cursor-pointer underline">
                    Browse
                  </span>
                </p>
                <p className="text-primary-text font-normal text-[10px] leading-[12px] text-center">
                  Supported formats: PNG
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="pt-4"></div>
      <div>
        {image && (
          <div
            {...getRootProps({
              className: `dropzone ${isDragActive ? 'active' : ''}`,
            })}
            className="text-center "
          >
            <button
              type="button"
              className="text-primary hover:bg-primary hover:text-white transition-all duration-200 h-[33px] w-[90px] border border-primary rounded-[6px] font-semibold leading-[17px] text-sm "
            >
              Replace
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploadCard;
