import { AnimatePresence, motion } from "framer";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { CheckIcon } from "../../assets/icons/icons";
import { BaseButton, Title } from "../../designSystem";
import colors from "../../designSystem/colors";
import sizes from "../../designSystem/sizes";
import theme from "../../designSystem/theme";
import { useBoundingclientrect } from "../../hooks/useBoundingclientrect";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import useScreenSize from "../../hooks/useScreenSize";
import ButtonArrow from "./ButtonArrow";

interface FilterDropdownButtonConfig {
  background: string;
  activeBackground: string;
  paddingHorizontal: number;
  paddingVertical: number;
  color: string;
}

interface FilterDropdownMenuConfig {
  horizontalOrientation?: "left" | "right";
  topBuffer: number;
}

const Filter = styled.div`
  position: relative;
  font-family: Barlow;
`;

const FilterButtonBase = styled.div`
  position: relative;
`;

const FilterButton = styled(BaseButton) <{
  config: FilterDropdownButtonConfig;
  active: boolean;
}>`
  display: flex;
  position: absolute;
  width: 200px;
  height: 35px;
  top: 5px;
  right: 95px;  
  align-items: center;
  justify-content: center;
  padding: ${(props) =>
    `${props.config.paddingVertical}px ${props.config.paddingHorizontal}px`};
  background-color: ${(props) =>
    props.active ? props.config.activeBackground : props.config.background};
  opacity: 0.4;
  &:hover {
    background-color: ${(props) => props.config.activeBackground};
    span {
      color: ${colors.primaryText};
    }
  }
`;

const FilterButtonText = styled(Title) <{ config: FilterDropdownButtonConfig }>`
  font-size: 14px;
  width: 160px;
  right: 100px;
  top: 10px;
  font-family: Barlow;
  color: ${(props) => props.config.color};
  text-transform: capitalize;
  position: absolute;
  cursor: pointer;
`;

const FilterDropdownMenu = styled(motion.div) <{
  isOpen: boolean;
  verticalOrientation: "top" | "bottom";
  buttonPaddingVertical: number;
  config: FilterDropdownMenuConfig;
}>`
  ${(props) =>
    props.isOpen
      ? `
          position: absolute;
          z-index: 2000;
          // padding: 16px;
          ${(() => {
        switch (props.config.horizontalOrientation) {
          case "left":
            return `left: -300px;`;
          case "right":
          default:
            return `right: -300px;`;
        }
      })()}
          ${(() => {
        switch (props.verticalOrientation) {
          case "top":
            return `bottom: 48px;`;
          case "bottom":
          default:
            return `top: calc(21px + ${props.buttonPaddingVertical * 2
              }px + ${props.config.topBuffer}px);`;
        }
      })()}
          width: fit-content;
          background-color: ${colors.background.two};
          border-radius: ${theme.border.radius};
        `
      : `
          display: none;
        `}
`;

const MenuItem = styled.div<{ color: string; active: boolean }>`
  display: flex;
  align-items: center;
  width: 256px;
  padding: 14px 16px;
  opacity: 1;
  border-bottom: 0.5px solid #9C9C9C;
  // border-radius: 100px;
  background: #233447;
  // margin-bottom: 16px;
  transition: border 150ms;

  ${(props) => {
    if (props.active) {
      return `
        opacity: 1;
        border: ${theme.border.width} ${theme.border.style} ${props.color};
      `;
    }
    return `
      &:hover {
        opacity: 0.7;
      }
    `;
  }}
`;

const LogoContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin: -12px;
  margin-right: 8px;
  background: ${(props) => props.color}29;
  border-radius: 100px;
`;

const MenuItemText = styled(Title) <{ color: string }>`
  color: ${(props) => props.color};
  white-space: nowrap;
  font-size: 14px;
  line-height: 20px;
  transition: color 150ms;
`;

const StyledCheckButton = styled(CheckIcon) <{ color: string }>`
  path {
    transition: fill 150ms;
    stroke: ${(props) => props.color};
  }
`;

interface DropdownOption {
  value: string;
  display: string;
  color: string;
  textColor?: string;
  logo?: React.ReactElement;
}

interface MultiselectFilterDropdownProps {
  values: string[];
  options: DropdownOption[];
  title: string;
  onSelect: (option: string[]) => void;
  buttonConfig?: FilterDropdownButtonConfig;
  dropdownMenuConfig?: FilterDropdownMenuConfig;
}

const AssetSelectFilterDropdownDev: React.FC<
  MultiselectFilterDropdownProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  values,
  options,
  title,
  onSelect,
  buttonConfig = {
    background: colors.background.two,
    activeBackground: colors.background.three,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: `${colors.primaryText}`,
  },
  dropdownMenuConfig = {
    horizontalOrientation: "left",
    topBuffer: 16,
  },
  ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { height, width } = useScreenSize();
    const dropdownBoundingRect = useBoundingclientrect(ref);
    const [selected, setSelected] = useState<string[]>(values);

    // Reset selected value if close without save
    // useEffect(() => {
    //   if (!open) {
    //     setSelected(values);
    //   }
    // }, [open, values]);

    useOutsideAlerter(ref, () => {
      setOpen(false);
    });

    const renderMenuItem = useCallback(
      (option: DropdownOption) => {
        // const active = selected.includes(option.value);
        const active = false;
        const textColor = option.textColor ? option.textColor : option.color;
        return (
          <MenuItem
            onClick={() => {
              // setTimeout(() => {
                setSelected([option.value]);
                // setSelected((currSelected) =>
                //   // currSelected.includes(option.value)
                //   //   ? currSelected.filter((curr) => curr !== option.value) :
                //     currSelected.concat(option.value)
                // );
                onSelect([option.value]);
                setOpen(false);
              // }, 500);
            }}
            role="button"
            key={option.value}
            color={option.color}
            active={active}
          >
            {option.logo ? (
              <LogoContainer color={"none"}>{option.logo}</LogoContainer>
            ) : (
              <></>
            )}
            <MenuItemText color={active ? textColor : colors.primaryText}>
              {option.display}
            </MenuItemText>
            {active && (
              <StyledCheckButton color={textColor} className="ml-auto" />
            )}
          </MenuItem>
        );
      },
      [selected]
    );

    const getVerticalOrientation = useCallback(() => {
      /**
       * Height of dropdown: 48px
       * Height of each option: 36px
       * Total dropdown margin: 16px
       */
      if (
        dropdownBoundingRect &&
        dropdownBoundingRect.top +
        48 +
        options.length * 36 +
        16 +
        (width > sizes.lg
          ? theme.footer.desktop.height
          : theme.footer.mobile.height) >
        height
      ) {
        return "top";
      }

      return "bottom";
    }, [width, height, dropdownBoundingRect, options]);

    return (
      <Filter {...props} ref={ref}>
        <FilterButtonBase>
          <FilterButton
            role="button"
            active={open}
            onClick={() => {
              setOpen((open) => !open);
            }}
            config={buttonConfig}
          >
          </FilterButton>
          <FilterButtonText
            config={buttonConfig}
            onClick={() => {
              setOpen((open) => !open);
            }}>
            {selected.length === 0 ? title : selected[0]}
            {/* {title} */}
            {/* {values.length > 0 ? ` (${values.length})` : ""}{" "} */}
          </FilterButtonText>
          <ButtonArrow isOpen={open} style={{ position: "absolute", color: "white", right: 105, top: 15 }} />
        </FilterButtonBase>
        <AnimatePresence>
          <FilterDropdownMenu
            key={open.toString()}
            isOpen={open}
            verticalOrientation={getVerticalOrientation()}
            buttonPaddingVertical={buttonConfig.paddingVertical}
            config={dropdownMenuConfig}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              type: "keyframes",
              duration: 0.2,
            }}
          >
            {options.map((filterOption) => renderMenuItem(filterOption))}
            {/* <SaveButton
              role="button"
              onClick={() => {
                onSelect(selected);
                setOpen(false);
              }}
            >
              <Title>Save</Title>
            </SaveButton>
            <div className="d-flex w-100 justify-content-center mt-3">
              <SecondaryText
                onClick={() =>
                  selected.length === options.length
                    ? setSelected([])
                    : setSelected(options.map((option) => option.value))
                }
                role="button"
              >
                {selected.length === options.length
                  ? `Deselect All`
                  : `Select All`}
              </SecondaryText>
            </div> */}
          </FilterDropdownMenu>
        </AnimatePresence>
      </Filter>
    );
  };

export default AssetSelectFilterDropdownDev;
