import { motion } from "framer";
import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../designSystem/colors";
import sizes from "../../designSystem/sizes";
import theme from "../../designSystem/theme";
import { VaultAccount } from "../../models/vault";
import { AssetsList } from "../../store/types";
import {
  getAssetColor,
  getAssetDisplay,
  getAssetLogo,
} from "../../utils/asset";
import FilterDropdownStrategy from "../Common/FilterDropdownStrategy";
import FilterDropdownSort from "../Common/FilterDropdownSort";
import FullscreenMultiselectFilters from "../Common/FullscreenMultiselectFilters";
import AssetSelectFilterDropdownDev from "../Common/AssetSelectFilterDropdownDev";
import EmptyResult from "./Shared/EmptyResult";
import YieldCard from "./Theta/YieldCard";
import {
  DesktopViewType,
  VaultFilterProps,
  VaultsDisplayVersionProps,
  VaultSortBy,
  VaultSortByFilterOptions,
  VaultStrategyBy,
  VaultStrategyByFilterOptions,
  VaultStrategyList,
} from "./types";
import { VaultOptions, VaultVersion } from "../../constants/constants";
import { Title } from "../../designSystem";
import { Table } from "react-bootstrap";
import EthereumIcon from "shared/src/assets/imgs/main/Ethereum.png";
import UsdcIcon from "shared/src/assets/imgs/main/usd-coin-usdc-logo.png";
import ReactPaginate from 'react-paginate';

const FilterContainer = styled.div`
  display: flex;
  padding: 8px;
  border-radius: ${theme.border.radius};
  // box-shadow: 4px 8px 40px rgba(0, 0, 0, 0.24);

  & > * {
    margin-right: 8px;

    &:last-child {
      margin-right: unset;
    }
  }

  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;

const SubHeaderBack = styled.div`
  background: #041528;
  display: flex;
`;

const SubHeaderTag = styled.div`
  display: flex;
  background: #041528;
  margin: 20px auto;
  & > div {
    margin-right: 50px;
    border-radius: 30px;
    padding: 8px 30px;
    cursor: pointer;
    
    &.active {
      background-color: #061F3A;
      & > span {
        color: #00FF3D;
      }
    }
    &.inactive{
      background-color: none;
      & > span {
        color: #FFFFFF;
      }
    }

    &:last-child {
      margin-right: unset;
    }
  }
`;

const TablePart = styled(Table)`
  color: #FFFFFF;
  box-shadow: 0 0 5px 0px #121111;
  margin-top: 10px;
  thead {
    tr {
      th {
        border: none;
      }
    }
  }
  tbody {
    tr {
      td {
        border: none;
      }
      &:nth-child(odd) {
        background-color: #261538;
        // opacity: 0.2;
      }
    }
  }
`;


const tableData = [
  { id: 1, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "64%", Position: "2 ETH" },
  { id: 2, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "300k BTC", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 3, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "High", APY: "31.24%", Max_Capacity: "100k SUSHI", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 4, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "0.00015 USDC", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 5, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 6, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 7, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 8, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 9, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 10, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 11, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "64%", Vault_Capacity: "64%", Position: "$3,588" },
  { id: 12, AssetType: "ETH", DepositType: "USDC", Strategy: "Cover Call", Risk_Level: "Low", APY: "300k BTC", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 13, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "High", APY: "100k SUSHI", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 14, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "0.00015USDC", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 15, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 16, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 17, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "High", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 18, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 19, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 20, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 21, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "64%", Position: "2 ETH" },
  { id: 22, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "300k BTC", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 23, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "High", APY: "31.24%", Max_Capacity: "100k SUSHI", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 24, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "0.00015 USDC", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 25, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 26, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 27, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 28, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 29, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 30, AssetType: "ETH", DepositType: "ETH", Strategy: "Put-Selling", Risk_Level: "Low", APY: "31.24%", Max_Capacity: "100k ETH", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 31, AssetType: "ETH", DepositType: "ETH", Strategy: "Cover Call", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "64%", Vault_Capacity: "64%", Position: "$3,588" },
  { id: 32, AssetType: "ETH", DepositType: "USDC", Strategy: "Cover Call", Risk_Level: "Low", APY: "300k BTC", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 33, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "High", APY: "100k SUSHI", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 34, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "0.00015USDC", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 35, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 36, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Medium", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 37, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "High", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 38, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 39, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
  { id: 40, AssetType: "ETH", DepositType: "USDC", Strategy: "Put-Selling11111", Risk_Level: "Low", APY: "100k ETH", Max_Capacity: "48%", Vault_Capacity: "48%", Position: "$56,213" },
]

const TableBack = styled.div`
  background: radial-gradient(56.24% 56.24% at 50% 23.95%, #502C76 0%, #000000 100%);
`;

const FirstBack = styled.div`
  background: radial-gradient(54.5% 54.5% at 50% 28.16%, #283480 0%, #000000 100%);
  // margin-top: -16px;
`;

const YieldCardsContainer = styled.ul`
  display: flex;
  width: calc(1280px);
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 40px;
  padding-inline-start: 0;

  @media (max-width: ${sizes.lg}px) {
    width: calc(320px * 2);
  }

  @media (max-width: ${sizes.md}px) {
    width: 100%;
    justify-content: center;
  }
`;

const YieldCardContainer = styled(motion.li)`
  // height: 492px;
  margin: 40px 15px 0px 15px;
  margin-block-end: 0px;
  list-style-type: none;
`;

const EmptyContainer = styled.div`
  height: 60vh;
  width: 100%;

  @media (max-width: ${sizes.sm}px) {
    height: unset;
    margin-top: 60px;
  }
`;

const PaginationView = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  & > li {
    margin-right: 10px;
    padding: 10px 17px;
    color: white;
    & > a {
      color: white;
    }
  }
  & > .selected {
    background: #242E44;
    border-radius: 20px;
  }
`;

interface ProductCatalogueGridViewProps {
  setView?: React.Dispatch<React.SetStateAction<DesktopViewType>>;
  onVaultPress: (vault: VaultOptions, vaultVersion: VaultVersion) => void;
  filteredProducts: VaultOptions[];
  vaultAccounts: {
    [key: string]: VaultAccount | undefined;
  };
  variant: "desktop" | "mobile";
}

const ProductCatalogueGridView: React.FC<
  ProductCatalogueGridViewProps & VaultFilterProps & VaultsDisplayVersionProps
> = ({
  setView,
  onVaultPress,
  sort,
  setSort,
  strategy,
  setStrategy,
  filterStrategies,
  setFilterStrategies,
  filterAssets,
  setFilterAssets,
  filteredProducts,
  vaultAccounts,
  variant,
  vaultsDisplayVersion,
  setVaultDisplayVersion,
}) => {
    const productHeads = useMemo(() => {
      if (!filteredProducts.length) {
        return (
          <EmptyContainer>
            <EmptyResult
              setFilterAssets={setFilterAssets}
              setFilterStrategies={setFilterStrategies}
            />
          </EmptyContainer>
        );
      }

      return (
        <YieldCardsContainer>
          {filteredProducts.map((vault, index) => {
            if (index < 4) {
              return (
                <YieldCardContainer
                  key={vault}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    type: "keyframes",
                    ease: "easeOut",
                  }}
                >
                  <YieldCard
                    vault={vault}
                    onVaultPress={onVaultPress}
                    vaultAccount={vaultAccounts[vault]}
                    vaultVersion={vaultsDisplayVersion[vault]}
                    onVaultVersionChange={(version) =>
                      setVaultDisplayVersion(vault, version)
                    }
                  />
                </YieldCardContainer>
              )
            }
          })}
        </YieldCardsContainer>
      );
    }, [
      // filteredProducts,
      // onVaultPress,
      // setVaultDisplayVersion,
      // vaultAccounts,
      // vaultsDisplayVersion,
    ]);
    const productResults = useMemo(() => {
      if (!filteredProducts.length) {
        return (
          <EmptyContainer>
            <EmptyResult
              setFilterAssets={setFilterAssets}
              setFilterStrategies={setFilterStrategies}
            />
          </EmptyContainer>
        );
      } else {
        return (
          <YieldCardsContainer>
            {filteredProducts.map((vault, index) => {
              return (
                <YieldCardContainer
                  // key={vault}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    type: "keyframes",
                    ease: "easeOut",
                  }}
                  key={"YieldCardContainer_"+index}
                >
                  <YieldCard
                    vault={vault}
                    onVaultPress={onVaultPress}
                    vaultAccount={vaultAccounts[vault]}
                    vaultVersion={vaultsDisplayVersion[vault]}
                    onVaultVersionChange={(version) =>
                      setVaultDisplayVersion(vault, version)
                    }
                  />
                </YieldCardContainer>
              )
            })}
          </YieldCardsContainer>
        );
      }
    }, [
      filteredProducts,
      onVaultPress,
      setFilterAssets,
      setFilterStrategies,
      setVaultDisplayVersion,
      vaultAccounts,
      vaultsDisplayVersion,
    ]);

    const [isMenuOpen, setIsMenuOpen] = useState(1);

    const [currentItems, setCurrentItems] = useState<{}[]>([]);
    const [itemsPerPage, ] = useState(20);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(tableData.slice(itemOffset, endOffset));
      console.log("currentItems", currentItems);
      setPageCount(Math.ceil(tableData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
    
    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
      const newOffset = (event.selected * itemsPerPage) % tableData.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div>
        <SubHeaderBack>
          {/* Sub Tab */}
          <SubHeaderTag>
            <div className="product-header1 active" onClick={() => {
              setIsMenuOpen(1);
              document.getElementsByClassName("product-header2")[0].classList.remove("active");
              document.getElementsByClassName("product-header1")[0].classList.remove("inactive");
              document.getElementsByClassName("product-header1")[0].classList.add("active");
            }}>
              <Title fontSize={20} color={"white"}>Featured Strategies</Title>
            </div>
            <div className="product-header2" onClick={() => {
              setIsMenuOpen(2);
              document.getElementsByClassName("product-header1")[0].classList.remove("active");
              document.getElementsByClassName("product-header2")[0].classList.remove("inactive");
              document.getElementsByClassName("product-header2")[0].classList.add("active");
            }}>
              <Title fontSize={20} color={"white"}>All Strategies</Title>
            </div>
          </SubHeaderTag>
        </SubHeaderBack>
        {isMenuOpen === 1 ?
          (<FirstBack>
            <div className="container d-flex flex-column align-items-center">
              {/* First 4 cards */}
              {productHeads}
              {/* Filter part */}
              <FilterContainer>
                {variant === "desktop" ? (
                  <>
                    <AssetSelectFilterDropdownDev
                      values={filterAssets}
                      options={AssetsList.map((asset) => {
                        const Logo = getAssetLogo(asset);
                        let logo = <Logo />;
                        switch (asset) {
                          case "All Asset Types":
                            logo = <></>;
                        }
                        return {
                          value: asset,
                          display: getAssetDisplay(asset),
                          color: getAssetColor(asset),
                          textColor: colors.primaryText,
                          logo: logo,
                        };
                      })}
                      title="Asset Type"
                      // @ts-ignore
                      onSelect={setFilterAssets}
                    />{" "}
                  </>
                ) : (
                  <FullscreenMultiselectFilters
                    filters={[
                      {
                        name: "strategy",
                        title: "STRATEGY",
                        values: filterStrategies,
                        options: VaultStrategyList.map((strategy) => ({
                          value: strategy,
                          display: strategy,
                        })),
                        // @ts-ignore
                        onSelect: setFilterStrategies,
                      },
                      {
                        name: "asset",
                        title: "DEPOSIT ASSET",
                        values: filterAssets,
                        options: AssetsList.map((asset) => {
                          const Logo = getAssetLogo(asset);
                          let logo = <Logo />;
                          switch (asset) {
                            case "ETH":
                              logo = <Logo height="70%" />;
                          }
                          return {
                            value: asset,
                            display: getAssetDisplay(asset),
                            color: getAssetColor(asset),
                            textColor: colors.primaryText,
                            logo: logo,
                          };
                        }),
                        // @ts-ignore
                        onSelect: setFilterAssets,
                      },
                    ]}
                    title="FILTERS"
                    className="flex-grow-1 "
                  />
                )}
                <FilterDropdownStrategy
                  options={VaultStrategyByFilterOptions}
                  value={strategy}
                  // @ts-ignore
                  onSelect={(option: string) => {
                    setStrategy(option as VaultStrategyBy);
                  }}
                  buttonConfig={{
                    background: colors.background.two,
                    activeBackground: colors.background.three,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: colors.primaryText,
                  }}
                  dropdownMenuConfig={{
                    horizontalOrientation: "right",
                    topBuffer: 16,
                  }}
                  className="flex-grow-1"
                />

                <FilterDropdownSort
                  options={VaultSortByFilterOptions}
                  value={sort}
                  // @ts-ignore
                  onSelect={(option: string) => {
                    setSort(option as VaultSortBy);
                  }}
                  buttonConfig={{
                    background: colors.background.two,
                    activeBackground: colors.background.three,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: colors.primaryText,
                  }}
                  dropdownMenuConfig={{
                    horizontalOrientation: "right",
                    topBuffer: 16,
                  }}
                  className="flex-grow-1"
                  style={{ marginBottom: 50 }}
                />
              </FilterContainer>
              {productResults}
            </div>
          </FirstBack>)
          : (<>
            <TableBack>
              <div className="container d-flex flex-column align-items-center">
                <TablePart>
                  <thead>
                    <tr style={{ backgroundColor: "#202020" }}>
                      <th>Asset Type</th>
                      <th>Deposit Type</th>
                      <th>Strategy</th>
                      <th>Risk Level</th>
                      <th>APY</th>
                      <th>Max Capacity</th>
                      <th>Vault Capacity</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentItems.map((result: any) => (
                        <tr>
                          <td>
                            <img src={result.AssetType === "ETH" ? EthereumIcon : UsdcIcon} alt="asset Type" width={20} height={20} />
                            <Title> {result.AssetType}</Title>
                          </td>
                          <td>
                            <img src={result.DepositType === "ETH" ? EthereumIcon : UsdcIcon} alt="deposit Type" width={20} height={20} />
                            <Title> {result.DepositType}</Title>
                          </td>
                          <td>{result.Strategy}</td>
                          <td>
                            {result.Risk_Level === "Low" &&
                              <Title color={"#92F0A9"} fontSize={15}>{result.Risk_Level}</Title>}
                            {result.Risk_Level === "Medium" &&
                              <Title color={"#FFE586"} fontSize={15}>{result.Risk_Level}</Title>}
                            {result.Risk_Level === "High" &&
                              <Title color={"#E08585"} fontSize={15}>{result.Risk_Level}</Title>}
                          </td>
                          <td>
                            <Title>{result.APY}</Title>
                          </td>
                          <td>
                            <Title>{result.Max_Capacity}</Title>
                          </td>
                          <td>
                            <Title>{result.Vault_Capacity}</Title>
                          </td>
                          <td>
                            <Title>{result.Position}</Title>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </TablePart>
                <div>
                  <PaginationView
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< " marginPagesDisplayed={5}                    // renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </TableBack>

          </>)
        }
      </div>
    );
  };

export default ProductCatalogueGridView;

