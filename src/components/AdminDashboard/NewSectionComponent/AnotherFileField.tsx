import cx from 'classnames';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type FUFProps = {
  onFileDrop?: (f: File) => void;
};

const AnotherFileField = ({ onFileDrop }: FUFProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];

    onFileDrop && onFileDrop(file);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'image/png': [
          '.png',
          '.svg',
          '.mp4',
          '.webm',
          '.ogg',
          '.mov',
          '.avi',
          '.gif',
          '.flv',
        ],
      },
      maxFiles: 1,
    });

  return (
    <>
      <div
        className={cx(
          'w-full h-full   min-h-[168px] flex items-center justify-center rounded-[8px] ',
          'border border-dashed border-[#CEBDDE]'
        )}
      >
        <div
          {...getRootProps({
            className: `dropzone h-fit flex item-center justify-center ${
              isDragActive ? 'active' : ''
            }`,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col">
            <div
              className={cx(
                'px-[12px]   items-center justify-center py-[18px] flex flex-col gap-[9px]'
              )}
            >
              <>
                <Image
                  className="mx-auto"
                  src="/images/uploadFile.svg"
                  alt="upload"
                  width={24}
                  height={24}
                ></Image>
                <p className="font-normal text-center text-[13px] leading-[15px] text-secondary-text">
                  Drag & drop files or{' '}
                  <span className="text-primary font-bold cursor-pointer underline">
                    Browse
                  </span>
                </p>
                <p className="text-primary-text font-normal text-[10px] leading-[12px] text-center">
                  Supported formats: PNG, GIF, MP4
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnotherFileField;
