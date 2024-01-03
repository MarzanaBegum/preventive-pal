import api from '@/api';
import { useAdminData } from '@/context/AdminData';
import MenuIcon from '@/utils/MenuIcon';
import PlusIcon from '@/utils/PlusIcon';
import { default as classNames, default as cx } from 'classnames';
import { useEffect, useState } from 'react';
import { Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { SelectStateType } from '../AdminLayout';
import DraggableProvider from '../DraggableProvider';

/* eslint-disable @next/next/no-img-element */

type ALLProps = {
  selectState: SelectStateType;
};

const AdminLayoutLeft = ({ selectState }: ALLProps) => {
  const { rootData, refetchRootData } = useAdminData();

  const [state, setState] = selectState;

  const [newRootData, setNewRootData] = useState(rootData);

  useEffect(() => {
    setNewRootData(rootData);
  }, [rootData]);

  const handleOnDragEnd: OnDragEndResponder = async (result, provided) => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    let newData = [...rootData];
    const [removed] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, removed);
    setNewRootData(newData);
    await api.put('/v2/data/all', newData);
    await refetchRootData();
    // const mapData = newData.map((v) => v._id);
  };

  return (
    <div className="   rounded-[8px]">
      <div className="">
        <div className="flex justify-between pb-5">
          <h1 className="lg:text-[24px] md:text-[20px] text-[14px] lg:leading-[29px] md:leading-[24px] leading-[17px] font-bold  uppercase tracking-[0.1em]  text-[#2D2D2D]  ">
            Sections
          </h1>
        </div>

        <div className="">
          {/* <div className="w-full rounded-[10px] gap-[6px] cursor-pointer transition-all duration-200 hover:bg-primary group bg-white h-[56px] flex items-center justify-center">
                <PlusIcon groupClassName="group-hover:stroke-[#fff] transition-all duration-200" />
                <div className="text-[20px] leading-6 group-hover:text-[#fff] transition-all duration-200 text-primary font-semibold">
                  Add section
                </div>
              </div> */}
          <div
            onClick={() => {
              selectState[1]('new');
            }}
            className="w-full rounded-[10px] gap-[6px] cursor-pointer transition-all duration-200 hover:bg-[rgb(90,47,132,.1)] group bg-white h-[56px] flex items-center justify-center"
          >
            <PlusIcon groupClassName=" transition-all duration-200" />
            <div className="text-[20px] leading-6 transition-all duration-200 text-primary font-semibold">
              Add section
            </div>
          </div>
          <div className="pt-5"></div>
          {selectState[0] === 'new' && (
            <div>
              <div
                aria-checked={'new' === state}
                className=" rounded-[10px] border border-[#E5DDED] bg-[#FCFCFC] aria-checked:!bg-primary group w-full cursor-pointer p-[16px_20px] h-[56px] flex gap-3 items-center"
              >
                <div>
                  <MenuIcon groupClassName="stroke-[#717171] group-aria-checked:stroke-[#FFFFFF]" />
                </div>
                <h3 className="font-semibold group-aria-checked:text-[#FFFFFF] truncate  overflow-hidden text-[18px] leading-[25.2px] text-[#717171]">
                  Section Title
                </h3>
              </div>
              <div className="pb-5"></div>
            </div>
          )}

          <DraggableProvider id="droppable_952315" onDragEnd={handleOnDragEnd}>
            {newRootData?.map((item, i) => (
              <Draggable
                index={i}
                key={'new_att62454' + i}
                draggableId={'my_drag233' + i}
              >
                {(provided) => (
                  <div
                    ref={provided?.innerRef}
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    className={cx(
                      'pb-5',
                      i === newRootData?.length - 1 && '!pb-0'
                    )}
                    onClick={() => {
                      setState(item.id);
                    }}
                  >
                    <div
                      aria-checked={item.id === state}
                      className={classNames(
                        item.hidden ? 'bg-[#EAEAEA]' : 'bg-[#FCFCFC]',
                        ' rounded-[10px] aria-checked:!bg-primary aria-checked:!border-primary border border-[#E5DDED] group w-full cursor-pointer p-[16px_20px] h-[57px] flex gap-3 items-center'
                      )}
                    >
                      <div>
                        <MenuIcon groupClassName="stroke-[#717171] group-aria-checked:stroke-[#FFFFFF]" />
                      </div>
                      <h3
                        className={classNames(
                          item.hidden ? 'text-[#B0B0B0]' : 'text-[#717171]',
                          'font-semibold truncate group-aria-checked:text-[#FFFFFF] overflow-hidden text-[18px] leading-[25.2px]'
                        )}
                      >
                        {item.title.en}
                      </h3>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </DraggableProvider>
          <div className="mt-[40px]">
            <h2 className="text-[24px] font-bold text-[#444444] text-center">
              Menu
            </h2>
            <div
              onClick={() => {
                selectState[1]('editMenu');
              }}
              className={classNames(
                'editMenu' === state
                  ? ' bg-primary border-primary text-[#FFFFFF]'
                  : 'bg-[#FCFCFC] border-[#E5DDED] text-primary',
                'w-full h-[56px] text-[20px] mt-[20px] border cursor-pointer font-semibold rounded-[10px] flex items-center justify-center'
              )}
            >
              Edit Menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutLeft;
