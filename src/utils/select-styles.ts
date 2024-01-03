import { StylesConfig } from 'react-select';

export const SelectStyles: StylesConfig = {
  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: '#006186',
      color: '#fff',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#fff',
  }),
  singleValue: (style) => ({
    ...style,
    fontSize: 14,
    fontWeight: 600,
  }),
  input: (styles) => ({
    ...styles,

    padding: 0,
    margin: 0,
    fontSize: 14,
    ':focus': {
      outline: 'none',
    },
  }),
  placeholder: (styles) => ({ ...styles, fontSize: 14, fontWeight: 500 }),
  control: (styles) => ({
    ...styles,
    boxShadow: 'none',
    border: '1px solid #E0E0E0',
    borderColor: '#E0E0E0',
    background: '#fff',
    minHeight: 55,
    ':focus': {
      borderColor: '#E0E0E0',
    },
    ':hover': {
      borderColor: '#E0E0E0',
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: 'none',
  }),

  option: (styles, state) => {
    return {
      ...styles,
      ':hover': state.isSelected
        ? {}
        : {
            background: 'rgba(90,47,132,.1)',
            color: 'rgb(90,47,132)',
          },
      fontWeight: 600,

      backgroundColor: state.isSelected ? 'rgb(90,47,132)' : 'transparent',
      fontSize: 14,
      borderRadius: 4,

      color: state.isSelected ? '#fff' : '#000',
    };
  },
  valueContainer: (styles) => ({
    ...styles,
    paddingTop: 5,
    paddingBottom: 5,

    paddingLeft: 16,
  }),
  menu: (styles) => ({
    ...styles,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 99,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 0,
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  container: (styles) => ({
    ...styles,

    ':focus': { outline: 'none' },
  }),
};
