import React, { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles.leftslider";

export interface OptionItem {
  title: string;
  /**
   * 可以用来router跳转
   */
  key: string;
  /**
   * 路由
   */
  to?: string;
  /**
   * 是否被选中
   */
  isSelected?: boolean;
  /**
   * 是否显示红点
   */
  isShowRedDot?: boolean;
}

export interface Option {
  menu: OptionItem;
  /**
   * 是否展开
   */
  isSpread?: boolean;
  /**
   * 二级列表
   */
  subMenus?: OptionItem[];
}

export interface Options {
  wrapperStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  options?: Option[];
  portalTitle?: string;
  portalFooterTitle?: string;
  defaultSelectKey?: string;
  onChange?: (v: OptionItem) => void;
}

function initItemSelected(option: Option, optionIsSelected: boolean) {
  if (option.menu) {
    option.menu.isSelected = optionIsSelected;
  }
  return option;
}

function initSubItemSelected(option: Option, clickItemKey?: string) {
  if (option.subMenus) {
    let isItemClick = false;
    option.subMenus = option.subMenus?.filter((subMenu) => {
      const curIsSelected = !!clickItemKey && subMenu.key === clickItemKey;
      if (curIsSelected) {
        isItemClick = true;
        subMenu.isShowRedDot = false;
      }
      subMenu.isSelected = curIsSelected;
      return subMenu;
    });
    option.isSpread = isItemClick;
  }
  return option;
}

const LeftSlider = ({
  options,
  wrapperStyle,
  headStyle,
  portalTitle,
  portalFooterTitle,
  onChange,
}: Options) => {
  const [leftOptions, setLeftOptions] = useState(options);

  const menuItemClick = useCallback(
    (option) => {
      setLeftOptions(
        leftOptions?.filter((item) => {
          if (item.menu) {
            if (item.menu.key === option.menu.key) {
              item.isSpread = !item.isSpread;
              item.menu.isShowRedDot = false;
            } else {
              item.isSpread = false;
            }
            // 无subMenus，则清空之前的selected状态
            if (!option.subMenus?.length) {
              item = initSubItemSelected(item);
              item = initItemSelected(
                item,
                item.menu?.key === option.menu.key && !item.subMenus?.length
              );
            }
          }
          return item;
        })
      );
      if (onChange) onChange(option.menu);
    },
    [leftOptions, onChange]
  );
  const subMenuItemClick = useCallback(
    (subMenu) => {
      setLeftOptions(
        leftOptions?.filter((item) => {
          item = initItemSelected(item, false);
          item = initSubItemSelected(item, subMenu.key);
          return item;
        })
      );
      if (onChange) onChange(subMenu);
    },
    [leftOptions, onChange]
  );

  return (
    <S.Side style={wrapperStyle}>
      <S.SideHeader style={headStyle}>
        <div>
          <S.Logo />
          <S.HeaderText>{portalTitle}</S.HeaderText>
        </div>
      </S.SideHeader>
      <S.LeftWrapper>
        <S.LeftListWrap>
          {!!leftOptions?.length &&
            leftOptions.map((option) => {
              const subMenus = option.subMenus;
              const showSubMenu = !!subMenus?.length && option.isSpread;
              return (
                <>
                  <SideMunuItem
                    item={option.menu}
                    isHaveSubMenu={!!subMenus?.length}
                    isSpread={option.isSpread}
                    onItemClick={() => menuItemClick(option)}
                  />
                  {showSubMenu &&
                    subMenus?.map((subMenu) => (
                      <SideMunuItem
                        item={subMenu}
                        isFromSubMenu={true}
                        onItemClick={() => subMenuItemClick(subMenu)}
                      />
                    ))}
                </>
              );
            })}
        </S.LeftListWrap>
        <S.SideFooter>{portalFooterTitle}</S.SideFooter>
      </S.LeftWrapper>
    </S.Side>
  );
};

interface SideMenuItemProps {
  style?: React.CSSProperties;
  item: OptionItem;
  isHaveSubMenu?: boolean;
  isSpread?: boolean;
  isFromSubMenu?: boolean;
  onItemClick: () => void;
}

const SideMunuItem = memo((props: SideMenuItemProps) => {
  const { title, key, to, isSelected, isShowRedDot } = props.item;
  return (
    <S.LeftSliderItem
      key={key}
      style={props.style}
      isSelected={!!isSelected}
      onClick={props.onItemClick}
    >
      {/* 新增TextItem， 便于添加红点布局 */}
      <S.TextItem
        style={{
          paddingLeft: `${to ? `0px` : `16px`}`,
          cursor: "pointer",
        }}
      >
        {to ? (
          <Link
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              width: "100%",
              lineHeight: "40px",
              float: "left",
              paddingLeft: `${props.isFromSubMenu ? `32px` : `16px`}`,
            }}
            to={to}
          >
            {title}
            {isShowRedDot && <S.Badge />}
          </Link>
        ) : (
          title
        )}
      </S.TextItem>
      {props.isHaveSubMenu && <S.StatusIcon $active={props.isSpread} />}
    </S.LeftSliderItem>
  );
});

export default LeftSlider;
