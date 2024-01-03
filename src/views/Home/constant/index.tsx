import SliderImg1 from '@/views/PreventionType/partials/SliderImg1/SliderImg1';
import SliderImg2 from '@/views/PreventionType/partials/SliderImg2/SliderImg2';
import SliderImg3 from '@/views/PreventionType/partials/SliderImg3/SliderImg3';

export const typeOfPreventionSlider = [
  {
    no: '1.',
    name: 'Primary Prevention',
    content:
      'This type of prevention aims to prevent something before it occurs in the first place. With regard to health, this might be eating healthy or exercising. When it comes to substance use, it creates an environment, activities, and outlets that prevent people from seeking substances in the first place. ',
    vectorImg: <SliderImg1 />,
  },
  {
    no: '2.',
    name: 'Secondary Prevention',
    content:
      'These are proactive efforts to identify and stop a problem. Secondary prevention is screening for conditions before they become a problem. In substance use, this might be looking for early warning signs of substance use disorder and seeking to intervene before it becomes seriously harmful to an individual.',
    vectorImg: <SliderImg2 />,
  },
  {
    no: '3.',
    name: 'Tertiary Prevention',
    content:
      'This type of prevention aims to reduce harm once a diagnosis occurs. In medical terms, this might refer to surgery, medication, or other treatments. When considering tertiary prevention in substance use, these efforts might be medications for treating substance use, treatment programs, and counseling.',
    vectorImg: <SliderImg3 />,
  },
];
