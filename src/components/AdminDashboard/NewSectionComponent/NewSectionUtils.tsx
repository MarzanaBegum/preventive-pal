import * as yup from 'yup';

export const newSectionDefault = {
  type: 'custom-text-img',
  menu: false,
  hidden: false,
  title: {
    en: '',
    spa: '',
  },

  description: {
    en: '',
    spa: '',
  },
  subheader: {
    en: '',
    spa: '',
  },
  header: {
    en: '',
    spa: '',
  },
  scrollButton: {
    en: '',
    spa: '',
  },
  img: '',
  customize: {
    headerColor: '#664897',
    subheaderColor: '#331f1a',
    descColor: '#505050',
    bgColor: '#E9FBD9',
    scrollBtnColor: '#333333',
    imgPosition: 'right',
  },
};

export const LangString: any = (label: string) =>
  yup.object({
    en: yup
      .string()
      .required(
        `Please fill ${label} with en languages, change the language from right`
      ),
    spa: yup
      .string()
      .required(
        `Please fill ${label} with spa languages, change the language from right`
      ),
  });

const DescriptionSchema = (lang: string) =>
  yup
    .string()
    .required(
      `Please fill Description with ${lang} language, change the language from right`
    )
    .test(
      'isInvalidDescription',
      `Please fill Description with ${lang} language, change the language from right`,
      (value) => {
        const strippedValue = value.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
        return strippedValue.trim() !== '';
      }
    );

export const addNewSectionSchema = yup.object({
  id: yup.string(),
  type: yup.string(),
  menu: yup.boolean(),
  hidden: yup.boolean(),
  customize: yup.object({
    headerColor: yup.string(),
    subheaderColor: yup.string(),
    descColor: yup.string(),
    bgColor: yup.string(),
    scrollBtnColor: yup.string(),
    imgPosition: yup.string(),
  }),
  title: LangString('Section Name'),
  subheader: LangString('Sub Heading'),
  header: LangString('Heading'),
  description: yup.object({
    en: DescriptionSchema('en'),
    spa: DescriptionSchema('spa'),
  }),
  scrollButton: LangString('Scroll button'),
  img: yup.mixed(),
});

type BIprops = {
  type: 'add' | 'cancel';
  className?: string;
};

export const ButtonIcon = ({ type, className }: BIprops) => {
  if (type === 'cancel') {
    return (
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={className}
          d="M9.9349 19.0104C14.5182 19.0104 18.2682 15.2604 18.2682 10.6771C18.2682 6.09375 14.5182 2.34375 9.9349 2.34375C5.35156 2.34375 1.60156 6.09375 1.60156 10.6771C1.60156 15.2604 5.35156 19.0104 9.9349 19.0104Z"
          stroke="#5A2F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={className}
          d="M6.60156 10.6777H13.2682"
          stroke="#5A2F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else if (type === 'add') {
    return (
      <svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={className}
          d="M10.0013 19.0104C14.5846 19.0104 18.3346 15.2604 18.3346 10.6771C18.3346 6.09375 14.5846 2.34375 10.0013 2.34375C5.41797 2.34375 1.66797 6.09375 1.66797 10.6771C1.66797 15.2604 5.41797 19.0104 10.0013 19.0104Z"
          stroke="#5A2F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={className}
          d="M6.66797 10.6777H13.3346"
          stroke="#5A2F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={className}
          d="M10 14.0104V7.34375"
          stroke="#5A2F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return <></>;
  }
};
