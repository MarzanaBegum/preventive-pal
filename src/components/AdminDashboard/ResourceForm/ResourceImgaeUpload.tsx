import cx from "classnames";
import _ from 'lodash';
import Image from "next/image";
import { useController } from "react-hook-form";

const ResourceImageUpload = ({ name, control, index, watch, errors }: any) => {
  const { field } = useController({ name, control });

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
    }
  };

  const imgSrc =
  typeof field.value === 'string'
  ? field.value
  : URL.createObjectURL(field.value);

  const error = _.get(errors, name || '');
  
  return (
    <div>
      <div
        style={{ background: watch(`resourcesData.${index}.bgColor`) }}
        className={cx(
          'w-[87px] h-[87px] rounded-full flex items-center justify-center relative group overflow-hidden',
          imgSrc ? '' : 'border-[#D9D9D9] border'
        )}
      >
        <div>
          {imgSrc ? (
            <Image
              width={45}
              height={45}
              className="h-[45px] w-[45px]"
              src={imgSrc}
              alt="icon"
            />
          ) : null}
        </div>

        <div
          className={cx(
            'absolute duration-300 transition-all w-full h-full rounded-full flex justify-center items-center',
            imgSrc
              ? 'bg-[linear-gradient(0deg,_rgba(0,_0,_0,_0.3),_rgba(0,_0,_0,_0.3))] top-full group-hover:top-0'
              : 'top-0'
          )}
        >
          <label
            htmlFor={`file-upload-${index}`}
            className={cx(
              'font-medium text-[16px] leading-[19px] cursor-pointer',
              imgSrc ? 'text-white' : 'text-primary-text'
            )}
          >
            {imgSrc ? 'Replace' : 'Choose'}
            <input
              id={`file-upload-${index}`}
              type="file"
              accept="image/png"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      {error && (
        <div className="mt-1 text-sm text-red-500">
          {error?.message?.toString()}
        </div>
      )}
    </div>
  );
};

export default ResourceImageUpload;