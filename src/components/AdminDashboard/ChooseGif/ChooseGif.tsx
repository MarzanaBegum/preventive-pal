import ChooseGifCard from './ChooseGifCard';

const gifData = [
  'https://prevention-seven.vercel.app/assets/colorado/gardeners.gif',
  'https://prevention-seven.vercel.app/assets/colorado/gardeners.gif',
  'https://prevention-seven.vercel.app/assets/colorado/gardeners.gif',
  'https://prevention-seven.vercel.app/assets/colorado/gardeners.gif',
  'https://prevention-seven.vercel.app/assets/colorado/gardeners.gif',
  'https://prevention-seven.vercel.app/assets/colorado/prev-slider2.gif',
];

const ChooseGif = () => {
  return (
    <div>
      <h2 className="text-[18px] leading-[140%] mb-[16px] font-semibold text-secondary-text">
        Your GIFs
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[20px] md:gap-[40px] 2xl:gap-x-[55.89px] 2xl:gap-y-[20px] justify-center">
        {gifData.map((g, i) => (
          <div
            key={`git_${i}`}
            className="w-full group pt-[12px] pb-[27px] px-[11.66px] bg-[#F9F6FC] rounded-[12px] relative"
          >
            <ChooseGifCard gif={g} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseGif;
